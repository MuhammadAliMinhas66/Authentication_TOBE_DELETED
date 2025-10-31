// Ye middleware check krega k user ka role allowed ha ya nhi
export const checkRole = (...allowedRoles) => {
    // allowedRoles aik array ha jisme allowed roles honge e.g. ['admin', 'moderator']
    
    return (req, res, next) => {
        try {
            // req.user mein role stored ha (verifyToken middleware ne store kia tha)
            const userRole = req.user?.role;
            
            // Agar user ka role nhi mila to error
            if (!userRole) {
                return res.status(403).json({
                    message: "Access denied: No role found",
                    success: false
                });
            }
            
            // Check kro k user ka role allowed roles mein ha ya nhi
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    message: `Access denied: ${userRole} role is not authorized for this action`,
                    success: false
                });
            }
            
            // Agar role match ho gya to next middleware/controller ko call kro
            next();
            
        } catch (error) {
            return res.status(500).json({
                message: "Error checking role",
                success: false,
                error: error.message
            });
        }
    };
};