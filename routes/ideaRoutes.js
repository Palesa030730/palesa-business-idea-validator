const express = require("express");
const axios = require("axios");
const pool = require("../db");

const router = express.Router();

const AI_SERVICE_URL = "http://localhost:8000";

// POST /api/validate
router.post("/validate", async (req, res) => {
    try {
        const { idea } = req.body;

        if (!idea) {
            return res.status(400).json({
                status: "error",
                message: "Business idea is required"
            });
        }

        // Send the business idea to the AI service
        const aiResponse = await axios.post(
            `${AI_SERVICE_URL}/analyze`,
            { idea }
        );

        const {
            score,
            verdict,
            message
        } = aiResponse.data;

        // Save the AI result in PostgreSQL
        const result = await pool.query(
            `INSERT INTO business_ideas
            (idea, score, verdict, message)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [idea, score, verdict, message]
        );

        res.status(201).json({
            status: "success",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Validation error:", error.message);

        res.status(500).json({
            status: "error",
            message: "Failed to validate business idea"
        });
    }
});

// GET /api/ideas
router.get("/ideas", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM business_ideas ORDER BY id ASC"
        );

        res.json({
            status: "success",
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Failed to retrieve business ideas"
        });
    }
});

// GET /api/ideas/:id
router.get("/ideas/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            "SELECT * FROM business_ideas WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Business idea not found"
            });
        }

        res.json({
            status: "success",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Failed to retrieve business idea"
        });
    }
});

// PUT /api/ideas/:id
router.put("/ideas/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { idea } = req.body;

        if (!idea) {
            return res.status(400).json({
                status: "error",
                message: "Business idea is required"
            });
        }

        const result = await pool.query(
            `UPDATE business_ideas
             SET idea = $1
             WHERE id = $2
             RETURNING *`,
            [idea, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Business idea not found"
            });
        }

        res.json({
            status: "success",
            message: "Business idea updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Failed to update business idea"
        });
    }
});

// DELETE /api/ideas/:id
router.delete("/ideas/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            "DELETE FROM business_ideas WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Business idea not found"
            });
        }

        res.json({
            status: "success",
            message: "Business idea deleted successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Failed to delete business idea"
        });
    }
});

module.exports = router;