const { getPool } = require("../../config/db");



const createStoryType = async (req, res, next) => {
    try {
        const { pool } = getPool();
        const { name, status_id } = req.body;
        const created_by = req.user.id;

        const checkQuery = `SELECT COUNT(*) as count
                            FROM story_types
                            WHERE name = ? `

        const checkValue = [name];
        // checking name alreaady exist
        const [doc] = await pool.query(checkQuery, checkValue);
        if (doc[0].count > 0) return res.status(400).json({ message: 'Story type with given name already exists' });
        // creating new type
        const query = `INSERT INTO story_types (
            name, status_id, created_by, last_updated_by, created_on, last_updated_on
          )
          VALUES (
            ?, ?, ?, ?, NOW(), NOW()
          )`;
        const value = [name, status_id, created_by, created_by]
        await pool.query(query, value);
        res.status(201).json({ message: 'success', status: 200 });
    } catch (error) {
        next(error);
    }
}

module.exports = {createStoryType}