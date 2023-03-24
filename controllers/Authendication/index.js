const { connection } = require('../../config/db');



const createUser = (req, res, next) => {
    const { fName, lName, email, password } = req.body;

    // query to check email
    const checkQuery = `
    SELECT COUNT(*) as count
    FROM users
    WHERE email = ?
  `;
    const checkValues = [email];

    connection.query(checkQuery, checkValues, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'check the values something went wrong' });
        } else if (result[0].count > 0) {
            // if email already exist
            return res.status(400).json({ message: 'Email already exists' });
        } else {
         
        }
    })
}
