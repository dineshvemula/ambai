const { getPool } = require("../../config/db");

// create new tag
const createMasterTag = async (req, res, next) => {
    try {
        const { pool } = getPool();
        const { name, status_id, banner_img } = req.body;
        const user_id = req.user.id;
        // perform input validation here
        const checkQuery = `
      SELECT COUNT(*) as count
      FROM master_tag
      WHERE name = ?
    `;
        // checking tag name alreasy exist
        const checkValues = [name];
        const [result] = await pool.query(checkQuery, checkValues);
        if (result[0].count > 0) return res.status(400).json({ message: 'Tag with given name already exists' });

        // create new tag
        const query = `
        INSERT INTO master_tag (
          name, status_id, banner_img, created_by, last_updated_by, created_on, last_updated_on
        )
        VALUES (
          ?, ?, ?, ?, ?, NOW(), NOW()
        )

      `;
        const values = [name, status_id, banner_img, user_id, user_id];
        await pool.query(query, values);
        res.status(200).json({ message: 'Created' });
    } catch (error) {
        next(error);
    }
};



// get api for tag
const getAllMasterTag = async (req, res, next) => {
    try {
        const { pool } = getPool();
        const query = `
    SELECT mt.name, mt.banner_img, ms.name as status
    FROM master_tag mt
    INNER JOIN master_status ms
    ON ms.id = mt.status_id
    `;
        const [result] = await pool.query(query);
        res.status(200).json({ data: result, message: 'success', status: 200 });
    } catch (error) {
        next(error)
    }
};


//get master tag by id

const getMasterTagById = async (req, res, next) => {

    try {
        const { pool } = getPool();
        const { id } = req.params;
        // retrieve tag details by id
        const query = `
          SELECT mt.name, mt.banner_img, ms.name as msStatus
          FROM master_tag mt
          INNER JOIN master_status ms
          ON ms.id = mt.status_id where mt.id = ?
          `;
        const values = [id];
        const [result] = await pool.query(query, values);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.status(200).json({ data: result[0] });
    } catch (error) {
        next(error)
    }
};


const updateMasterTag = async (req, res, next) => {


    try {
        const { pool } = getPool();
        const { name, status_id, banner_img } = req.body;
        const { id } = req.params;
        const values = [];
        let setClause = '';

        // dynamically generate the set clause based on input parameters
        if (name) {
            setClause += 'name = ?, ';
            values.push(name);
        }

        if (status_id) {
            setClause += 'status_id = ?, ';
            values.push(status_id);
        }

        if (banner_img) {
            setClause += 'banner_img = ?, ';
            values.push(banner_img);
        }

        // remove the last comma and space from the set clause
        setClause = setClause.slice(0, -2);

        // add the id value at the end of the values array
        values.push(id);

        const query = `
            UPDATE master_tag
            SET ${setClause}, last_updated_on = NOW()
            WHERE id = ?
        `;
        await pool.query(query, values);
        res.status(200).json({ message: 'Updated' });
    } catch (error) {
        next(error);
    }
};




module.exports = {
    createMasterTag,
    getAllMasterTag,
    getMasterTagById,
    updateMasterTag
}