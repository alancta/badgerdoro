module.exports = function(req, res, next) {
  const { email, firstName,lastName, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  function validPassword(password){
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (![email, firstName,lastName, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }else if(!validPassword(password)){
      return res.status(401).json("Invalid Password");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      //check if any are empty
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }else if(!validPassword(password)){
      return res.status(401).json("Invalid Password");
    }
  }

  next();
};
