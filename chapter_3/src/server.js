import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
const app = express();
const PORT = process.env.PORT || 5000;

// Get the file path  from the URL of the current module
const __filemame = fileURLToPath(import.meta.url);

// GET the  directory name from the file path
const __dirname = dirname(__filemame);

//Middleware
app.use(express.json());
// Serves the HTML File from the /public directory
// Tells express to serve all files from  the public folder as static assets /file. Any request for the css file will be resolved to the public directory.
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Routes
app.use("/auth", authRoutes);
app.use('/todos', authMiddleware, todoRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT} `);
});
