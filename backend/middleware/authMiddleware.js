import dotenv from "dotenv";
dotenv.config();

const apiKeyAuth = (req, res, next) => {
  const clientKey = req.headers["x-api-key"];  //taking key from hader

  if (!clientKey || clientKey !== process.env.GLOBAL_SECRET_KEY) {
    return res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }
  
  next(); // if key is ok then go new middilware
};

export default apiKeyAuth;
