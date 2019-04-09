const puppeteer = require('puppeteer');
(async () => {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://shop.mango.com/in/men');
        await page.waitForSelector(".scrollmagic-pin-spacer",{visible:true});
      
      const el=await page.$('.vsv-menu-prendas ul');
      const arr=await el.$$('li a')
      console.log("Found the button");
      
      await el.click();
   await page.waitForNavigation({waitUntil:['domcontentloaded','networkidle0']});
   

        
        const arr=await page.$$('.Box-body ul > li');
        console.log(arr.length);
        const ele=await page.evaluate(x=>x.innerHTML,arr[0])
        console.log(ele);
  
        for(const li of arr){
            const name=await li.$eval('a',a=>a.innerText);
            console.log(name);
        }
        
        
        
        await page.screenshot({path:'example.png'});
        
          await browser.close();

      
    }catch(e){
        console.log(e);
    }
 
})();

