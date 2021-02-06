const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    //req.user has the payload
    console.log("in dashboard");
    // Get User's name and email
    const user = await pool.query(
      "SELECT user_firstName,user_lastName,user_email FROM users WHERE user_id = $1",
      [req.user]
    );
    
    const userFirstName = user.rows[0].user_firstname;
    const userLastName = user.rows[0].user_lastname;
    const userEmail = user.rows[0].user_email;


    //Get user's reward e.g. badgerbucks
    const user_reward = await pool.query(
      "SELECT badgerbucks FROM rewards WHERE user_email = $1",[userEmail]
    );

    const badgerbucks = user_reward.rows[0].badgerbucks;

    console.log(badgerbucks);
    res.json({
      user_firstname:userFirstName,
      user_lastname:userLastName,
      user_email:userEmail,
      badgerbucks:badgerbucks
    });
    // console.log(user_reward[0]);
    // res.json(user_reward);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});
module.exports = router;
