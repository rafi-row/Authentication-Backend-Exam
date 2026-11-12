const emailRegex = require("../regex/emailRegex");
const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {



  let { email, password } = req.body;
  if (!email) {
    res.send({ error: "Email Is Required" });


  } else if (!emailRegex(email)) {
    res.send({ error: "Valid Email Required" });


  } else if (!password) {
    res.send({ error: "Password Is Required" });


  } else {
    let existingData = await UserSchema.find({ email: email });

    
    if (existingData.length > 0) {
      bcrypt.compare(
        password,
        existingData[0].password,
        function (err, result) {
          if (err) {
            res.send({ error: "Invaild Creadiential" });
          } else {
            if (result) {
              res.send({
                success: "Login Successfully",
                id: existingData[0]._id,
                email: existingData[0].email,
                username: existingData[0].username,
              })
            } else {
              res.send({ error: "Invaild Creadiential" });
            }
          }
        },
      );
    } else {
      res.send({ error: "Invaild Creadiential" });
    }
  }
};
module.exports = loginController;
