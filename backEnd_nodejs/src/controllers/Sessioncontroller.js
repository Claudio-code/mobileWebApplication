// index ,show, store, update, destroy
const User = require('../models/User');
module.exports = {
    async store(req, res) {
        const { email } = req.body;
        
        let user = (await User.findOne({ email })) ? await User.findOne({ email }) : await User.create({ email });  

        return res.json(user);
    }
};