const { getPool } = require("../../config/db");



const createStoryDetails = async (req, res, next) => {
    try {
        const { pool } = getPool();
        const { story_id, episode_id, comments, attachment, status_id } = req.body;
        const user_id = req.user.id;

        const query = `INSERT INTO story_details
        ( story_id, episode_id, comments, attachment, status_id,user_id,last_updated_by,last_updated_on)
        VALUES(?,?,?,?,?,?,?,NOW())`;
        const value = [story_id, episode_id, comments, attachment, status_id, user_id, user_id];
        await pool.query(query, value);
        res.status(201).json({ message: 'success', status: 201 });
    } catch (error) {
        next(error);
    }
}


const getStoryDetails = async (req, res, next) => {
    try {
        const { pool } = getPool();
        const query = `SELECT sd.*, st.name as story_name, se.name as episode_name
        FROM story_details sd 
        INNER JOIN story st 
        ON st.id = sd.story_id
        INNER JOIN story_episode se
        ON se.id = sd.episode_id
        `
        const [result] = await pool.query(query);
        res.status(200).json({ data: result[0], message: 'success', status: 200 });
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createStoryDetails,
    getStoryDetails
}