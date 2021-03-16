import { ADMIN, SUPER, USER } from '../config/roles.js';

const authRole = (ROLES) => {
   return function (req, res, next) {
      const { role: userRole } = req.user;

      if (typeof ROLES === 'string' && userRole === ROLES) {
         return next();
      } else if (Array.isArray(ROLES) && ROLES.includes(userRole)) {
         return next();
      }

      res.status(403).json({ success: false, error: 'Access Forbidden.' });
   };
};

export default authRole;
