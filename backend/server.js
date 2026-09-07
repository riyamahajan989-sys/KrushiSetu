const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🌾 KrushiSetu Backend is running",
        version: "1.0.0"
    });
});

// Database connection test
app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            backend: "running",
            database: "connected",
            serverTime: result.rows[0].now
        });

    } catch (error) {

        console.error("Database error:", error.message);

        res.status(500).json({
            success: false,
            backend: "running",
            database: "not connected",
            error: error.message
        });
    }
});

// Get all crops
app.get("/api/crops", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM crops ORDER BY name"
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error("Crops API error:", error.message);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all markets
app.get("/api/markets", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM markets ORDER BY name"
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error("Markets API error:", error.message);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get market prices
app.get("/api/prices", async (req, res) => {
    try {
        const { crop } = req.query;

        let query = `
            SELECT
                mp.id,
                c.id AS crop_id,
                m.id AS market_id,
                c.name AS crop,
                m.name AS market,
                m.city,
                mp.price,
                mp.min_price,
                mp.max_price,
                mp.price_date
            FROM market_prices mp
            JOIN crops c ON mp.crop_id = c.id
            JOIN markets m ON mp.market_id = m.id
        `;

        const values = [];

        if (crop) {
            query += ` WHERE LOWER(c.name) = LOWER($1)`;
            values.push(crop);
        }

        query += ` ORDER BY c.name, mp.price DESC`;

        const result = await pool.query(query, values);

        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error("Prices API error:", error.message);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ==============================
// ROAD DISTANCE API
// ==============================

app.get("/api/distance", async (req, res) => {

    try {

        const {
            fromLat,
            fromLon,
            toLat,
            toLon
        } = req.query;

        if (
            fromLat === undefined ||
            fromLon === undefined ||
            toLat === undefined ||
            toLon === undefined
        ) {

            return res.status(400).json({
                success: false,
                error: "Missing location coordinates"
            });

        }

        const url =
            `https://router.project-osrm.org/route/v1/driving/` +
            `${fromLon},${fromLat};${toLon},${toLat}` +
            `?overview=false`;

        const response =
            await fetch(url);

        if (!response.ok) {

            throw new Error(
                "Routing service unavailable"
            );

        }

        const data =
            await response.json();

        if (
            !data.routes ||
            data.routes.length === 0
        ) {

            throw new Error(
                "No road route found"
            );

        }

        const distanceKm =
            data.routes[0].distance / 1000;

        const durationMinutes =
            data.routes[0].duration / 60;

        res.json({

            success: true,

            distanceKm:
                Number(distanceKm.toFixed(2)),

            durationMinutes:
                Number(durationMinutes.toFixed(1))

        });

    } catch (error) {

        console.error(
            "Distance API error:",
            error.message
        );

        res.status(500).json({

            success: false,

            error:
                "Unable to calculate road distance"

        });

    }

});

// ==============================
// CALCULATE NET REALIZATION API
// ==============================

app.post("/api/calculate", async (req, res) => {

    try {

        const {
            cropId,
            marketId,
            quantity,
            sellingPrice,
            transportCost = 0,
            loadingCost = 0,
            unloadingCost = 0,
            marketCharge = 0,
            commission = 0,
            otherExpenses = 0
        } = req.body;

        // Basic validation
        if (
            !cropId ||
            !marketId ||
            !quantity ||
            !sellingPrice
        ) {
            return res.status(400).json({
                success: false,
                error: "Crop, market, quantity and selling price are required"
            });
        }

        const qty = Number(quantity);
        const price = Number(sellingPrice);

        const grossIncome = qty * price;

        const totalExpenses =
            Number(transportCost) +
            Number(loadingCost) +
            Number(unloadingCost) +
            Number(marketCharge) +
            Number(commission) +
            Number(otherExpenses);

        const netRealization =
            grossIncome - totalExpenses;

        // Save calculation in database
        const result = await pool.query(
            `
            INSERT INTO calculations
            (
                crop_id,
                market_id,
                quantity,
                selling_price,
                transport_cost,
                loading_cost,
                unloading_cost,
                market_charge,
                commission,
                other_expenses,
                gross_income,
                total_expenses,
                net_realization
            )
            VALUES
            (
                $1, $2, $3, $4, $5, $6, $7,
                $8, $9, $10, $11, $12, $13
            )
            RETURNING *
            `,
            [
                cropId,
                marketId,
                qty,
                price,
                Number(transportCost),
                Number(loadingCost),
                Number(unloadingCost),
                Number(marketCharge),
                Number(commission),
                Number(otherExpenses),
                grossIncome,
                totalExpenses,
                netRealization
            ]
        );

        res.json({
            success: true,
            message: "Calculation completed successfully",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(
            "Calculation API error:",
            error.message
        );

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});
// Start server
app.listen(PORT, () => {

    console.log("======================================");
    console.log("🌾 KRUSHISETU BACKEND");
    console.log("======================================");
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`❤️  Database test: http://localhost:${PORT}/api/health`);
    console.log("======================================");

});
