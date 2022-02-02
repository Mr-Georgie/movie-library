import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = process.env.PORT || 5000
const app = express();

app.use(cors());
const corsOptions = {
    // origin: "http://localhost:3000"   *for local
    origin: "https://moviee-library.netlify.app/",
    optionsSuccessStatus: 200 // For legacy browser support
};

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get('/getData', cors(corsOptions), async (req, res) => {
    const fetchOptions = {
        method: 'GET'
    }
    const requestEndpoint = `https://gophie-ocena.herokuapp.com/list/?page=${req.query.page}${req.query.engine === "" ? "" : `&engine=${req.query.engine.toLowerCase()}`}`;

    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json();
    console.log(req.query)
    res.json(jsonResponse);
});

app.listen(PORT, () => {
    // console.log(`Example app listening at http://localhost:${PORT}`); for local server
    console.log(`Example app listening at port ${PORT}`);
});
