var webdriver = require("selenium-webdriver");
var cbtHub = "http://hub.crossbrowsertesting.com:80/wd/hub";

var username ='YOUR_USERNAME'; //replace with your email address 
var authkey = 'YOUR_AUTHKEY'; //replace with your authkey  

//set capabilities
var caps = {
    name : 'Login Example',
    build :  '1.0',
    version : '70', 
    platform : 'Windows 10', 
    screen_resolution : '1366x768',
    record_video : 'true',
    record_network : 'false',
    browserName : 'Chrome',
    username : username,
    password : authkey
};

const { By, until } = webdriver


describe('webdriver', () => {
  let driver;


  beforeAll(async () => {
    driver = new webdriver.Builder()
      .usingServer(cbtHub)
      .withCapabilities(caps)
      .build();

    
    await driver.get('http://crossbrowsertesting.github.io/login-form.html');
  },10000);

  afterAll(async () => {
    await driver.quit();
  }, 10000);

// test case
  test('Successful Login', async () => {
    await driver.findElement(webdriver.By.id("username")).sendKeys("tester@crossbrowsertesting.com"); 
    await driver.findElement(webdriver.By.xpath("//*[@type=\"password\"]")).sendKeys("test123"); 

    await driver.findElement(webdriver.By.css("button[type=submit]")).click(); 
    output = await driver.wait(webdriver.until.elementLocated(webdriver.By.id("logged-in")), 10000);
    outputVal = await output.getAttribute('innerHTML');

    expect(outputVal).toEqual('You are now logged in!');
  });
});

