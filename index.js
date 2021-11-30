const express = require('express');
const app = express();
require('dotenv').config()
const { MongoClient } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0bfuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect()
        const database = client.db('portfolioDB')
        const portfolioCollection = database.collection('portfolio')



        //Set projects into the api
        app.get('/projects', async (req, res) => {
            const cursor = portfolioCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })
    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Welcome to my portfolio')
});

app.listen(port, () => {
    console.log('listening from port', port)
});