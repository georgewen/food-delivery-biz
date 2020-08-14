require('geckodriver');
const { describe, it, after, before, beforeEach } = require('mocha');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    Capabilities = webdriver.Capabilities;
const caps = new Capabilities();
caps.setPageLoadStrategy("normal");
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');
const path = require('path');
// custom async forEach function
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
// change URL to match your dev URL
const myURL = 'http://localhost:8080/';

// Do nothing for unhandled rejection
process.on('unhandledRejection', () => {});

describe('UI test', function() {
    let driver;

    before(() => {
        driver = new webdriver.Builder()
            .withCapabilities(caps)
            .forBrowser('firefox')
            .build();
    });
    beforeEach(() => {
        driver.get(myURL);
    })

    after(() => {
        driver.close();
    });

    it("My site title is 'best food delivery in town !'", async () => {
        let isTitleCorrect = await driver.wait(until.titleIs('best food delivery in town !'));
        return expect(isTitleCorrect).equals(true);
      });
    
     // #app1 > main > div.container > div > div:nth-child(1)

    /* click on  0 */
    it('add item 1 to cart and check !"', async () => {
        //await driver.wait(until.elementLocated(By.id('button0'))).click();
        await driver.findElement(By.xpath("//*[@id='app1']/main/div[2]/div/div[1]/div/div/button")).click();
        await driver.findElement(By.xpath("//a[@href='#/Cart']")).click();
        //driver.findElements(By.xpath(“//*[contains(text(),'Selenium')]"));
        
        let text = await driver.findElement(By.xpath("//td[contains(text(),'english breakfast')]")).getAttribute("innerText")

        //let text = await driver.wait(until.elementLocated(By.css("#renderhere p:nth-child(1)"))).getText();
        return expect(text).include("english breakfast");
    })


    // it('Click edit button, filling it in', async() => {
    //     // click the Edit button
    //     await driver.findElement(By.css('#expense_1 .edit_expense')).click();

    //     // Maximise the browser window
    //     await driver.manage().window().maximize();

    //     // We will find the element by css, then fill in the value
    //     // Define elements here, so we can use a for loop
    //     let elements = [{
    //             css: '#expense_1 input[name=expense_date]',
    //             value: '2020-08-01'
    //         },
    //         {
    //             css: '#expense_1 input[name=category]',
    //             value: 'AAAAA'
    //         },
    //         {
    //             css: '#expense_1 input[name=amount]',
    //             value: '11.11'
    //         },
    //         {
    //             css: '#expense_1 input[name=description]',
    //             value: 'bbbbbb'
    //         }
    //     ];

    //     for (let i = 0; i < elements.length; i++) {
    //         // Find the element
    //         let e = await driver.findElement(By.css(elements[i].css));
    //         // Clear the input and fill in the values
    //         await e.clear();
    //         await e.sendKeys(elements[i].value);
    //     }


    //     // Take a screenshot
    //     let encodedString = await driver.takeScreenshot();
    //     // Save it as 'screenshots/{time}.png'
    //     let filename = (new Date()).getTime() + '.png';
    //     fs.writeFileSync(path.join(__dirname, 'screenshots', filename), encodedString, 'base64');

    //     let e = await driver.findElement(By.css(elements[0].css));
    //     let text = await e.getAttribute("value");

    //     // Normally we would like to check every input that we have filled in. 
    //     // For demostration, we only check the date input here.
    //     return expect(text).include(elements[0].value);
    // })


});