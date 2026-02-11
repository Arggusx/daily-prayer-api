import express from "express";
import { getDailyPrayer, getDailyVerse } from "../services/dailyDiscovery.js";


const router = express.Router();

router.get("/daily", async (req, res) => {
    try {
        const prayer = await getDailyPrayer();
        const verse = await getDailyVerse();

        return res.json({
            prayer,
            verse
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar conteúdo diário" });
    }
});



export default router;
