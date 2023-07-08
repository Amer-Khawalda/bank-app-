const User = require('../models/User');

exports.userInfo = async (req, res ,) => {

    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    try {
    res.status(200).json(user);
        
    } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  
    }
};






