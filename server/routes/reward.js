const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/", async (req, res) => {
try {
    console.log("reward system");

    const {email, badgerbucks} = req.body;

    if(badgerbucks<0){
        return res.status(401).send("Invalid badgerbucks");
    }

    //Add the reward to the database 
    const addReward = await pool.query(
        "UPDATE rewards SET badgerbucks = badgerbucks + $2 WHERE user_email = $1",[email,badgerbucks]
    );

    //5. Test output
    
    console.log("Added reward",badgerbucks);
    res.json("100");
} catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
}



});

module.exports = router;