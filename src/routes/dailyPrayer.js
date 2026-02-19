import express from "express";
import { getDailyPrayer } from "../services/dailyDiscovery.js";


const router = express.Router();

router.get("/daily", async (req, res) => {
    try {
        console.log("Buscando conteúdo diário...");
        const prayer = await getDailyPrayer();
        // const verse = await getDailyVerse();

        return res.json({
            prayer
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar conteúdo diário" });
    }
});



export default router;
