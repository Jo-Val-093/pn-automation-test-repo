import { Selector, t } from "testcafe";
import { passwordSuper, usernameSuper } from "../helpers/configuration";
import codeMatcherPage from "./codeMatcherPage";
import dashBoardPage from "./dashBoardPage";
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 
//import data from "./test/e2e/data/data.json"


class catalogueManagementPage {
  constructor() {
    this.catalogueManagementText = Selector("#root h2").withText("Catalogue management");
    this.codeType = Selector("#catalogue-table h6").withText("Code type");
    this.status = Selector("#catalogue-table h6").withText("Status");
    this.lastUpload = Selector("#catalogue-table h6").withText("Last upload");
    this.actions = Selector("#catalogue-table h6").withText("Actions");
    this.productSKUs = Selector("#catalogue-table h6").withText("Product SKUs");
    this.tradingPartners = Selector("#catalogue-table h6").withText("Trading Partners");
    this.unitsOfMeasurement = Selector("#catalogue-table h6").withText("Units of Measurement");
    this.locations = Selector("#catalogue-table h6").withText("Locations");
    this.countries = Selector("#catalogue-table h6").withText("Countries");
    this.currencies = Selector("#catalogue-table h6").withText("Currencies");
    this.languages = Selector("#catalogue-table h6").withText("Languages");
    this.miscellaneous = Selector("#catalogue-table h6").withText("Miscellaneous");
    this.downloadIcon = Selector('[data-testid="download-button"]').nth(7);
    this.downloadTemplateSuccessText = Selector('[data-testid="alerts"] div').withText('Template downloaded successfully.').nth(2);
    this.uploadIcon = Selector('[data-testid="upload-button"]').nth(7).find('svg')
    this.spannerIconStateWhenNoException = Selector('[data-testid="sortable-row"]').nth(7).find('td').nth(3).find('div').nth(4).find('div')
    this.miscViewLink = Selector("#catalogue-table span").withText("View").nth(7);
    this.closeButton = Selector('[data-testid="cancel"] span').withText('Close');
    this.cancelButton = Selector('[data-testid="cancel"] span').withText('Cancel');
    //this.exceptionIcon = Selector("#catalogue-table tbody tr").nth(7).find("td").nth(1).find("h6 span svg path");
    this.uploadMessageErrorText = Selector('#root div').withText('We\'re having trouble opening this file. Please ch')
    this.uploadCompletedText = Selector('#dialog-title h5').withText('Upload completed');
    this.closeTheWindowMessage = Selector('[data-testid="upload-Completed"] div').withText('You can now close the window.').nth(2)
    this.actionRequiredText = TestCafeTestingLibrary.queryByTestId('ACTION_REQUIRED');
    this.deleteFileButton = Selector('span').withText('Delete file');
    this.exportButton = Selector('span').withText('Export');
    this.templateUploadSuccessText = Selector('[data-testid="alerts"] div').withText('Template uploaded successfully.').nth(2);
    this.uploadIconStateWhenException = Selector('[data-testid="sortable-row"]').nth(7).find('td').nth(3).find('div').nth(2).find('label div')
    this.spannerIconStateWhenException = Selector('[data-testid="fix-button"]').nth(7).find('svg')
    this.fileDeletedText = Selector('div').withText('File deleted').nth(5);
    this.codeTypeMissingErrorText = Selector('#errors td').withText('Line No.: 2 Error: Field Code Type is mandatory bu');
    this.ID1MissingErrorText = Selector('#errors td').withText('Line No.: 2 Error: Field Independent id (1) is man');
    this.descriptionMissingErrorText = Selector('#errors td').withText('Line No.: 2 Error: Field Description is mandatory');
    this.proagricaIDIncorrectErrorText = Selector('#errors td').withText('Line No.: 2 Error: Member Id in upload file is not');
    this.duplicateRecordsErrorText = Selector('#errors td').withText('Line No.: 2,3,4 Error: Duplicate values in file fo');
    this.fileValidationErrorsText = Selector('#dialog-title h5');
    this.uploadPreviewText = Selector('#dialog-title h5').withText('Upload preview');
    this.uploadPreviewRow = Selector('#confirms h6').withText('Row')
    this.uploadPreviewCodeType = Selector('#confirms h6').withText('Code type')
    this.uploadPreviewRowIndependentID1 = Selector('#confirms h6').withText('Independent ID 1')
    this.fileExportedSuccessfullyText = Selector('[data-testid="alerts"] div').withText('File exported successfully.')
    this.FourteenErrors = Selector('[data-testid="dialog"] span').withText('14');
  }

  async navigateToCatalogueManagementPage() {
    await t
      .click(Selector(codeMatcherPage.viewLinkCatM))
      .expect(this.catalogueManagementText.innerText).eql("Catalogue management");
  }

  async verifyingUserIsOnCatalogueManagementPage() {
    await t
      .expect(Selector(this.codeType).visible).eql(true)
      .expect(Selector(this.status).visible).eql(true)
      .expect(Selector(this.lastUpload).visible).eql(true)
      .expect(Selector(this.actions).visible).eql(true);
  }

  async verifyingUserIsOnCatalogueManagementPagebyCatalougeTypes() {
    await t
      .expect(Selector(this.productSKUs).innerText).contains("Product SKUs")
      .expect(Selector(this.tradingPartners).innerText).contains("Trading Partners")
      .expect(Selector(this.unitsOfMeasurement).innerText).contains("Units of Measurement")
      .expect(Selector(this.locations).innerText).contains("Locations")
      .expect(Selector(this.countries).innerText).contains("Countries")
      .expect(Selector(this.currencies).innerText).contains("Currencies")
      .expect(Selector(this.languages).innerText).contains("Languages")
      .expect(Selector(this.miscellaneous).innerText).contains("Miscellaneous")
      .takeScreenshot()  
     }

  async verifyingActionColumnOnCatalogueManagementPageWithNoException() {
    await t
      .hover(Selector(this.downloadIcon))
      .expect(Selector(this.downloadIcon).exists).ok()
      .hover(Selector(this.uploadIcon))
      .expect(Selector(this.uploadIcon).exists).ok()
      //.hover(Selector(this.spannerIconStateWhenNoException))
      .expect(Selector(this.spannerIconStateWhenNoException).visible).ok()
      .hover(Selector(this.miscViewLink))
      .expect(Selector(this.miscViewLink).exists).ok();
  }

  async verifyingActionColumnOnCatalogueManagementPageWithException() {
    await t
      .hover(Selector(this.uploadIcon))
      .expect(Selector(this.uploadIcon).exists).ok()
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\TemplateWithException.csv'])
      .expect(Selector(this.templateUploadSuccessText).textContent).eql("Template uploaded successfully.")
      .expect(Selector(this.uploadCompletedText).textContent).eql("Upload completed")
      .expect(Selector(this.closeTheWindowMessage).textContent).eql("You can now close the window.Please review your uploaded file to apply the changes.")
      .click(Selector(this.closeButton))
      .expect(this.actionRequiredText().getAttribute('aria-label')).eql('Action required')
      .click(Selector(this.cancelButton))
      .expect(Selector(this.uploadIconStateWhenException).exists).ok()
      .expect(Selector(this.spannerIconStateWhenException).hasAttribute('disabled')).eql(false)
      .click(Selector(this.spannerIconStateWhenException))
      .click(Selector(this.deleteFileButton))      
      .expect(Selector(this.fileDeletedText).textContent).eql('File deleted')
  }

  async verifyingUserIsAbleToDownloadTheTemplate() {

   await t
      .click(Selector(this.downloadIcon))
      .expect(Selector(this.downloadTemplateSuccessText).textContent).eql('Template downloaded successfully.')
  }

  async verifyingUserIsAbleToUploadTheCorrectTemplate() {

    await t
      
      .hover(Selector(this.uploadIcon))
      .expect(Selector(this.uploadIcon).exists).ok()
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\CorrectTemplate.csv']) 
      .expect(Selector(this.templateUploadSuccessText).textContent).eql("Template uploaded successfully.")
      .expect(Selector(this.uploadCompletedText).textContent).eql("Upload completed")
      .expect(Selector(this.closeTheWindowMessage).textContent).eql("You can now close the window.Please review your uploaded file to apply the changes.")
      .click(Selector(this.closeButton))
      .expect(Selector(this.uploadPreviewText).textContent).eql('Upload preview')
      .expect(Selector(this.uploadPreviewRow).textContent).eql("Row")
      .expect(Selector(this.uploadPreviewCodeType).textContent).eql('Code type')
      .expect(Selector(this.uploadPreviewRowIndependentID1).textContent).eql("Independent ID 1")
      .click(Selector(this.cancelButton))
      .expect(Selector(this.uploadIconStateWhenException).exists).ok()
      .expect(Selector(this.spannerIconStateWhenException).hasAttribute('disabled')).eql(false)
      .click(Selector(this.spannerIconStateWhenException))
      .click(Selector(this.deleteFileButton))
      .expect(Selector(this.fileDeletedText).textContent).eql('File deleted')      
   }

  async verifyingUserIsNotAbleToUploadTheTemplateWithoutKeyInMandatoryDetails() {

    await t
      
      .hover(Selector(this.uploadIcon))
      .expect(Selector(this.uploadIcon).exists).ok()
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\TemplateWithMissingMandatoryDetails.csv']) 
      .expect(Selector(this.templateUploadSuccessText).textContent).eql("Template uploaded successfully.")
      .expect(Selector(this.uploadCompletedText).textContent).eql("Upload completed")
      .expect(Selector(this.closeTheWindowMessage).textContent).eql("You can now close the window.Please review your uploaded file to apply the changes.")
      .click(Selector(this.closeButton))
      .expect(Selector(this.fileValidationErrorsText).textContent).eql('File Validation Errors')
      .expect(Selector(this.codeTypeMissingErrorText).textContent).eql('Line No.: 2 Error: Field Code Type is mandatory but no value was provided.')
      .expect(Selector(this.ID1MissingErrorText).textContent).eql('Line No.: 2 Error: Field Independent id (1) is mandatory but no value was provided.')
      .expect(Selector(this.descriptionMissingErrorText).textContent).eql('Line No.: 2 Error: Field Description is mandatory but no value was provided.')
      .click(Selector(this.deleteFileButton))      
      .expect(Selector(this.fileDeletedText).textContent).eql('File deleted')     
   }

   async verifyingUserIsNotAbleToUploadTemplateWithIncorrectOwningMemberID() {

    await t
      
      .hover(Selector(this.uploadIcon))
      .expect(Selector(this.uploadIcon).exists).ok()
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\TemplateWithIncorrectProagricaID.csv']) 
      .expect(Selector(this.templateUploadSuccessText).textContent).eql("Template uploaded successfully.")
      .expect(Selector(this.uploadCompletedText).textContent).eql("Upload completed")
      .expect(Selector(this.closeTheWindowMessage).textContent).eql("You can now close the window.Please review your uploaded file to apply the changes.")
      .click(Selector(this.closeButton))
      .expect(Selector(this.fileValidationErrorsText).textContent).eql('File Validation Errors')
      .expect(Selector(this.proagricaIDIncorrectErrorText).textContent).eql('Line No.: 2 Error: Member Id in upload file is not same as Member Id PN0000001000 selected for upload.')
      .click(Selector(this.deleteFileButton))      
      .expect(Selector(this.fileDeletedText).textContent).eql('File deleted')  
      .expect(Selector(this.uploadIcon).exists).ok()
    }
  
    async verifyingUserIsAbleToCancelAnUploadTemplate() {

      await t
        
        .hover(Selector(this.uploadIcon))
        .expect(Selector(this.uploadIcon).exists).ok()
        .click(Selector(this.uploadIcon))
        .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\CorrectTemplate.csv']) 
        .expect(Selector(this.templateUploadSuccessText).textContent).eql("Template uploaded successfully.")
        .expect(Selector(this.uploadCompletedText).textContent).eql("Upload completed")
        .expect(Selector(this.closeTheWindowMessage).textContent).eql("You can now close the window.Please review your uploaded file to apply the changes.")
        .click(Selector(this.closeButton))
        .expect(Selector(this.uploadPreviewText).textContent).eql('Upload preview')
        .expect(Selector(this.uploadPreviewRow).textContent).eql("Row")
        .expect(Selector(this.uploadPreviewCodeType).textContent).eql('Code type')
        .expect(Selector(this.uploadPreviewRowIndependentID1).textContent).eql("Independent ID 1")
        .click(Selector(this.cancelButton))
        .expect(Selector(this.uploadIconStateWhenException).exists).ok()
        .expect(Selector(this.spannerIconStateWhenException).hasAttribute('disabled')).eql(false)
        .click(Selector(this.spannerIconStateWhenException))
        .click(Selector(this.deleteFileButton))      
        .expect(Selector(this.fileDeletedText).textContent).eql('File deleted')       
  }
  
  async verifyingUserIsAbleToReUploadCancelledTemplate() {

    await t
      
      .hover(Selector(this.uploadIcon))
      .expect(Selector(this.uploadIcon).exists).ok()
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\CorrectTemplate.csv']) 
      .expect(Selector(this.templateUploadSuccessText).textContent).eql("Template uploaded successfully.")
      .expect(Selector(this.uploadCompletedText).textContent).eql("Upload completed")
      .expect(Selector(this.closeTheWindowMessage).textContent).eql("You can now close the window.Please review your uploaded file to apply the changes.")
      .click(Selector(this.closeButton))
      .expect(Selector(this.uploadPreviewText).textContent).eql('Upload preview')
      .expect(Selector(this.uploadPreviewRow).textContent).eql("Row")
      .expect(Selector(this.uploadPreviewCodeType).textContent).eql('Code type')
      .expect(Selector(this.uploadPreviewRowIndependentID1).textContent).eql("Independent ID 1")
      .click(Selector(this.cancelButton))
      .expect(Selector(this.uploadIconStateWhenException).exists).ok()
      .expect(Selector(this.spannerIconStateWhenException).hasAttribute('disabled')).eql(false)
      .click(Selector(this.spannerIconStateWhenException))
      .expect(Selector(this.uploadPreviewText).textContent).eql('Upload preview')
      .expect(Selector(this.uploadPreviewRow).textContent).eql("Row")
      .expect(Selector(this.uploadPreviewCodeType).textContent).eql('Code type')
      .expect(Selector(this.uploadPreviewRowIndependentID1).textContent).eql("Independent ID 1")
      .click(Selector(this.deleteFileButton))      
      .expect(Selector(this.fileDeletedText).textContent).eql('File deleted')         
}


  async verifyingUserIsAbleToDeleteAnUploadTemplate() {

    await t
      .hover(Selector(this.uploadIcon))
      .expect(Selector(this.uploadIcon).exists).ok()
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\CorrectTemplate.csv']) 
      .expect(Selector(this.templateUploadSuccessText).textContent).eql("Template uploaded successfully.")
      .expect(Selector(this.uploadCompletedText).textContent).eql("Upload completed")
      .expect(Selector(this.closeTheWindowMessage).textContent).eql("You can now close the window.Please review your uploaded file to apply the changes.")
      .click(Selector(this.closeButton))
      .expect(Selector(this.uploadPreviewText).textContent).eql('Upload preview')
      .expect(Selector(this.uploadPreviewRow).textContent).eql("Row")
      .expect(Selector(this.uploadPreviewCodeType).textContent).eql('Code type')
      .expect(Selector(this.uploadPreviewRowIndependentID1).textContent).eql("Independent ID 1")
      .click(Selector(this.deleteFileButton))      
      .expect(Selector(this.fileDeletedText).textContent).eql('File deleted')
      .wait(5000)
      .expect(Selector(this.uploadIcon).exists).ok()          
  }

  async verifyingErrorMessageWhenUserTryingToUploadTemplateInWordFormat() {
    
    await t
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\template.rtf'])
      .expect(Selector(this.uploadMessageErrorText).textContent).contains("We're having trouble opening this file. Please check that the file size is less than 1MB and it is in .csv format.");
  }

  async verifyingErrorMessageWhenUserTryingToUploadTemplateInExcelFormat() {
     
    await t
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\TemplateInXlsxFormat.xlsx'])
      .expect(Selector(this.uploadMessageErrorText).textContent).contains("We're having trouble opening this file. Please check that the file size is less than 1MB and it is in .csv format.");
  }
  
  async verifyingErrorMessageWhenUserTryingToUploadTemplateLargerThan1MB() {
     
    await t
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('#input-upload-button', ['_uploads_\\Larger than 1MB Template.csv'])
      .expect(Selector(this.uploadMessageErrorText).textContent).contains("We're having trouble opening this file. Please check that the file size is less than 1MB and it is in .csv format.")
   }

   async verifyingUserIsNotAbleToUploadTemplateWithDuplicateRecordsAndAbleToExportTheError() {
     
    await t
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\TemplateWithDuplicateData.csv']) 
      .expect(Selector(this.templateUploadSuccessText).textContent).eql("Template uploaded successfully.")
      .expect(Selector(this.uploadCompletedText).textContent).eql("Upload completed")
      .expect(Selector(this.closeTheWindowMessage).textContent).eql("You can now close the window.Please review your uploaded file to apply the changes.")
      .click(Selector(this.closeButton))
      .expect(Selector(this.fileValidationErrorsText).textContent).eql('File Validation Errors')
      //.expect(Selector(this.duplicateRecordsErrorText).textContent).contains("Error: Duplicate values in file for 'Code Type/Independent id(1)/Independent id(2)/Independent id(3)'. Each record should have this value unique.")
      .click(Selector(this.exportButton))
      .expect(Selector(this.fileExportedSuccessfullyText).textContent).eql("File exported successfully.")
      .click(Selector(this.spannerIconStateWhenException))   
      .click(Selector(this.deleteFileButton))      
      .expect(Selector(this.fileDeletedText).textContent).eql('File deleted')  
  }
  
   async verifyingUserIsAbleToSeeExactNumberOfErrorsInTemplate() {
     
     await t
      .click(Selector(this.uploadIcon))
      .setFilesToUpload('[data-testid="input-upload-button"]', ['_uploads_\\TemplateWith14Errors.csv']) 
      .expect(Selector(this.templateUploadSuccessText).textContent).eql("Template uploaded successfully.")
      .expect(Selector(this.uploadCompletedText).textContent).eql("Upload completed")
      .expect(Selector(this.closeTheWindowMessage).textContent).eql("You can now close the window.Please review your uploaded file to apply the changes.")
      .click(Selector(this.closeButton))
      .expect(Selector(this.fileValidationErrorsText).textContent).eql('File Validation Errors')
      .expect(Selector(this.FourteenErrors).textContent).eql("14")
      .click(Selector(this.cancelButton))
      .click(Selector(this.spannerIconStateWhenException))   
      .click(Selector(this.deleteFileButton))      
      .expect(Selector(this.fileDeletedText).textContent).eql('File deleted')  
   } 
}
export default new catalogueManagementPage();
