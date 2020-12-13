const express = require('express')
const router = express.Router()
//const uuid = require('uuid')

let movies = require('../../Stubbed/Movies')

//get the move list in the form of JSON
router.get('/', (req, res) => {
    res.json(movies)
})

//get movie by id
router.get('/:id', (req, res) => {
    const found = movies.some(movie => movie.id === parseInt(req.params.id))

    if(found){
        res.json(movies.filter(movie => movie.id == parseInt(req.params.id)))
    } else {
        res.sendStatus(400).send('Movie not found')
    }
})

//Add movie to the list
//http://localhost:3000/api/movies/movie

router.post('/movie', (req, res) => {
    const movie = req.body

    console.log(movie)
    movies.push(movie)

    res.send("Movie is added to the list!")
})

//Delete movie
//http://localhost:3000/api/movies/movie/4
router.delete('/movie/:id', (req, res) => {
    const id = req.params.id

    movies = movies.filter((movie) => {
        if(movie.id !== id){
            return true;
        }
        return false;        
    })
    res.send("Movie is deleted")
    
    //## Alternate way of writing the code

    // const found = movies.some(movie => movie.id === parseInt(req.params.id))

    // if(found){
    //     movie = movies.filter(movie => movie.id !== parseInt(req.params.id))
    //     res.json({msg: "Movie deleted", movie})
    // } else {
    //     res.sendStatus(400).send("Unable to delete movie")
    // }
})


//Export router
module.exports = router