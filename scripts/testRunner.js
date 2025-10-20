// Runs shell commands
const { execSync } = require("child_process");

// Generate a timestamp  (replace colons and dots with dashes)
const date = new Date();
const timestamp = date.toISOString().replace(/[:.]/g, "-");

// Create a unique report name using the timestamp
const reportName = `AutoScheduleData_Test_Report_${timestamp}.html`;

// Constructing the TestCafe command to run particular script
const command = `testcafe test/e2e/testScripts/message_AutoSchedulingScript.js \
  --config-file test/e2e/helpers/.testcaferc.json \
  --reporter html:test/e2e/reports/testResults/${reportName} \
  --test-meta "type19=Task Scheduler"`;
// Run the TestCafe command and show the output in the console
execSync(command, { stdio: "inherit" });