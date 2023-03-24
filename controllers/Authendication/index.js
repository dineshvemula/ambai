const { connection } = require('../../config/db');
const { verify, hash } = require("../../services/password");
const { generate } = require("../../services/token");


// creating new user sign up
const createUser = (req, res, next) => {
    var { fName, lName, email, password } = req.body;

    // query to check email
    const checkQuery = `
    SELECT COUNT(*) as count
    FROM users
    WHERE email = ?
  `;
    const checkValues = [email];

    connection.query(checkQuery, checkValues, async (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'check the values something went wrong' });
        } else if (result[0].count > 0) {
            // if email already exist
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            password = await hash(req.body.password);

            const query = `
            INSERT INTO users (
              fName,lName,email,password,role_id,status_id,created_on,last_updated_on
            )
            VALUES (
              ?, ?, ?, ?, ?, ?, NOW(), NOW()
            )
          `;
            const values = [fName, lName, email, password, 1, 3];
            connection.query(query, values, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'something went wrong' });
                } else {
                    return res.status(200).json({ message: 'Created' });
                }
            });
        }
    })
}


// login existing user

const login = (req, res, next) => {
    const { email, password } = req.body;

    // query to check email
    const checkQuery = `
    SELECT u.fName, u.lName, u.email, u.phone, u.profile_image_src, u.password, mr.name as role, ms.name as status
    FROM users u
    INNER JOIN master_role mr
    ON mr.id = u.role_id
    INNER JOIN master_status ms
    ON ms.id = u.status_id 
    where email = ?
    `;
    const checkValues = [email];
    // checking email
    connection.query(checkQuery, checkValues, async (err, result) => {
        if (err) {
            console.log(err, '======');
            return res.status(500).json({ message: 'check the values something went wrong' });
        } else if (result.length === 0) {
            // if email not exist
            return res.status(400).json({ message: 'Email not exists' });
        } else {
            const doc = result[0];
            const isPasswordMatch = await verify(password, doc.password);
            if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid password' });

            const tokenData = { ...doc };
            delete tokenData.password;

            // creating token
            const token = await generate(tokenData);
            return res.status(200).json({ token: token })
        }
    })
}

module.exports = {
    createUser,
    login
}