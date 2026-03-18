// it is a middleware function named authenticateUser for the 
// auth module.its main purpose is to verify the JWT 
//token(already created by the auth routes) sent in the
//  request Authorization header and attach the
//  decoded user if the token is valid.
// its endpoint is not defined currently in app.js,
//  but i have tested it in app.js using 

// import { authenticateUser } from "./middleware/authMiddleware.js";

// app.get("/protected", authenticateUser, (req, res) => {
//   res.json({
//     message: "Protected route accessed",
//     user: req.user
//   });
// });


import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};