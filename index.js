const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const app = express();


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success")
})


app.post("/data", async function (req, res) {
  console.log(req.body)
  try {

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080', '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] });

    const page = await browser.newPage();

    await page.goto(`https://www.amazon.in/s?k=${req.body.product}`, {
      waitUntil: "networkidle2",
    });



    try {
      const namex = await page.$eval(
        "#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(5) > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a > span",
        (el) => el.innerText
      );

      const imagex = await page.$eval(
        "#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(5) > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20.s-list-col-left > div > div.s-product-image-container.aok-relative.s-image-overlay-grey.s-text-center.s-padding-left-small.s-padding-right-small.s-flex-expand-height > div > span > a > div > img",
        (el) => el.src
      );


      const offer_pricex = await page.$eval(
        "#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(5) > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20 > div > div.a-section.a-spacing-none.a-spacing-top-micro.s-price-instructions-style > div.a-row.a-size-base.a-color-base > a > span:nth-child(1) > span:nth-child(2) > span.a-price-whole",
        (el) => el.innerText
      );

      const actual_pricex = await page.$eval(
        "#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(5) > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20 > div > div.a-section.a-spacing-none.a-spacing-top-micro.s-price-instructions-style > div.a-row.a-size-base.a-color-base > a > span.a-price.a-text-price > span:nth-child(2)",
        (el) => el.innerText
      );



      var amazon = {
        "provider": "Amazon",
        "url": `https://www.amazon.in/s?k=${req.body.product}`,
        "name": namex,
        "image": imagex,
        "actualprice": actual_pricex,
        "offerprice": offer_pricex
      }




    } catch (error) {

    }


    const page1 = await browser.newPage();

    await page1.goto(`https://www.flipkart.com/search?q=${req.body.product}`, {
      waitUntil: "networkidle2",
    });

    try {
      const name = await page1.$eval(
        "#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a > div._3pLy-c.row > div.col.col-7-12 > div._4rR01T",
        (el) => el.innerText
      );

      const image = await page1.$eval(
        "#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a > div.MIXNux > div._2QcLo- > div > div > img",
        (el) => el.src
      );


      const offer_price = await page1.$eval(
        "#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a > div._3pLy-c.row > div.col.col-5-12.nlI3QM > div._3tbKJL > div._25b18c > div._30jeq3._1_WHN1",
        (el) => el.innerText
      );




      try {
        var actual_price = await page1.$eval(
          "#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a > div._3pLy-c.row > div.col.col-5-12.nlI3QM > div._3tbKJL > div._25b18c > div._3I9_wc._27UcVY",
          (el) => el.innerText
        );

      } catch (error) {
        var actual_price = "same as sale price"
      }
      var flipkart = {
        "provider": "Flipkart",
        "url": `https://www.flipkart.com/search?q=${req.body.product}`,
        "name": name,
        "image": image,
        "actualprice": actual_price,
        "offerprice": offer_price
      }



    } catch (error) {


      const name = await page1.$eval(
        "#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div > a.s1Q9rs",
        (el) => el.innerText
      );

      const image = await page1.$eval(
        "#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div > a._2rpwqI > div:nth-child(1) > div > div > img",
        (el) => el.src
      );


      const offer_price = await page1.$eval(
        "#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div > a._8VNy32 > div._25b18c > div._30jeq3",
        (el) => el.innerText
      );



      try {
        var actual_price = await page1.$eval(
          "#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div > a._8VNy32 > div._25b18c > div._3I9_wc",
          (el) => el.innerText
        );

      } catch (error) {
        var actual_price = "same as sale price"
      }
      var flipkart = {
        "provider": "Flipkart",
        "url": `https://www.flipkart.com/search?q=${req.body.product}`,
        "name": name,
        "image": image,
        "actualprice": actual_price,
        "offerprice": offer_price
      }


    }

    await browser.close();


    let data = [amazon, flipkart]
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "try again later" });
  }
});



app.listen(process.env.PORT || 3000);
