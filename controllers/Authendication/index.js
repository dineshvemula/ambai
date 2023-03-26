const { getPool } = require("../../config/db");
const { verify, hash } = require("../../services/password");
const { generate } = require("../../services/token");


// creating new user sign up
const createUser = async (req, res, next) => {
    try {
        const { pool } = getPool();
        var { fName, lName, email, password } = req.body;
        // query to check email
        const checkQuery = `
        SELECT COUNT(*) as count
        FROM users
        WHERE email = ?
      `;
        const checkValues = [email];
        // checking email already exist
        const [result] = await pool.query(checkQuery, checkValues)
        if (result[0].count > 0) return res.status(400).json({ message: 'Email already exists' });
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
        await pool.query(query, values,);
        res.status(200).json({ message: 'Created' });
    } catch (error) {
        next(error)
    }
};


// login existing user

const login = async (req, res, next) => {

    try {
        const { pool } = getPool();
        const { email, password } = req.body;


        // query to check email
        const checkQuery = `
    SELECT u.id, u.fName, u.lName, u.email, u.phone, u.profile_image_src, u.password, mr.name as role, ms.name as status
    FROM users u
    INNER JOIN master_role mr
    ON mr.id = u.role_id
    INNER JOIN master_status ms
    ON ms.id = u.status_id 
    where email = ?
    `;
        const checkValues = [email];
        const [doc] = await pool.query(checkQuery, checkValues);
        // if email not exist
        if (doc.length === 0) return res.status(400).json({ message: 'Email not exists' });
        const result = doc[0];
        const isPasswordMatch = await verify(password, result.password);
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid password' });

        const tokenData = { ...result };
        delete tokenData.password;
        // creating token
        const token = await generate(tokenData);
        return res.status(200).json({ token: token })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    login
}