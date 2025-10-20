export const envName = process.env.ENV_NAME || 'local';
export const protocol = envName === 'local' ? 'http' : 'https';
export const baseDns =
  envName === 'local' ? 'localhost:3000' : process.env.ENV_DNS;
export const baseUrl = `${protocol}://${baseDns}`;
export const baseUrlAdmin = `${protocol}://${baseDns}/legacy-admin`;
export const usernameSuper = process.env.E2E_USERNAME_SUPER;
export const passwordSuper = process.env.E2E_PASSWORD_SUPER;
export const usernameAdmin = process.env.E2E_USERNAME_ADMIN;
export const passwordAdmin = process.env.E2E_PASSWORD_ADMIN;
export const usernameMember = process.env.E2E_USERNAME_MEMBER;
export const passwordMember = process.env.E2E_PASSWORD_MEMBER;
export const usernameCMMember = process.env.E2E_USERNAME_CMMEMBER;
export const passwordCMMember = process.env.E2E_PASSWORD_CMMEMBER;
export const mailosaurApiKey = process.env.MAILOSAUR_API_KEY || '';
export const mailosaurServerId = process.env.MAILOSAUR_SERVER_ID || '';