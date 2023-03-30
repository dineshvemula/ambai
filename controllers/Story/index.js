const { connection } = require('../../config/db');


const createStory = (req, res, next) => {
  const { name, title, banner_img, logo_img, category_id, story_type_id, status_id, created_by, last_updated_by } = req.body;
  const { user_id } = req.user;
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

  const data = connection.query(query, values,
    function (err) {
      if (err) {
        return res.status(400).json({ message: 'something went wrong', error: err, status: 400 })
      } else {
        return res.status(200).json({ message: 'Created', status: 200 })
      }
    });
};





module.exports = { createStory }