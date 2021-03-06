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


// const path = require("path")
// app.use(express.static(path.join(__dirname, 'build')))

// app.get('/website', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
app.get("/",(req,res)=>{
    res.send("HOWDYHACK2020 API")
})





// create a new android user
app.post("/newuser/", (req, res) => {
    const deviceID = req.body.deviceID;
    const username = req.body.username;

    //  Attempt to create new device in the database
    getCollection().findOne({ deviceID: deviceID }).then((result) => {
        if (result) {
            return res.sendStatus(409)
        } else {
            console.log("works 1", username)
            getCollection().insertOne({ deviceID: deviceID, username: username, visitedPlaces: [] }).then(() => res.sendStatus(201))
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
    const deviceID = req.params.id
    //  Attempt to create new device in the database
    try {
        getCollection().findOne({ deviceID: deviceID }).then((user) => {
            if (user) {
                return res.send(user.visitedPlaces.map(x => parseInt(x)))
            } else {
                return res.sendStatus(404)
            }
        })
    } catch (error) {
        if (error) return res.sendStatus(500)
    }

})


// check if near hot spot 
app.post("/checkNearby/", (req, res) => {
    const userLoc = [parseFloat(req.body.coordinates[0]), parseFloat(req.body.coordinates[1])]
    const deviceID = req.body.deviceID
    let nearestList = GameData.places.sort((a,b)=>{ return (GEO.calcDistance(userLoc, a.coordinates)-GEO.calcDistance(userLoc, b.coordinates) )})
    let place = nearestList[0]
    let i = 0
    if (GEO.calcDistance(userLoc, place.coordinates)) {
        if (GEO.calcDistance(userLoc, place.coordinates) < 0.1) {
            try {
                getCollection().updateOne({ deviceID: deviceID }, { $push: { visitedPlaces: i } }, function (err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                })
            } catch (error) {
                console.log("error with checkNearby")
            }
            return res.send({ distance: null, place: place, index : i })

        } else {
            return res.send({ distance: GEO.calcDistance(userLoc, place.coordinates), place: place, index: i })
        }
    }


    // for (let i in GameData.places) {
    //     let place = GameData.places[i]


    //     if (GEO.calcDistance(userLoc, place.coordinates) < 1) {
    //         if (GEO.calcDistance(userLoc, place.coordinates) < 0.1) {
    //             try {
    //                 getCollection().updateOne({ deviceID: deviceID }, { $push: { visitedPlaces: i } }, function (err, res) {
    //                     if (err) throw err;
    //                     console.log("1 document updated");
    //                 })
    //             } catch (error) {
    //                 console.log("error with checkNearby")
    //             }
    //             return res.send({ distance: null, place: place, index : i })

    //         } else {
    //             return res.send({ distance: GEO.calcDistance(userLoc, place.coordinates), place: place, index: i })
    //         }
    //     } else if (i == (GameData.places.length - 1)) {
    //         return res.sendStatus(404)
    //     }
    // }
})



app.get("/leaderboard", (req, res) => {
    getCollection().find({}).toArray(function (err, result) {
        if (err) throw err;
        let filtered = result.sort((a, b) => { return b.visitedPlaces.length - a.visitedPlaces.length }).map(item => { return { username: item.username, visitedPlaces: item.visitedPlaces.length } })
        res.send(filtered)
    })
})







//#region  TESTTT


app.get("/test/leaderboard", (req, res) => {

    getCollection().find({}).toArray(function (err, result) {
        if (err) throw err;
        let filtered = result.sort((a, b) => { return b.visitedPlaces.length - a.visitedPlaces.length }).map(item => { return { username: item.username, score: item.visitedPlaces.length } })
        res.send(filtered)
    })


    // res.send([{
    //     username: "ujeet",
    //     placesFound: 10
    // }, {
    //     username: "saket",
    //     placesFound: 10
    // }, {
    //     username: "yoshi",
    //     placesFound: 10
    // },
    // {
    //     username: "rave",
    //     placesFound: 10
    // }])
})
//#endregion







// app.post("/scanqr/:code", (req, res) => {
//     res.send("bug fff")
// })

app.listen(PORT)