const { connection } = require('../../config/db');


// create new category
const createMasterCategory = (req, res, next) => {
    const { name, status_id, banner_img, created_by, last_updated_by } = req.body;

    // perform input validation here
    const checkQuery = `
      SELECT COUNT(*) as count
      FROM master_category
      WHERE name = ?
    `;
    const checkValues = [name];

    // check if category with given name already exists
    connection.query(checkQuery, checkValues, function (err, result) {
        if (err) {
            return res.status(500).json({ message: 'check the values something went wrong' });
        } else if (result[0].count > 0) {
            return res.status(400).json({ message: 'Category with given name already exists' });
        } else {
            // category with given name does not exist, insert new category
            const query = `
    INSERT INTO master_category (
      name, status_id, banner_img, created_by, last_updated_by, created_on, last_updated_on
    )
    VALUES (
      ?, ?, ?, ?, ?, NOW(), NOW()
    )
  `;
            const values = [name, status_id, banner_img, created_by, last_updated_by];

            connection.query(query, values, function (err) {
                if (err) {
                    return res.status(500).json({ message: 'something went wrong' });
                } else {
                    return res.status(200).json({ message: 'Created' });
                }
            });
        }
    });
};



// get api for category
const getAllMasterCategories = (req, res, next) => {
    const query = `
    SELECT mc.name, mc.banner_img, ms.name as status
    FROM master_category mc
    INNER JOIN master_status ms
    ON ms.id = mc.status_id
    `;

    connection.query(query, function (err, result) {
        if (err) {
            return res.status(400).json({ message: 'something went wrong' });
        } else {
            return res.status(200).json({ data: result });
        }
    });
};


//get master category by id

const getMasterCategoryById = (req, res, next) => {
    const { id } = req.params;

    // retrieve category details by id
    const query = `
        SELECT mc.name, mc.banner_img, ms.name as msStatus
        FROM master_category mc
        INNER JOIN master_status ms
        ON ms.id = mc.status_id where mc.id = ?
    `;
    const values = [id];

    connection.query(query, values, function (err, result) {
        if (err) {
            return res.status(400).json({ message: 'Something went wrong' });
        } else if (result.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        } else {
            return res.status(200).json({ data: result[0] });
        }
    });
};


const updateMasterCategory = (req, res, next) => {
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
        UPDATE master_category
        SET ${setClause}, last_updated_on = NOW()
        WHERE id = ?
    `;

    connection.query(query, values, function (err) {
        if (err) {
            return res.status(400).json({ message: 'something went wrong' });
        } else {
            return res.status(200).json({ message: 'Updated' });
        }
    });
};




module.exports = {
    createMasterCategory,
    getAllMasterCategories,
    getMasterCategoryById,
    updateMasterCategory
}