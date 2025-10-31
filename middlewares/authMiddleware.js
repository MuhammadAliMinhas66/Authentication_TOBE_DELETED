import jwt from "jsonwebtoken";

// Ye middleware check krega k user ne valid token bheja ha ya nhi
export const verifyToken = (req, res, next) => {
    try {
        // Header se token nikal rhey hn (Authorization: Bearer <token>)
        const token = req.headers.authorization?.split(' ')[1];
        
        // Agar token nhi mila to error bhej do
        if (!token) {
            return res.status(401).json({
                message: "No token provided, access denied",
                success: false
            });
        }
        
        // Token ko verify kr rhey hn JWT secret se
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Decoded data ko req.user mein store kr diya (next middleware use kr sakti ha)
        req.user = decoded;
        
        // Next middleware ya controller ko call kro
        next();
        
    } catch (error) {
        // Agar token invalid ya expired ha to error
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
            error: error.message
        });
    }
};