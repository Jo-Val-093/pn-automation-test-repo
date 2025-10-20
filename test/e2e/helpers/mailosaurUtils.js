import MailosaurClient from 'mailosaur';

const API_KEY = process.env.MAILOSAUR_API_KEY;
const SERVER_ID = process.env.MAILOSAUR_SERVER_ID;
const client = new MailosaurClient(API_KEY);

/**
 * Fetch an email by waiting (messages.get) or retrying search.
 *
 * @param {string} sentTo - The Mailosaur test email address
 * @param {string} subjectKeyword - (Optional) Keyword to match in the subject
 * @param {object} options
 *   - wait: boolean (default true) → wait for email or just check instantly
 *   - timeout: number (ms) → how long to wait if wait=true
 *   - retries: number → number of retries if email not found (default 3)
 */
export async function getEmail(
    sentTo,
    subjectKeyword = '',
    { wait = true, timeout = 60000, retries = 3 } = {}
) {
    const criteria = { sentTo };

    if (subjectKeyword && subjectKeyword.trim() !== '') {
        criteria.subject = new RegExp(subjectKeyword, 'i');
    }

    let lastError;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            if (wait) {
                return await client.messages.get(SERVER_ID, criteria, {
                    timeout,
                    receivedAfter: new Date(Date.now() - 5 * 60 * 1000), // last 5 mins
                });
            } else {
                const result = await client.messages.search(SERVER_ID, criteria, { pageSize: 1 });
                if (!result.items.length) {
                    throw new Error(` No emails found for ${sentTo}`);
                }
                return result.items[0];
            }
        } catch (err) {
            lastError = err;
            console.warn(`Attempt ${attempt} failed: ${err.message}`);
            if (attempt < retries) {
                await new Promise(res => setTimeout(res, 5000)); // wait 5s before retry
            }
        }
    }
    throw lastError;
}

/**
 * Extract a link from an email.
 * - Always prefers links containing "email-verification"
 * - Otherwise: match href/text against keyword (string or RegExp)
 * - Otherwise: fallback to first link
 *
 * @param {object} message - Mailosaur message
 * @param {string|RegExp} keyword - Optional keyword (string or regex) to match
 * @returns {string} - Matching link URL
 */
export function extractLink(message, keyword = '') {
    if (!message?.html?.links?.length) {
        throw new Error(' No links found in the email');
    }

    const links = message.html.links;
    console.log('Links in email:', links.map(l => l.href));

    // Step 1: Prefer email-verification link
    const verificationLink = links.find(link =>
        link.href.toLowerCase().includes('email-verification')
    );
    if (verificationLink) {
        console.log(`Using email-verification link: ${verificationLink.href}`);
        return verificationLink.href;
    }

    // Step 2: Match by keyword
    let match;
    if (keyword) {
        if (keyword instanceof RegExp) {
            match = links.find(
                link => keyword.test(link.href) || keyword.test(link.text || '')
            );
        } else {
            match = links.find(
                link =>
                    link.href.toLowerCase().includes(keyword.toLowerCase()) ||
                    (link.text && link.text.toLowerCase().includes(keyword.toLowerCase()))
            );
        }
    }
    if (match) {
        console.log(`Using keyword-matched link: ${match.href}`);
        return match.href;
    }

    // Step 3: Fallback to first link
    console.warn(` No link matched "${keyword}". Falling back to first link.`);
    return links[0].href;
}
