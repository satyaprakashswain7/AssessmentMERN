require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const questionRoutes = require("./routes/questinRoutes");
const authRoutes = require("./routes/authRoutes");
const studentSubmissionRoutes = require("./routes/studentSubmissionRoutes");

const app = express();

// ✅ CORS config for local and Vercel frontend
app.use(
  cors({
    origin: true, // Reflects the request origin
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.redirect(process.env.FRONTEND_URL);
});

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/submission", studentSubmissionRoutes);

// ✅ MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
