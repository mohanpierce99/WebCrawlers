const puppeteer = require('puppeteer');
const men = 'https://shop.mango.com/in/men';
const women = 'https://shop.mango.com/in/women';


var count=0;

async function crawl(link, type, cat,res,bugfix) {

  try {
    const browser = await puppeteer.launch({
      headless: false
    });
    var page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768
    });
    await page.goto(link);



    var categories = [];


    if (type == "clothing") {
      var el = await page.$('.vsv-menu-prendas ul');
      var links = await el.$$('li a');
      for (let data of links) {
        console.log("hit");
        categories.push(await data.$eval('span', sp => sp.innerText));
      }
    } else if (type == "accessories") {
      const access = await page.$('.vsv-menu-title2');
      var el = await page.evaluateHandle(x => x.nextElementSibling, access);
      var links = await el.$$('li a');

      for (let data of links) {
        console.log("hit");
        categories.push(await data.$eval('span', sp => sp.innerText));
      }
    }

    console.log(categories);
    const toCrawl = [];

    if (cat) {
      let i = 0;
      for (const data of cat) {
        console.log(cat+"to be searched");
        var found = categories.map(toLower).indexOf(data);
        console.log(categories[found]);
        if (~found)
          toCrawl.push([await page.evaluate(x => x.href, links[found]), data]);
        i += 1;
      }
    } else {
      let i = 0;
      for (const data of links) {
        toCrawl.push([await page.evaluate(x => x.href, data), categories[i]]);
        i += 1;
      }
    }
   if(!toCrawl.length){
     res.write("Wrong input Type is categories or accessories and enter the category in the ct param");
     return ;
   }
    
    console.log(toCrawl);



    for (let data of toCrawl) {

      await page.goto(data[0]);
      await page.waitForSelector("#list .product", {
        visible: true
      });
      await (await page.$('#navColumns4')).click();
      await page.waitFor(2300);

      var cardarr = await page.$$('.aZ-72');
      console.log(cardarr.length + " for " + data[1]);
      count+=cardarr.length;

      var json = {
        itemName: data[1],
        itemcount: cardarr.length
      };
      json.items = [];

      for (let dr of cardarr) {
        await dr.hover();
        await page.waitFor(300);
        let els = await page.evaluateHandle(x => x.nextElementSibling, dr);
        let name = await els.$eval('._1P8s4', n => n.innerText);
        let price = await els.$eval('.B16Le', n => n.innerText);


        let multicolors = await els.$$eval('._2BZJX img', args => {
          var p = [];
          for (l of args) {
            p.push(l.alt);
          }
          if (!p.length)
            p = false;
          return p;
        });


        const images = await dr.$$eval('.swiper-slide img.product', n => {
          var images1 = [];
          for (l of n) {
            images1.push(l.src);
          }
          if (!images1.length)
            images1 = false;
          return images1;
        });

        var item = {
          name,
          price,
          multicolors,
          images
        }
        json.items.push(item);

      }
        res.write(JSON.stringify(json));
    }
    await browser.close();

    return count;

  } catch (e) {
    console.log(e);
  }


}

function toLower(d){
  return d.toLowerCase();
}

module.exports = {
  init: function (d) {
    if (d == "men")
      return crawl.bind(null, men)
    return crawl.bind(null, women);
  }
}