const POST_MODEL = require("../models/Post");


const FindByTitle = async (req, res) => {

    try {
        const Post_Found = await POST_MODEL.findOne({ title: req.params.title });
        if (!Post_Found) {
            return res.status(404).json({ success: false, message: "Post not Found!" })
        }
        res.status(200).json({ success: true, data: Post_Found })
    } catch (ERROR) {
        res.status(500).json({ success: false, message: ERROR.message })
    }

};

module.exports = { FindByTitle };
