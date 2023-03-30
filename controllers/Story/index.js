const { getPool } = require("../../config/db");


const createStory = async (req, res, next) => {

  try {
    const { pool } = getPool();
    const { name, title, banner_img, logo_img, category_id, story_type_id, status_id, created_by, last_updated_by } = req.body;
    const user_id = req?.user?.id;
    // perform input validation here
    const query = `
      INSERT INTO story (
        user_id, name, title, banner_img, logo_img, category_id, story_type_id, status_id, created_by, last_updated_by, created_on, last_updated_on
      )
      VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()
      )
    `;
    const values = [user_id, name, title, banner_img, logo_img, category_id, story_type_id, status_id, created_by, last_updated_by];

    const data = await pool.query(query, values);
    return res.status(200).json({ message: 'Created', status: 200 })
  } catch (error) {
    next(error);
  }

};
// get stories list
const getStories = async (req, res, next) => {
  try {
    const { pool } = getPool();
    const query = ` SELECT *, ms.name as status, mc.name as category, ur.name as user_id 
                    FROM story sc 
                    INNER JOIN master_status ms
                    ON ms.id = sc.status_id
                    INNER JOIN master_category mc
                    ON mc.id = sc.category_id
                    INNER JOINT users ur
                    ON ur.id = sc.user_id`;
    const result = await pool.query(query);
    res.status(200).json({ message: 'success', data: result, status: 200 });
  } catch (error) {
    next(error);
  }
};






module.exports = { createStory, getStories }