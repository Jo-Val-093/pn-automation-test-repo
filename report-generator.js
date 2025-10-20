
const { time } = require('console');
const report = require('multiple-cucumber-html-reporter');
const path = require('path');
//const projectName = path.basename(__dirname);
const projectName = "Proagrica"
//const projectVersion = process.env.npm_package_version;
const projectVersion = "2.0";
const Reporter = "Ajit Thakkar";
//const reportGenerationTime = new Date().toISOString();
const reportGenerationTime = new Date().toLocaleString()
report.generate({
  reportName: 'PN/CM Testing Report',
  jsonDir: 'cucumber-json-reports',
  reportPath: 'cucumber-json-reports/html',
  openReportInBrowser: true,
  disableLog: true,
  displayDuration: true,
  displayReportTime: true,
  durationInMS: true,
  customData: {
    title: 'PN/CM Testing Info',
    data: [
      { label: 'Project', value: `${projectName}` },
      { label: 'Release', value: `${projectVersion}` },
      { label: 'Reporter', value: `${Reporter}` },
      { label: 'Report Generation Time', value: `${reportGenerationTime}` },
    ],
  },
});