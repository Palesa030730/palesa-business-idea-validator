const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const ideaRoutes = require("./routes/ideaRoutes");

app.use("/api", ideaRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Palesa's Business Idea Validator API"
    });
});

app.listen(PORT, () => {
    console.log(`Palesa's API is running on http://localhost:${PORT}`);
});