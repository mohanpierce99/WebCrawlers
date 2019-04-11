const puppeteer = require('puppeteer');
const axios=require('axios');
const men = 'https://direct.asda.com/george/mens-clothing/D2,default,sc.html';
const women = 'https://direct.asda.com/george/womens-clothing/D1,default,sc.html';
let count=0;

async function crawl(link, type, cat,res,headless=false) {

  try {
    const browser = await puppeteer.launch({
      headless
    });
    var page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768
    });
    await page.goto(link);

//Goes to the link of men or women

    var categories = [];
// scraping all categories and filtering categories the user had requested

    if (type == "clothing") {
        await page.waitForSelector(".category-landing__sidebar", {
            visible: true
          });
      var el = await page.$('.category-list ul');
      var links = await el.$$('li a');
      links.shift();
      links.shift();
      for (let data of links) {
        categories.push(await page.evaluate(x=>x.innerHTML,data));
      }
    }else{
        res.write("Wrong input Type is clothing and enter the correct category in the ct param");
        await browser.close();
        return ;
    } 

    console.log(categories);
    const toCrawl = [];

    if (cat) {
      let i = 0;
      for (const data of cat) {
          console.log(data + " to be searched ");
          let found = categories.map(toLower).map(trim).map((x,i)=>x==trim(data.toLowerCase())?i:-1).filter((x)=>x!=-1)[0];
          if(found==undefined){continue;}
          if (~found){
              toCrawl.push([await page.evaluate(x => x.href, links[found]), categories[found]]);
          }
        
          i += 1;
      }
  } else {
      let i = 0;
      for (const data of links) {
          toCrawl.push([await page.evaluate(x => x.href, data), categories[i]]);
          i += 1;
      }
  }

  if (!toCrawl.length) {
      console.log("hit");
      res.write("Wrong input Type is clothing or accessories and enter the category in the ct param");
      res.end();
      await browser.close();
      return;
  }
    
    console.log(toCrawl);  //To crawl hyperlinks links

    await browser.close();
let master=[];

    for (let data of toCrawl) {
      //getting categoryid from url
let ctid=data[0].match(/\/\w+\d+/)[0].slice(1);
   var result={category:data[1],products:[]};

   //replacing with the api

  let response= await axios.get(`https://direct.asda.com/on/demandware.store/Sites-ASDA-Site/default/SearchDEP-Show?cgid=${ctid}&start=0&sz`);
//json parse

  response.data.productSearch.products.forEach((f)=>{
    var json={};
    var images=[];
    json["name"]=f.name;
    json["reviews"]=f.reviews;
    json["url"]=f.URL;
    json["price"]=f.price.min.list.formatted;
    json["images"]=f.media.images.map((x)=>x.image.url);
    result.products.push(json);
});
console.log(result);

master.push(result);
 
    }
    //writin back to the request
    res.write(JSON.stringify(master));
    return count;
  } catch (e) {
    console.log(e);
  }


}

function toLower(d){
  return d.toLowerCase();
}

function trim(d){
  return d.replace(/\s/g,'');
}

module.exports = {
  init: function (d) {
    if (d == "men")
      return crawl.bind(null, men)
    return crawl.bind(null, women);
  }
}