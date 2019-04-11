<h3>Installation</h3>
First we require Nodejs and npm to be installed in the corresponding system
<br>
<br>
<a href='https://nodejs.org/dist/v10.15.3/node-v10.15.3-x64.msi'>Click here</a>
<br>


Once installed lets get started !!

git clone this Repo <a href='https://github.com/mohanpierce99/WebCrawlers-MadStreetDen.git'>Copy this address</a>
<br>
<br>
 Now you would have all the files in place !
 
 To run the rest api server all u need to do is type node app.js in the root dir of the project in a cmd. This would initialize the express server.
 
 
 <h4>Features of the rest api</h4>
 <ul>
 <li>Built in a modular way using ES6 Modern javascript async / await</li> 
 <li>Built using Puputeer Google's new Web scraping and automation framework released in<a href='https://www.youtube.com/watch?v=lhZOFUY1weo&t=622s'></a> Google I/O 2018 </li>
 <li>Scrapped using Top Notch XHR Attacking algorithms(Tracing and recognizing the patterns behind Ajax rest api calls made by the Website and manipulating them to scrape the same </li>
 <li>Pages with even 300 to 400 items(lazy loaded) scrapped within seconds</li>
 <li>http://localhost:3472/shopmango/women?type=clothing&ct=t-shirts,jackets,suits (Scraps t-shits,jackets,suits) Enhanced querying mechanism</li>
 <li>Resources served back in streams to prevent timeouts and improving scalability</li>
 <li>Fast and responsive , 2773 items from 11 different pages which were lazy loaded (Whole clothing directory of women in shopmango) with each product having its own array of images and also their corresponding colors served back in under a minute !</li>
 <li> Serves back data,given a category and gender data served with a maximum latency of 10 seconds</li>
 </ul>
 
<h4>Usage Task-1 Shopmango </h4>
Scaps data from https://shop.mango.com/in/women & https://shop.mango.com/in/men

Women categories :

Coats
Jackets
Suits
Dresses
Jumpsuits
Cardigans and sweaters
Shirts
T-shirts and tops
Trousers
Jeans
Skirts

Men categories :

Coats
Jackets
Blazers
Suits
Cardigans and sweaters
Sweatshirts
Shirts
T-shirts
Trousers
Jeans
Underwear

http://localhost:3472/shopmango/women?type=clothing, Brings back all data from all the categories
http://localhost:3472/shopmango/women?type=clothing&ct=t-shirts,jackets,suits, brings back the mentioned categories
http://localhost:3472/shopmango/women?type=clothing&ct=Cardigans and sweaters, brings back cardigans and sweaters
Use the categories from above and they are case insensitive while processing so no problems tre

http://localhost:3472/shopmango/women?type=clothing&ct=Jumpsuits,jackets,suits&browser=true By default chromium browser is opened to simulate the automation however u can turn this off by using browser=true


Same applies for men change women to men and use the correct categories

<h3>Method</h3>
The web scraping algorithm first filters out the links to be crawled and visits each of them

Now it starts to eavesdrop the packets sent back and forth and identifies the network xhr request which has the url 

https://shop.mango.com/services/cataloglist/filtersProducts/IN/he/sections_he.prendas_he/?idSubSection=abrigos_he&menu=familia;106&pageNum=1000&rowsPerPage=20&columnsPerRow=4

This one .. The ids and strings change here and there so we eaves drop and once this is detected

We go to an infinite loop

We transform the link into

https://shop.mango.com/services/cataloglist/filtersProducts/IN/he/sections_he.prendas_he/?idSubSection=abrigos_he&menu=familia;106&pageNum=1 which would give maximum no of items in page no and do a await ajax request and get the json and process it

This process is repeated for page 2(click to see the response thats gonna be processed)
https://shop.mango.com/services/cataloglist/filtersProducts/IN/he/sections_he.prendas_he/?idSubSection=abrigos_he&menu=familia;106&pageNum=2
and so on
untill at one point response would be null
Now that we have scraped all the data we move to next link in the stack and so on 

Everything is asynchronous and all the racial conditions have been exceptionally handled

As all the resources are lazy loaded To scrape the data from the website's dom is inefficient as there are an array of images per product and they only get loaded into the dom only when u hover over them,this is an efficient solution

However ih've written the algorithm for hover and getting data from dom as well 

http://localhost:3472/shopmango/women/array?type=clothing&ct=Jumpsuits

It does an infinite scroll to trigger and load all the lazy loaded data and does an automated hover of 300ms on each product to load in their data

But its slow compared to the previous algo.











