const express = require('express')
const app = express()
const port = 5000   //as react port is already 3000
const mongoDB = require("./db")
const bodyparser = require('body-parser') //For Payment Gateway
const stripe = require('stripe')("sk_test_51Mhu33SJ1eKemPlyeLE7g0YTVuA65o6MQPM5gLN6uSK3NwHROaoJZlreHWMmRGGMhurD8M4P6uqgioyzSBsC3WV200ccFn30YF")  //For Payment Gateway
const uuid = require('uuid').v4
const cors = require('cors')

mongoDB();  //calling mongoDB() function from db.js for mongoose connection

//For Submitting data to backend 
//required code to write always
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

//For Payment Gateway
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// app. use() is used to mount the specified middleware function(s) at the path which is being specified. 
// It is mostly used to set up middleware for your application.
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))

//To Fetch data from Database & display to  frontend
app.use('/api', require("./Routes/DisplayData"))

//For Cart checkout
app.use('/api', require("./Routes/OrderData"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//For Payment Gateway
app.post('/checkout',async (req, res) => {
  console.log(req.body);


  let error, status;
  try {
    const { token, totalPrice } = req.body

    const customer = await stripe.customers.create({
      email : token.email,
      source : token.id
    }); 

    const key = uuid()  //to generate unique key for each transaction

    const charge = await stripe.charges.create(
      {
        amount : totalPrice * 81.71,
        currency : "usd",
        customer : customer.id,
        receipt_email : token.email,
        description : `Purchased price : ${totalPrice}`,
        shipping : {
          name : token.card.name,
          address: {
            line1 : token.card.address_line1,
            line2 : token.card.address_line2,
            city : token.card.address_city,
            country : token.card.address_country,
            postal_code : token.card.address_zip,
          },
        },
      },
      {
        key : key 
      }
    );

    console.log("Charge : ", {charge});
    status = "success";

  } catch (error) {
    console.log("fkdslfkldslkf" + error);
    status = "failure";
  }

  res.json({error, status});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})