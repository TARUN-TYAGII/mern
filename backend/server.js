const express = require("express");
const path = require("path");
const env = require("dotenv");
const cors = require("cors");
env.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", goalRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please use the produciton environment");
  });
}

console.log("empty commit")

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
