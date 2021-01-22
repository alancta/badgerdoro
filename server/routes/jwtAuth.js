const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
//registering a new user
router.post("/register", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body (name,email, password)
    const { name, email, password } = req.body;

    //2. check if user exists (if user exists, throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);
    if (user.rows.length !== 0) {
      //if any rows are returned, that means user already exists
      return res.status(401).send("User already exists."); // return 401 - Unauthenticated user
    }
    //3. Bcrypt the user's pw
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //4. Add the new user to our databse
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

        //5. generating our jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        console.log(token);
        res.json({ token });

    //Add reward info related to the user to our database
    const newReward = await pool.query(
      'INSERT INTO rewards(user_email,badgerbucks) VALUES ($1,100)',[email]
    );


  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//login route
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. Destructure
    const { email, password } = req.body;
    //2. check if user doesn't exist, if not then throw error
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);
    if (user.rows.length === 0) {
      //user doesn't exist
      return res.status(401).send("password or email is incorrect");
    }
    //3. check if incoming password as db password
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!isValidPassword) {
      return res.status(401).json("password or email is incorrect");
    }
    //4. Give jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verified", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
