import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    if (data.userId) {
      req.userId = data.userId;
      next();
    } else {
      return res.status(403).json({ message: "Invalid token" });
    }
  });
};

export default auth;
