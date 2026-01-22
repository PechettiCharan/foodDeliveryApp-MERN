import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};

export default authMiddleware;
