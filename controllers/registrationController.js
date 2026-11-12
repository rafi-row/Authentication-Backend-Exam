const emailRegex = require("../regex/emailRegex")
const passwordRegex = require("../regex/passwordRegex")
const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt');

const registrationController = async (req, res) => {
    let { username, email, password } = req.body

    if (!username) {
        res.send({ error: "User Name Is required" })


    } else if (!email) {
        res.send({ error: "Email Is Required" })


    } else if (!emailRegex(email)) {
        res.send({ error: "input valied Email" });


    }
    else if (!password) {
        res.send({ error: "Password Is Required" })

        
    }  else if (!passwordRegex(password)) {
        res.send({ error: "Input Correct Password" });
    }
    else {

        let existinguser = await UserSchema.find({ email: email })
        if (existinguser.length > 0) {
            res.send({ error: "Data Already Existed" });

        } else {

            bcrypt.hash(password, 6, function (err, hash) {

                const data = new UserSchema({
                    username: username,
                    email: email,
                    password: hash,
                })

                data.save()
                res.send({
                    username: data.username,
                    email: data.email,
                    success: "Registration Successfully"

                })

            });

        }

    }

}
module.exports = registrationController
