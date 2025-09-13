import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

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

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT} `);
});
