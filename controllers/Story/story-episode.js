const { getPool } = require("../../config/db");



const createEpisode = async (req, res, next) => {
    try {
        const { pool } = getPool();
        const created_by = req.user.id;

        const
            {
                story_id, episode_no, name, title, logo, banner, content_tamil, content_english, content_telugu, content_kannada, content_malayalam, status_id
            } = req.body;

        // checking episode already exist or not
        const checkQuery = `SELECT COUNT(*) as count
                            FROM story_episode
                            WHERE episode_no = ?
                            AND story_id = ?`;
        const checkValues = [episode_no, story_id];
        const doc = await pool.query(checkQuery, checkValues);

        if (doc[0].count > 0) return res.status(400).json({ message: `Episode ${episode_no} is alreay exist for this story` });
        // creating new episode
        const query = `INSERT INTO story_episode
                       (story_id, episode_no, name, title, logo, banner, content_tamil, content_english, content_telugu, content_kannada, content_malayalam, status_id,last_updated_by,last_updated_on)
                       VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?.NOW())`;
        const values = [story_id, episode_no, name, title, logo, banner, content_tamil, content_english, content_telugu, content_kannada, content_malayalam, status_id, created_by]
        await pool.query(query, values);
        res.status(201).json({ message: 'Episode created', status: 200 });
    } catch (error) {
        next(error);
        console.log(error);
    }
};


// get episode list

const getEpisodes = async (req, res, next) => {
    try {

        const { pool } = getPool();

        let query = `SELECT story_episode.*, story.*, master_status.* 
                     FROM story_episode 
                     JOIN story ON story.id = story_episode.story_id 
                     JOIN master_status ON master_status.id = story_episode.status_id 
                     WHERE 1 = 1
                     `;

        const filterKeys = Object.keys(req.params);
        if (filterKeys.length > 0) {
            filterKeys.forEach((key) => {
                query += ` AND ${key} = '${req.params[key]}'`;
            });
        };
        const [result] = await pool.query(query);
        if (result.length === 0) return res.status(404).json({ message: 'Episode not found', error: error, status: 404 });
        res.status(200).json({ data: result, message: 'Success', status: 200 });
    } catch (error) {
        console.log(error);
    }
}



module.exports = { createEpisode, getEpisodes }

