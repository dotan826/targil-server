import express from 'express';
const app = express();
const port = process.env.PORT || 4000;
import * as database from './database';

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add new comment
app.post('/add', (req, res) => {
  // console.log(req.body);

  database.connectAndGetDatabaseObject().then((db) => {
    database.insertSpecificDocument(db, "Comments", req.body).then(
        (result) => {
            res.send(result);
        }
    )
  });
});

// Get all comments
app.get('/get', (req, res) => {
  database.connectAndGetDatabaseObject().then((db) => {
    db.collection("Comments").find({}).toArray((err, documents) => {
        if (err) {
            throw err; // Error
        }
        else {
            res.send(documents); // Send comments array to client
        }
    });
});
});

// Redirect all unknown urls back to main page !
app.get('/', (req, res) => {
    res.redirect("/index.html");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
