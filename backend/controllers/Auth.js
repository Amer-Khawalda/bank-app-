const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse')

exports.SignUp = async (req, res, next) => {
    const { userName, email, password } = req.body;

    const user = await User.findOne({ email })

    if (user) {
        return next(new ErrorResponse("email is used", 403))

    }
    try {
        const user = await User.create({
            userName,
            email,
            password
        });
        sendToken(user, 201, res)

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });

    }
};

exports.Login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("please enter email and password", 400))
    }
    try {
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return next(new ErrorResponse("invalid credentials", 401))

        }

        const isMatch = await user.matchPasswords(password)
        if (!isMatch) {
            return next(new ErrorResponse("invalid credentials", 401))

        }
        sendToken(user, 200, res)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};






const sendToken = (user, statusCode, res) => {
    const token = user.getSignToken();
    res.status(statusCode).json({ success: true, jwttoken: token });
};