const fs = require("fs/promises");



const uploadImage = async (file, folder) => {
    const fileExt = file.originalname.split(".").pop();
    await fs.rename(file.path, `${file.path}.${fileExt}`);
    const url = `${process.env.HOST}/static/${folder}/${file.filename}.${fileExt}`;
    return url;
}


module.exports = {
    uploadImage
}