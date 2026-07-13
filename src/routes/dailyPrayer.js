import express from "express";
import { getDailyReflection } from "../services/dailyDiscovery.js";

const router = express.Router();

router.get("/daily-reflection", async (req, res) => {
    try {
        console.log("Buscando reflexão diária...");
        const reflection = await getDailyReflection();

        // O retorno já está no formato exigido: { success, date, title, content }
        return res.json(reflection);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false, 
            error: "Erro ao buscar conteúdo diário" 
        });
    }
});

export default router;
