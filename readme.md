Sample scraped files are in the directory for the clothing section of men and women for both sites shop mango and george

<h3>Installation</h3>
First we require Nodejs and npm to be installed in the corresponding system
<br>
<br>
<a href='https://nodejs.org/dist/v10.15.3/node-v10.15.3-x64.msi'>Click here</a>
<br>


Once installed lets get started !!


git clone this Repo copy this command

git clone https://github.com/mohanpierce99/WebCrawlers-MadStreetDen

cd WebCrawlers-MadStreetDen

next navigate to the root of the project in cmd and type

npm install

this will download all the dependancies

Now you would have all the files in place !

Now run

node app.js

this will bootstrap the rest server
 
 
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



<br>
<br>
<h2>&ct=//replace with categories below,  and everything is caseinsensitive and dont leave any white spaces</h2>
sample :  http://localhost:3472/shopmango/men?type=clothing&ct=blazers
<hr>
Women categories :

Coats,
Jackets,
Suits,
Dresses,
Jumpsuits,
Cardigans and sweaters,
Shirts,
T-shirts and tops,
Trousers,
Jeans,
Skirts,
<hr>
Men categories :

Coats,
Jackets,
Blazers,
Suits,
Cardigans and sweaters,
Sweatshirts,
Shirts,
T-shirts,
Trousers,
Jeans,
Underwear,
<hr>



<h6 style='color:red;text-align:center'>Categories with spaces should be given iwht hyphens coats-jackets for Coats & jackets </h6>
sample: http://localhost:3472/george/men?type=clothing&ct=coats-jackets

<br>
<br>

http://localhost:3472/shopmango/women?type=clothing  , Brings back all data from all the categories
http://localhost:3472/shopmango/men?type=clothing&ct=t-shirts      Brings back tshirts in men
http://localhost:3472/shopmango/women?type=clothing&ct=t-shirts,jackets,suits  , brings back the mentioned categories
http://localhost:3472/shopmango/women?type=clothing&ct=Cardigans-sweaters  , brings back cardigans and sweaters
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

By incrementing the pagenos
and so on
untill at one point for a page no response would be null,we break out of the infinite loop
Now that we have scraped all the data we move to next link in the stack and so on 

Everything is asynchronous and all the racial conditions have been exceptionally handled

As all the resources are lazy loaded To scrape the data from the website's dom is inefficient as there are an array of images per product and they only get loaded into the dom only when u hover over them,this is an efficient solution

However ih've written the algorithm for hover and getting data from dom as well 

http://localhost:3472/shopmango/array/men?type=clothing&ct=coats

It does an infinite scroll to trigger and load all the lazy loaded data and does an automated hover of 300ms on each product to load in their data

But its slow compared to the previous algo.


<h4>Task 2 -George </h4>
<h2>&ct=//replace with categories below,  and everything is caseinsensitive and dont leave any white spaces</h2>
sample :  http://localhost:3472/george/men?type=clothing&ct=jeans
<br>
<br>

<hr>
Men categories :
Accessories,
Coats&Jackets,
FancyDress,
Jeans,
Joggers,
Jumpers&Cardigans,
Nightwear&Slippers,
Shirts,
Shorts,
Socks,
Sportswear,
Suits&Tailoring,
Sweatshirts&Hoodies,
Swimwear,
Trousers,
T-Shirts&Polos,
Underwear,

<hr>
Women categories :
Accessories,
Coats & Jackets,
Dresses,
Fancy Dress,
Jeans & Jeggings,
Jumpers & Cardigans,
Jumpsuits & Playsuits,
Leggings,
Maternity,
Nightwear & Slippers,
Shirts & Blouses,
Skirts & Shorts,
Sportswear & Joggers,
Socks & Tights,
Swimwear,
Tops,
Trousers,
<hr>

<h2>Usage</h2>


<h6 style='color:red;text-align:center'>Categories with spaces should be given iwht hyphens coats-jackets for Coats & jackets </h6>
sample: http://localhost:3472/george/men?type=clothing&ct=coats-jackets

Similar to the first one but here
http://localhost:3472/george/women?type=clothing&ct=Swimwear

http://localhost:3472/george/women?type=clothing gives all women clothing

http://localhost:3472/george/men?type=clothing&ct=jeans
<h3>Method</h3>

Similar to the first one, here tracking the vulnerabity was easier and it followed a pattern
https://direct.asda.com/on/demandware.store/Sites-ASDA-Site/default/SearchDEP-Show?cgid=${ctid}&start=0&sz

ctid is the category id which is in the url of each page so retieving it and giving it to the link would give all the items for the category including the ones that are lazy loaded for eg.Dresses

https://direct.asda.com/george/women/dresses/D1M1G20C1,default,sc.html -original page

getting the category and voila !

https://direct.asda.com/on/demandware.store/Sites-ASDA-Site/default/SearchDEP-Show?cgid=D1M1G20C1&start=0&sz

Easy! Doing this in a loop for all the pages needed would finish the job

<h6>Notice !! </h6>

The api can be accessed in a browser as well as postman or using http requests

Post man might be unable to beautify the json to make it readable,download the json from postman and paste it in ur favourite editor and use ur beautify plugin to beautify it or using any other online beautifier

<img src="Capture.PNG">
 Always have that button in that state it means dont wrap lines when we do the route call for the whole clothing database atleast 3200 items are returned and json goes upto 2mb and 21k lines if not wrapppd postman starts to lag,so  please make sure u dont wrap lines by having the button in that state


HTTP requests and browsers are completely fine those make sure to parse them to view them beauitfully !


<h3>File structure</h3>
<ul>
<li>app.js</li> Main server
<li>shopmango.js</li> Routes for shopmango
<li>george.js</li> Routes for george
<li>genericcode.js</li> Shopmango crawler
<li>genericcode2.js</li> george crawler
<li>arrayofimages.js</li> Hover infinite scroll logic for shopmango

</ul>















