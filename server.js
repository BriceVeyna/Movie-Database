const express = require('express');
const mysql = require('mysql2');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movie_db'
    },
    console.log('Connected to the movies_db database')
);


//* It's done when the `/api/movies` route renders a list of all movies.
app.get('/api/movies', (req, res) => {
    db.query("SELECT movie_name FROM movies", function (err, results) {
        if(results) {
            res.json(results);
        }
    });
    console.log("yeah!");
})
//* It's done when the `/api/add-movie` route successfully adds a movie when tested using Insomnia.
app.post('/api/add-movie', (req, res) => {
    let newMovie = req.body.movie;
    console.log(newMovie);
    const insert = `INSERT INTO movies (movie_name) VALUES ("${newMovie}")`;
    db.connect(function(err) {
        if(err) throw err;
        console.log("connected");
        db.query(insert, function (err, result) {
            if (err) throw err;
            console.log("success")
        });
    });
    res.json("New movie added");
})
// * It's done when the `/api/update-review` route successfully updates a movie when tested using Insomnia.
// app.post('/api/update-review', (req, res) => {

// })
// * It's done when the `/api/movie/:id` route deletes a route when tested using Insomnia.
// app.delete('/api/movie/:id', (req, res) => {

// })





app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});