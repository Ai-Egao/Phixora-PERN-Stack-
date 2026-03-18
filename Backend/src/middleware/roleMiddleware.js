// it is a middleware function named authorizeRoles for the 
// auth module.its main purpose is to check that weather 
// the authenticated user has the required role(s) 
// to access a specific route.


export const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access forbidden"
      });
    }

    next();
  };
};