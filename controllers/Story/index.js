const { getPool } = require("../../config/db");


const createStory = async (req, res, next) => {

  try {
    const { pool } = getPool();
    const { name, title, banner_img, logo_img, category_id, story_type_id, status_id } = req.body;
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
    const values = [user_id, name, title, banner_img, logo_img, category_id, story_type_id, status_id, user_id, user_id];

    await pool.query(query, values);
    return res.status(200).json({ message: 'Created', status: 200 })
  } catch (error) {
    next(error);
  }

};

// get stories list
const getStories = async (req, res, next) => {
  try {
    const { pool } = getPool();
    const query = ` SELECT sc.*, ms.name as status, mc.name as category, ur.fName as user_id 
                    FROM story sc 
                    INNER JOIN master_status ms
                    ON ms.id = sc.status_id
                    INNER JOIN master_category mc
                    ON mc.id = sc.category_id
                    INNER JOIN users ur
                    ON ur.id = sc.user_id
                    WHERE 1 = 1`;

    // checking if any filters existing
    const filterKeys = Object.keys(req.params);
    if (filterKeys.length > 0) {
      filterKeys.forEach((key) => {
        query += ` AND ${key} = '${req.params[key]}'`;
      });
    };

    const [result] = await pool.query(query);
    res.status(200).json({ message: 'success', data: result, status: 200 });
  } catch (error) {
    next(error);
  }
};


const getStoryById = async (req, res, next) => {
  try {
    const { pool } = getPool();
    const { id } = req.params;

    // checking story exist or not
    const query = `SELECT * FROM story WHERE id = ?`;
    const [data] = await pool.query(query, [id]);
    if (!data.length) return res.status(404).json({ message: 'Story not found', status: 404 });
    const story = data[0];
    // getting episodes related to story
    const episodesQuery = `
    SELECT *
    FROM story_episode
    WHERE story_id = ?
  `;
    const [episodes] = await pool.query(episodesQuery, [id]);
    story.episodes = episodes;
    res.status(200).json({ message: 'success', result: story, status: 200 })
  } catch (error) {
    next(error)
  }
}

module.exports = { createStory, getStories, getStoryById }