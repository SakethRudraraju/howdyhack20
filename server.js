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
    const username = req.body.username;

    //  Attempt to create new device in the database
    getCollection().findOne({ deviceID: deviceID }).then((result) => {
        if (result) {
            return res.send(409)
        } else {
            console.log("works 1", username)
            getCollection().insertOne({ deviceID: deviceID, username : username, visitedPlaces: [] }).then(() => res.send(201))
        }
    })

})


app.post("/selfie/", (req, res) => {
    // const deviceID = req.body.deviceID;
    // const userID = req.body.username;


    // //  Attempt to create new device in the database
    // getCollection().findOne({ deviceID: deviceID }).then((result) => {
    //     if (result) {
    //         return res.status(204)
    //     } else {
    //         let huntProgress = GameData.hunts.map((x) => { return { title: x.title, progress: 0 } })

    //         getCollection().insertOne({ deviceID: deviceID, username: username, visitedPlaces : [] }).then(() => res.status(201))
    //     }
    // })


    //demo endpoint
    res.send("success")
})

app.get("/photos/:deviceID", (req, res) => {
    res.sendFile('demo.png', { root: __dirname })
})

// get available hunts
app.get("/places/", (req, res) => {
    res.send(GameData.places)
})

app.get("/visited/:id", (req, res) => {
    const deviceID = req.param.id
    //  Attempt to create new device in the database
    try {
        getCollection().findOne({ deviceID: deviceID }).then((user) => {
            if (user) {
                return res.send(user.visitedPlaces)
            } else {
                return res.status(404)
            }
        })
    } catch (error) {
        if (error) return res.status(500)
    }

})


// check if near hot spot 
app.post("/checkNearby/", (req, res) => {
    const userLoc = [parseFloat(req.body.coordinates[0]), parseFloat(req.body.coordinates[1])]
    const deviceID = req.body.deviceID
    for (let i in GameData.places) {
        let place = GameData.places[i]
        if (GEO.calcDistance(userLoc, place.coordinates) < 1) {
            if (GEO.calcDistance(userLoc, place.coordinates) < 0.1) {
                try {
                    getCollection().findOne({ deviceID: deviceID }).then((user) => {
                        if (user) {
                            return res.send(user.visitedPlaces)
                        } else {
                            return res.status(404)
                        }
                    })
                } catch (error) {
                    console.log("error with checkNearby")
                }
                return res.send({ distance: null, place: i })

            } else {
                return res.send({ distance: GEO.calcDistance(userLoc, place.coordinates), place: place, index: i })
            }
        } else {
            return res.sendStatus(404)
        }
    }
})



app.get("/leaderboard", (req, res) => {
    res.send([{
        username: "ujeet",
        placesFound: 10
    }, {
        username: "saket",
        placesFound: 10
    }, {
        username: "yoshi",
        placesFound: 10
    },
    {
        username: "rave",
        placesFound: 10
    }])
})





// app.post("/scanqr/:code", (req, res) => {
//     res.send("bug fff")
// })

app.listen(PORT)