import {Selector,t} from 'testcafe';
import { baseUrl } from "../helpers/configuration";
import LoginPage from "../pages/logInPage";
import axios from 'axios';
import dashboardPage from '../pages/dashBoardPage';
import trafficManagerPage from "../pages/trafficManagerPage";
import fs from 'fs';
import os from 'os';
import pathDir from 'path';
const ENV_NAME = process.env.ENV_NAME;

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member = repo.testData.member

fixture("TM Message Downloading functionality")
.beforeEach(async t => {
    
    // ******** Please ensure to update the correct token before running this script*********

    const tokenDev = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVC...'; // Dev Token
    const tokenTest = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJUUTRRMFpHTTBRNU9FWkZRVEJFT0RNd05UTkVOamxDT1RCRk9VSXhOMFV4TXpaQ09EY3dPUSJ9.eyJodHRwOi8vcG4tYXV0aC1kZXYuY29tL2FwaS9lbWFpbCI6InBlcHJvbmlhLmF1eGlAcHJvYWdyaWNhLmNvbSIsImlzcyI6Imh0dHBzOi8vaWQtdGVzdC5wcm9hZ3JpY2EuY29tLyIsInN1YiI6ImF1dGgwfDY2ZmE2ODEyZGRlODYwZGE0YzI1MDhkOCIsImF1ZCI6WyJodHRwczovL25ldHdvcmsudGVsdXMuY29tL2FwaSIsImh0dHBzOi8vcHJvYWdyaWNhLXRlc3QuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTc1ODE4MTEwOSwiZXhwIjoxNzU4MTg0NzA5LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiZzh2ZXFIWlBRbVVpUzlCRWJ3UlIyaTBrMjREc1VmdlQifQ.UH6cjds_UsssaGGxrUDv9qEiJR8g9TWqyIMrWb3Y5DNaJH7z-sVf2sYdO1adNS7dAusg5IiMOeYed-c8M3-1kLQosUHGM4GGcvf3jlOL_uR-VseGs9KQOc3GWv_kSzW28JCIE2biuF86FFMoje0aTzzzQG3H7cSKfVqv2mDnbDx_-3e236nJpp4-uvE9beX9C_0MYytJZ-CMi0TXty0hVEKOtkYOzqktihsJIrnS16suq4RIFVnaMjgol5oztEn-tBJydFZCa3n9G8L-rH9C8e2LNEfs_Zdlt5reFdSluwayi5VuO-kyEiGsfBGK0v12ifiVtBdSb_Jly7tyIBfcug';
    const tokenPre = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFqVTJNa1U1UXpjeE0wVXlSRUUwUmtFNFJrWkdNVVExTlRReU56bEVNVE5HUWpRNU1FTkZRUSJ9.eyJpc3MiOiJodHRwczovL2lkLXN0YWdpbmcucHJvYWdyaWNhLmNvbS8iLCJzdWIiOiJhdXRoMHw2NzA3YzFjMDIxZTQzODU5ZWQ1NTczNmYiLCJhdWQiOlsiaHR0cHM6Ly9uZXR3b3JrLnRlbHVzLmNvbS9hcGkiLCJodHRwczovL3Byb2FncmljYS1zdGFnaW5nLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NTgyODg5NTksImV4cCI6MTc1ODI5MjU1OSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6ImV6Q2dUSndKVHd1Y0l0NzZkMXJ5dGo0dkpmd1RuWkpEIn0.fxHthhD_t6u0jW-0jdMGjUWNr9GGoFlMUwZnWQwEIEbNszPQXgGB8XH6mfXMVb0HAMzk6zw13neij770os6r6UCO3LJA3IbUd7i4V0ljNEnGybbE2RQPAtsE_C16rOd-mAfPrxDwj0ogw5BOliH6176B3Au81icaJxRaN7aMM-IXW0WfqabKhvOBYIunIoi_mLCSioFvfYBg1lHmSsxq_QE95UGLUrIZJwr36EBta29IOspjt4lU3B4TPA3StZswGm2nbtfBUg4MRIkwnUzR3abX8pIsRt5Llg1TOJ77fb1XU6LA6uiG4ocuX5TDjI30st7HnYEfpRbHNaeqh8tL7g'
            t.fixtureCtx.token =
          process.env.ENV_NAME === 'test'
        ? tokenTest
        : process.env.ENV_NAME === 'dev'
        ? tokenDev
        : process.env.ENV_NAME === 'pre'
        ? tokenPre:
        (() => { throw new Error(`Unknown ENV_NAME: ${process.env.ENV_NAME}`) })();

});

// Downloading message with default columns

test
.meta({ e2e: 'regression' })
("TC_TM_023: Validating downloaded message contains default columns", async (t) => {
    // Dynamically setting csvDownloadURL based on the environment
    const csvDownloadURL = 
    process.env.ENV_NAME === 'dev'  ? 'https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/api/gateway/v2/members/PN0000001000/messages/downloads' :
    process.env.ENV_NAME === 'test' ? 'https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/api/gateway/v2/members/PN0000001000/messages/downloads' :
    process.env.ENV_NAME === 'pre'  ? 'https://pre.proagrica.net/api/gateway/v2/members/PN0000001000/messages/downloads' :
    (() => { throw new Error(`Unknown ENV_NAME: ${process.env.ENV_NAME}`) })();

        
    const requestBodyDev = {
        "messageColumns": {
            "messageId": "Message ID",
            "messageType": "Message type",
            "businessId": "Business ID",
            "source": "Sender",
            "destination": "Receiver",
            "messageStatus": "Status",
            "insertDate": "Message date"
        },
        "memberId": "PN0000001000",
        "filters": {
            "proagricaId": "PN0000001000",
            "fromDate": ""
        },
        "timeZone": "UTC"
    }    

        const requestBodyTest = {
            "messageColumns": {
            "messageId": "Message ID",
            "messageType": "Message type",
            "businessId": "Business ID",
            "source": "Sender",
            "destination": "Receiver",
            "messageStatus": "Status",
            "insertDate": "Message date"
            },
            "memberId": "PN0000001000",
            "filters": {
                "proagricaId": "PN0000001000",
                "fromDate": ""
            },
            "timeZone": "UTC"
        }
        
        const requestBodyPre = {
            "messageColumns": {
            "messageId": "Message ID",
            "messageType": "Message type",
            "businessId": "Business ID",
            "source": "Sender",
            "destination": "Receiver",
            "messageStatus": "Status",
            "insertDate": "Message date"
            },
            "memberId": "PN0000001000",
            "filters": {
                "proagricaId": "PN0000001000",
                "fromDate": ""
            },
            "timeZone": "UTC"
        }

        const requestBody = process.env.ENV_NAME === 'test'
        ? requestBodyTest
        : process.env.ENV_NAME === 'dev'
        ? requestBodyDev
        : requestBodyPre;

               
    const headers = {
        'Authorization': `Bearer ${t.fixtureCtx.token}`,
        'Content-Type': 'application/json',
    };
    console.log(csvDownloadURL)
    try {
        const postDownloadMessagesRequest = await axios.post(
            `${csvDownloadURL}`,
            requestBody,
            { headers });
        
        const downloadId = postDownloadMessagesRequest.data.downloadId;
        t.fixtureCtx.downloadId = downloadId;
        await t.expect(postDownloadMessagesRequest.status).eql(202); // Asserting response code
        console.log(postDownloadMessagesRequest.data)
            
    } catch (error) {
        console.error('API Request Error:', error.message);
        console.error('API Response Status:', error.response?.status);
        console.error('API Response Data:', error.response?.data);
        throw error; // Rethrow the error to fail the test
    }
    
    // Retrieving the downloaded CSV file
    const csvRetrievalURL = process.env.ENV_NAME === 'test'
        ? `https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/api/gateway/v2/members/PN0000001000/messages/downloads/${t.fixtureCtx.downloadId}`
        : process.env.ENV_NAME === 'dev'
        ? `https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/api/gateway/v2/members/PN0000001000/messages/downloads/${t.fixtureCtx.downloadId}`
        : `https://pre.proagrica.net/api/gateway/v2/members/PN0000001000/messages/downloads/${t.fixtureCtx.downloadId}`;
    
        try {
        const getDownloadedMessagesRequest = await axios.get(`${csvRetrievalURL}`,{ headers });

        await t.expect(getDownloadedMessagesRequest.status).eql(200); // Asserting response code
        console.log(getDownloadedMessagesRequest.data);
       
        // Extract columns from the response
        const columns = getDownloadedMessagesRequest.data.params.messageColumns;

        // Expected default column names
        const expectedColumnNames = {
            "messageId": "Message ID",
            "messageType": "Message type",
            "businessId": "Business ID",
            "source": "Sender",
            "destination": "Receiver",
            "messageStatus": "Status",
            "insertDate": "Message date"
        } 

    await t.expect(expectedColumnNames).eql(columns)
        
    } catch (error) {
        console.error('API Request Error:', error.message);
        console.error('API Response Status:', error.response?.status);
        console.error('API Response Data:', error.response?.data);
        throw error; // Rethrow the error to fail the test
 }    

});

test
.page(baseUrl)
.meta({ e2e: 'regression' })
("TC_TM_023A: Validating message downloaded csv file available in downloads folder", async (t) => {
    
    await LoginPage.logInSuccessful();
        
        switch (ENV_NAME) {

            case 'dev':
                await dashboard.selectMember(member) 
                break;
            case 'test':
                await dashboard.selectMember(member) 
                break;
            case 'pre':
                await dashboard.selectMember(member)   
                break;
            default:
                console.error("Unrecognised NODE_ENV: " + process.env.ENV_NAME);
                process.exit(1);
        }    
    await t.wait(10000);
    const confirmButton = Selector('span').withText('Confirm');
    await t.click(confirmButton);
    await t.wait(10000);
    const fileNameCsv = await t.fixtureCtx.downloadId + '.csv'
    const homeDirectory = os.homedir();
    const downloadLocation = pathDir.join(homeDirectory, '\Downloads');
    await t.expect(fs.existsSync(downloadLocation, fileNameCsv)).ok();
    
})

test
.page(baseUrl)
.meta({ e2e: 'regression' })
    ("TC_TM_023B: Validating number of rows in messages", async (t) => {
    
        await LoginPage.logInSuccessful()
        switch (ENV_NAME) {

            case 'dev':
                await dashboard.selectMember(member) 
                break;
            case 'test':
                await dashboard.selectMember(member) 
                break;
            case 'pre':
                await dashboard.selectMember(member)   
                break;
            default:
                console.error("Unrecognised NODE_ENV: " + process.env.ENV_NAME);
                process.exit(1);
        }    
        await trafficManagerPage.selectFilter()
        await trafficManagerPage.searchByDate("dateRangeAll")
       // await trafficManagerPage.searchByMessageStaus("All") in TM message status filter we dont have All option in the dropdown
        await t.click(trafficManagerPage.searchButton)
        await t
        .pressKey('down')
        .pressKey('down')
         // Expected row count
        
        let totalElements;

        // this code is to dynamically set the messageURL based on the environment
        const messageURL = process.env.ENV_NAME === 'test'
        ? 'https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/api/gateway/v2/members/PN0000001000/messages'
        : process.env.ENV_NAME === 'dev'
        ? `https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/api/gateway/v2/members/PN0000001000/messages`
        : `https://pre.proagrica.net/api/gateway/v2/members/PN0000001000/messages`;

     const headers = {
        'Authorization': `Bearer ${t.fixtureCtx.token}`,
        'Content-Type': 'application/json',
    };

        try {
        const getMessagesRequest = await axios.get(`${messageURL}`, { headers });
        await t.expect(getMessagesRequest.status).eql(200); // Asserting response code
        console.log(getMessagesRequest.data);
        totalElements = getMessagesRequest.data.totalElements; // extracting total elements from API response 1248  

    } catch (error) {
        console.error('API Request Error:', error.message);
        console.error('API Response Status:', error.response?.status);
        console.error('API Response Data:', error.response?.data);
        throw error; // Rethrow the error to fail the test
    }
        const messageCountText = await Selector('p').withText(/1–10 of \d+/).innerText;

        // Extract the number from the text using a regular expression
        const match = messageCountText.match(/1–10 of (\d+)/);
        const expectedMessageCount = match ? parseInt(match[1], 10) : 0;
                
        // Assert the row count
        await t.expect(totalElements).eql(expectedMessageCount);
});