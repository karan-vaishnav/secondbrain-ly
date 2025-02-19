"use strict";
// import jwt from "jsonwebtoken";
// import { JWT_USER_SECRET } from "./config";
// function authMiddleware(req, res, next) {
//   const token = req.headers.authorization;
//   const response = jwt.verify(token, JWT_USER_SECRET);
//   if (response) {
//     req.userId = response.id;
//     next();
//   } else {
//     res.status(403).json({
//       message: "Invalid User!",
//     });
//   }
// }
// export { authMiddleware };
