const express = require("express")
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 3000

const fs = require("fs")
// custom modules
// geo module
// const geo = require("GEO.js")
const GEO = require("./GEO")
const GameData = JSON.parse(fs.readFileSync('gamedata.json'))
/*
THIS PART IS MEANT FOR DATABASE AND AUTHENTICATION SETUP
*/
//#region 
ObjectID = require("mongodb").ObjectID
// Using original Monogdb driver
const db = require("./database")
const { getCollection, getPrimarykey, connect } = require("./database");
const { ReplSet, ObjectId } = require("mongodb");
connect((e) => {
    if (e) {
        console.log("Encountered and error while connecting to mongodb")
        return
    }
    console.log("Successfully connected to MongoDB!")
})


//#endregion



app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.sendFile('./DOCUMENTATION.html', { root: __dirname })
})

// create a new android user
app.post("/newuser/", (req, res) => {
    const deviceID = req.body.deviceID;
    const userID = req.body.username;


    //  Attempt to create new device in the database
    getCollection().findOne({ deviceID: deviceID }).then((result) => {
        if (result) {
            return res.status(204)
        } else {
            let huntProgress = GameData.hunts.map((x) => { return { title: x.title, progress: 0 } })

            getCollection().insertOne({ deviceID: deviceID, username: username, visitedPlaces : [] }).then(() => res.status(201))
        }
    })
})

// get available hunts
app.get("/places/", (req, res) => {
     res.send(GameData.places)
})





// check if near hot spot 
app.get("/checkNearby/:lat/:long", (req, res) => {
    const userLoc = [parseFloat(req.params.lat),parseFloat(req.params.long)]
    for (let place of GameData.places) {
        if (GEO.calcDistance(userLoc, place.coordinates)<1) {
            res.send(`${GEO.calcDistance(userLoc, place.coordinates)}`)
        } else {
            res.send(404)
        }
    }
})


app.get("/leaderboard", (req,res)=>{
    res.send([{
        username : "ujeet",
        placesFound : 10
    }, {
        username : "saket",
        placesFound : 10
    }, {
        username : "yoshi",
        placesFound : 10
    },
    {
        username : "rave",
        placesFound : 10
    }])
})



// app.post("/scanqr/:code", (req, res) => {
//     res.send("bug fff")
// })

app.listen(PORT)