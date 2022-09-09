import { Selector } from "testcafe";
const xlsx = require('xlsx');
const path = require('path');
let coreGraphicsMenu = Selector("body > ul > li:nth-child(25) > a");
let coreLocationMenu = Selector("body > ul > li:nth-child(28) > a");
let mediaPlayerMenu = Selector("body > ul > li:nth-child(55) > a");
let AVFoundationMenu = Selector("body > ul > li:nth-child(12) > a");
let UIKitMenu = Selector("body > ul > li:nth-child(88) > a");
let foundationMenu = Selector("body > ul > li:nth-child(43) > a");
let securityMenu = Selector("body > ul > li:nth-child(83) > a");
let userNotificationsMenu = Selector("body > ul > li:nth-child(90) > a");
let carPlayMenu = Selector("body > ul > li:nth-child(16) > a");
let healthKitMenu = Selector("body > ul > li:nth-child(46) > a");
let ARKitMenu = Selector("body > ul > li:nth-child(7) > a");
let modifiedListSelector = Selector("span.status.modified").nextSibling('a');

let removedListSelector = Selector("span.status.removed");
let data = [];
const workSheetColumnNames = ["FrameWork Name", "Header Name", "API", "Type"];
const filePath = './target/sample.xlsx';

fixture("web scrap")
    .page("http://codeworkshop.net/objc-diff/sdkdiffs/ios/14.0/")
    
    .after(t => {
         console.log(data);
         const workBook = xlsx.utils.book_new();
         const dataset = data.map(data => {
            return[data.frameworkName, data.headerName, data.api, data.type];
         });
         const workSheetData = [
            workSheetColumnNames,
            ... dataset
         ];
         const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
         xlsx.utils.book_append_sheet(workBook, workSheet, "sheet1");
         xlsx.writeFile(workBook, path.resolve(filePath));

    })

    //CoreGraphics
    test("CoreGraphics Scraping - modified", async t => {
        let frameworkName = await coreGraphicsMenu.innerText;
        await t.click(coreGraphicsMenu);
        //await Utility.getModifiedList(frameworkName);
         if(await modifiedListSelector.exists){
             for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.parent().parent().prevSibling();
                
                data.push({
                "frameworkName": frameworkName,
                "headerName": await headerName.innerText,
                "api": await modifiedListSelector.nth(i).innerText,
                "type": "modified"
                })
                
               // console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
             }
         }
        
    })
    //CoreLocation - > Modified
    test("CoreLocation Scraping - modified", async t => {
        let frameworkName = await coreLocationMenu.innerText;
        await t.click(coreLocationMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
                //console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })
   // MediaPlayer -> modified
    test("MediaPlayer Scraping - modified", async t => {
        let frameworkName = await mediaPlayerMenu.innerText;
        await t.click(mediaPlayerMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
                //console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })
    //MediaPlayer -> removed
    test("MediaPlayer Scraping - removed", async t => {
        let frameworkName = await mediaPlayerMenu.innerText;
        await t.click(mediaPlayerMenu);
        if(await removedListSelector.exists){
            for(let i = 0; i < await removedListSelector.count; i++){
              
              let removedInnerText = await removedListSelector.nth(i).parent().innerText;
                let removedTitleWithRemovedKeyword = removedInnerText.split(" ");
                let removedTitle = removedTitleWithRemovedKeyword[1] + " " + removedTitleWithRemovedKeyword[2];
                let headerName = removedListSelector.parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": removedTitle,
                    "type": "removed"
                    })
               // console.log(frameworkName + " -> " + await headerName.innerText + " -> " + removedTitle + " -> removed");
            }
        }
       
    })
    //AVFoundation -> removed
    test("AVFoundation Scraping - removed", async t => {
        let frameworkName = await AVFoundationMenu.innerText;
        await t.click(AVFoundationMenu);
        if(await removedListSelector.exists){
            for(let i = 0; i < await removedListSelector.count; i++){
              
              let removedInnerText = await removedListSelector.nth(i).parent().innerText;
                let removedTitleWithRemovedKeyword = removedInnerText.split(" ");
                console.log(removedInnerText);
                let removedTitle = removedTitleWithRemovedKeyword[1];
                let headerName = removedListSelector.parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": removedTitle,
                    "type": "removed"
                    })
                //console.log(frameworkName + " -> " + await headerName.innerText + " -> " + removedTitle + " -> removed");
            }
        }
       
    })
    //AVFoundation -> modified
    test("AVFoundation Scraping - modified", async t => {
        let frameworkName = await AVFoundationMenu.innerText;
        await t.click(AVFoundationMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
               // console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })
    //UIKit -> modified
    test("UIKit Scraping - modified", async t => {
        let frameworkName = await UIKitMenu.innerText;
        await t.click(UIKitMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
                //console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })
    //Foundation -> modified
    test("Foundation Scraping - modified", async t => {
        let frameworkName = await foundationMenu.innerText;
        await t.click(foundationMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
               // console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })
    //Security -> modified
    test("Security Scraping - modified", async t => {
        let frameworkName = await securityMenu.innerText;
        await t.click(securityMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
               // console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })
    //userNotifications -> modified
    test("UserNotifications Scraping - modified", async t => {
        let frameworkName = await userNotificationsMenu.innerText;
        await t.click(userNotificationsMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
               // console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })
    //carPlay -> modified
    test("CarPlay Scraping - modified", async t => {
        let frameworkName = await carPlayMenu.innerText;
        await t.click(carPlayMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
               // console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })
    //carPlay -> removed
    test("CarPlay Scraping - removed", async t => {
        let frameworkName = await carPlayMenu.innerText;
        await t.click(carPlayMenu);
        if(await removedListSelector.exists){
            for(let i = 0; i < await removedListSelector.count; i++){
              
              let removedInnerText = await removedListSelector.nth(i).parent().innerText;
                let removedTitleWithRemovedKeyword = removedInnerText.split(" ");
                console.log(removedInnerText);
                let removedTitle = removedTitleWithRemovedKeyword[1];
                let headerName = removedListSelector.parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": removedTitle,
                    "type": "removed"
                    })
                //console.log(frameworkName + " -> " + await headerName.innerText + " -> " + removedTitle + " -> removed");
            }
        }
       
    })
    //HealthKit -> modified
    test("HealthKit Scraping - modified", async t => {
        let frameworkName = await healthKitMenu.innerText;
        await t.click(healthKitMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
                //console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })
    //ARKit -> modified
    test("ARKit Scraping - modified", async t => {
        let frameworkName = await ARKitMenu.innerText;
        await t.click(ARKitMenu);
        if(await modifiedListSelector.exists){
            for(let i = 0; i < await modifiedListSelector.count; i++){
                let headerName = modifiedListSelector.nth(i).parent().parent().prevSibling();
                data.push({
                    "frameworkName": frameworkName,
                    "headerName": await headerName.innerText,
                    "api": await modifiedListSelector.nth(i).innerText,
                    "type": "modified"
                    })
               // console.log(frameworkName + " -> " + await headerName.innerText + " -> " + await modifiedListSelector.nth(i).innerText + " -> modified");
            }
        }
       
    })

    