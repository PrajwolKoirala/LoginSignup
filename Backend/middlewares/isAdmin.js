const jwt = require('jsonwebtoken');

// const isAdmin = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized: No token provided' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//     }
//     console.log('Decoded token:', decoded);
    
//     if (decoded && decoded.isAdmin === true) {
//        req.isAdmin = true;
//       next();
//     } else {
//       return res.status(403).json({ error: 'Forbidden: Not an admin' });
//     }
//   });
// };  

const isAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
      next();
    } else {
      res.status(403).send('Forbidden: Not an admin');
    }
  };
   

module.exports = isAdmin;
