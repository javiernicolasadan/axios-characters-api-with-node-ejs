const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        //  console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
       // res.json(responseFromAPI.data)
    })
    .catch(err => console.error(err))
});

router.get("/characters/create", (req, res) => {
    res.render("characters/create-character")
})

router.post("/characters/create", async (req, res, next) => {
    try {
        /* console.log("req.body", req.body) */
        axios
        .post(`https://ih-crud-api.herokuapp.com/characters`, req.body)
        .then((response) => {
            console.log("created: ", response.data)

        })
     res.redirect("/characters");
        
    } catch (error) {
        console.log(error)
    }
});

router.get("/characters/:id/edit", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
         console.log("details: ", responseFromAPI.data)
        res.render("characters/edit-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.post("/characters/:id/edit", (req, res, next) => {
    console.log("req.body", req.body)
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, req.body)
    .then(responseFromAPI => {
         console.log("details: ", responseFromAPI.data)
         res.redirect(`/characters/${req.params.id}`);
    })
    .catch(err => console.error(err))
});

router.post("/characters/:id/delete", (req, res, next) => {
    /* console.log("req.params", req.params) */
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
         res.redirect(`/characters`);
    })
    .catch(err => console.error(err))
});
router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
         /* console.log("details: ", responseFromAPI.data) */
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters