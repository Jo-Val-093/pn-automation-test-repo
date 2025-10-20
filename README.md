# Proagrica Test Automation Framework

This repository contains the **UI Test Automation Framework** for the **Proagrica Network (PN)**. It supports automated testing across multiple environments: **Development**, **Test**, and **Pre-Production (EU/US)**.

---

## 🌐 Environment URLs

| Environment | URL |
|-------------|-----|
| **DEV**     | [https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag](https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag) |
| **TEST**    | [https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag](https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag) |
| **PRE**     | [https://proagrica-network-pre-eks-04-us.agv.us-east-1.proagrica.telus.ag](https://proagrica-network-pre-eks-04-us.agv.us-east-1.proagrica.telus.ag) |

---

## 🛠️ Environment Configuration

Before running any test suites, set the appropriate environment variables for your target environment:

### ⚙️ DEV Environment

```powershell
$env:ENV_NAME = 'dev'
$env:ENV_DNS = 'proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag'
$env:E2E_USERNAME_SUPER = '<your-username>'
$env:E2E_PASSWORD_SUPER = '<your-password>'
```
### ⚙️ TEST Environment

```powershell
$env:ENV_NAME = 'test'
$env:ENV_DNS = 'proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag'
$env:E2E_USERNAME_SUPER = '<your-username>'
$env:E2E_PASSWORD_SUPER = '<your-password>'
```
### ⚙️ PRE-PRODUCTION Environment

```powershell
$env:ENV_NAME = 'pre-eu'
$env:ENV_DNS = 'proagrica-network-pre-eks-04-us.agv.us-east-1.proagrica.telus.ag'
$env:E2E_USERNAME_SUPER = '<your-username>'
$env:E2E_PASSWORD_SUPER = '<your-password>'

$env:ENV_NAME = 'pre-us'
$env:ENV_DNS = 'proagrica-network-pre-eks-04-us.agv.us-east-1.proagrica.telus.ag'
$env:E2E_USERNAME_SUPER = '<your-username>'
$env:E2E_PASSWORD_SUPER = '<your-password>'
```
## 🚀 Running Tests

Use the following commands to execute various test suites.

---

### ✅ Core Test Packs

```powershell
npm run test:ci:regressionTest       # Full Regression Suite and all UC
npm run test:ci:smokeTest            # Smoke Tests Only
```
🧪 Use Case E2E Tests
```powershell
npm run test:ci:UC1e2e               # Use Case 1
npm run test:ci:UC2e2e               # Use Case 2
npm run test:ci:UC3e2e               # Use Case 3
npm run test:ci:UC4e2e               # Use Case 4
npm run test:ci:UC5e2e               # Use Case 5
npm run test:ci:allUCe2e             # All Use Cases
```
### 📄 Feature-Specific Tests

```powershell
npm run test:ci:trafficManagerPageTest    # Traffic Manager Page
npm run test:ci:adminPageTest             # Admin Page
npm run test:ci:journeyPageTest           # Journey Page
npm run test:ci:transformPageTest         # Transform Page
npm run test:ci:CMRpageTest               # Code Matcher routes Page
npm run test:ci:catalougePageTest         # Catalogue management
npm run test:ci:template                  # Template Feature
npm run test:ci:miscCMPage                # Miscellaneous Code Matcher Page
npm run test:ci:pagination                # Pagination Checks
npm run test:ci:access                    # Access Control
npm run test:ci:sorting                   # Sorting Validation
npm run test:ci:dashboard                 # Dashboard Functionality
npm run test:ci:filterTM                  # Filter Traffic Manager Page
npm run test:ci:pagefooter                # Page Footer Display
npm run test:ci:messageDetails            # Message Details Verification
```