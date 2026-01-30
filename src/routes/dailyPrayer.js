import express from "express";
import { getDailyPrayer } from "../services/dailyDiscovery.js";

const router = express.Router();

router.get("/daily-prayer", async (req, res) => {
    try {
        const data = await getDailyPrayer();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar oração" });
    }
});

export default router;
