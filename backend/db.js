const mongoose = require('mongoose');

// mongoose.set() is used to suppress a warning
mongoose.set('strictQuery', true);
//To connect it with database use .connect()
const mongoURI = 'mongodb+srv://foodie:foodie@cluster0.nmixmkl.mongodb.net/foodiemern?retryWrites=true&w=majority'

//'async' & 'await' is use as mongoose take so much time to connect &
//'err' is use to show ERROR if connection not happens 
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
        if (err) {
            console.log("-----", err)
        }
        else {
            console.log("connected")
            //To fetch collection 
            const fetched_data = mongoose.connection.db.collection("food_items")

            //To fetch all data we not define anything inside {} & store it in Array 
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log("-------", err)
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })

                // if(err) console.log("-------",err)
                // else{
                //     global.food_items = data;
                //     //console.log(data);
                // }
            })
        }
    });
}
module.exports = mongoDB;

