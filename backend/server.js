import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import asyncThrottle from 'async-throttle';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
const corsOptions = {
    // origin: "http://localhost:3000"   *for local
    origin: "*",
    optionsSuccessStatus: 200 // For legacy browser support
};

// Throttling is important because you don't want to
// overload the API
const createThrottle = asyncThrottle;
const throttle = createThrottle(2);

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get('/getData', cors(corsOptions), async (req, res) => {

    const fetchOptions = {
        method: 'GET'
    }

    // First push all the links into an array using the list of engines
    const engineList = req.query.engine.split(',')
    const pageNumber = req.query.page

    const links = [];
    for (let i = 0; i < engineList.length; i++) {
        links.push(`https://gophie-ocena.herokuapp.com/list/?page=${pageNumber}&engine=${engineList[i]}`);
        console.log(engineList[i])
    }

    // Next create an array of promises by `map`ing
    // over the links using `fetch`.
    // Notice I've used throttle here to slow down the hits on the API

    const promises = links.map(link => throttle(async() => {
        const response = await fetch(link, fetchOptions);
        return await response.json();
    }));

    // Once all the promises are complete, iterate over their datasets
    Promise.all(promises).then(datasets => {
        // iterate over datasets
        const results = [];

        for (let i = 0; i < datasets.length; i++) {
            for (let j = 0; j < datasets[i].length; j++) {
                results.push(datasets[i][j]);
            }
        }

        res.json(results);
        console.log(results.length)
    });
    
    
    // res.json("All is well");
});

app.listen(PORT, () => {
    // console.log(`Example app listening at http://localhost:${PORT}`); for local server
    console.log(`Example app listening at port ${PORT}`);
});
