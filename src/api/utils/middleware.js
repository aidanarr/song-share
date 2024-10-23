require("dotenv").config();
const jwt = require("jsonwebtoken");

// auth middleware
function authorize (req, res, next) {
    try {
        const tokenString = req.headers.authorization;

        if(!tokenString) {
            return res.status(400).json({successs: false, message: "You must login first"})
        } else {
            try {
                const token = tokenString;
                const verifiedToken = jwt.verify(token, process.env.SECRET);
                 req.userInfo = verifiedToken;
            } catch (error) {
                return res.status(400).json({success: false, message: error})
            }
        }
        
        next();

    } catch (error) {
        return res.status(400).json({success: false, message: error})
    } 
};

//CORS middleware
function CORS(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://example.com");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
}

module.exports = { authorize, CORS };