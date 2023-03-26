const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderData', async(req, res) => {
    let data = req.body.order_data  //to get data from frontend
    await data.splice(0, 0, {Order_date : req.body.order_date}) //to get date from frontend

    //if email not existing in db then create; else InsertMany()
    let eId = await Order.findOne({'email' : req.body.email})   //to get email of user
    //console.log(eId);

    if(eId === null){   // eId === null i.e. User order 1st time
        try {
            await Order.create({    //so, create user Order
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({success : true})
            })
        } catch (error) {
            console.log(error);
            res.send("Server Error",error)
        }
    }
    else{   //User is not 1st time to order item
        try {
            await Order.findOneAndUpdate({email: req.body.email}, 
                {$push : {order_data : data}}).then(() => { //$push to append new ordered item data 
                    res.json({success : true})
                })  
        } catch (error) {
            res.send("Server Error", error)
        }
    }
})

//For MyOrder
router.post('/myOrderData', async(req, res)=>{
try {
    let myData = await Order.findOne({'email': req.body.email})
    res.json({orderData : myData})
} catch (error) {
    res.send("Server Error", error)
}
})

module.exports = router;