const express = require('express')
const router = express.Router()
const User = require('../models/User')
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const axios = require('axios')
const jwtSecret = "MyHobbyisssGuitarDrawingCoding$#"    //Random secret

//FOR REGISTER
//app.use /api(from index.js) call to /createuser & then data is created in Database
router.post("/createuser", [
    body('email').isEmail(),    // Email must be valid
    body('name').isLength({ min: 3 }),  // name must be at least 3 chars long
    body('password', 'Incorrect Password').isLength({ min: 5 })]  // password must be at least 5 chars long
    , async (req, res) => {

        //To validate body  before try-catch
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //bcrypt function are always async so use await with it
        //Value any you want
        const salt = await bcrypt.genSalt(10);
        //For hash creation we require 2 param:-
        //1st -> Value whose hash you want to create i.e. password given by user
        //2nd -> Salt to given to it
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({     //User is from models->User.js
                name: req.body.name,   //Here, we are getting data from User i.e. Front-end using req. & store it in DB
                password: secPassword,  //To store encrypt password in DB
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })    //Check it on Thunder-Client

        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })


//FOR LOGIN
//to find data from database     
router.post("/loginuser", [
    body('email').isEmail(),    // Email must be valid
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        //To validate body  before try-catch
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });  //return document whose data match with the entered one in Database
            if (!userData) {   //i.e. useremail not exist in Database
                return res.status(400).json({ errors: "User with E-mail not exist !" });
            }

            //To compare ecrypted password with original password
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) // i.e. Frontend data == Database Data
            {
                return res.status(400).json({ errors: "Incorrect Password !" });
            }
            //To return authorization Token to the user
            //So, when he/she comes than find their data such as order details, cart details //etc.

            const data = {
                user: {
                    id: userData.id   //Here, we are taking id of user from DB
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken });
        }
        catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)  //To get lar-lon as indicater
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                console.log(`statusCode: ${res.status}`)
                //console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                //console.log(response)

                let { townhall, road, city, state, postcode } = response
                return String(townhall + ", " + road + ", " + city + ", " + state + "-" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})


module.exports = router;