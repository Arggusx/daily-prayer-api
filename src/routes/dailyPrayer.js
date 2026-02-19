import express from "express";
// import { getDailyPrayer, getDailyVerse } from "../services/dailyDiscovery.js";


const router = express.Router();

router.get("/daily", async (req, res) => {
    console.log("Buscando conteúdo diário...");
    try {
        // const prayer = await getDailyPrayer();
        // const verse = await getDailyVerse();
        console.log("Enviando resposta de teste...");
        return res.json({
            message: "Se você ler isso, o problema está nas funções getDaily!",
            debug: "Comente as linhas acima e descomente estas para testar."
        });

    } catch (err) {
        console.error("Erro detectado:", err);
        return res.status(500).json({ error: "Erro ao buscar conteúdo diário" });
    }
});



export default router;
