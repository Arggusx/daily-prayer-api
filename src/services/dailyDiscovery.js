import * as cheerio from "cheerio";

// Cache simples em memória
let cache = {
    date: null,
    data: null
};

export async function getDailyReflection() {
    // Verifica se temos cache para a data de hoje (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];
    if (cache.date === today && cache.data) {
        console.log("Retornando reflexão do cache...");
        return cache.data;
    }

    console.log("Fazendo web scraping da reflexão diária (Canção Nova)...");
    try {
        const response = await fetch("https://homilia.cancaonova.com/pb/");
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Extrai o título (normalmente no h1.entry-title)
        let title = $("h1.entry-title span").text().trim();
        if (!title) {
            title = $("h1.entry-title").text().trim();
        }

        // Extrai os parágrafos do corpo da reflexão
        const contentArray = [];
        $("div.entry-content.content-homilia").children("p, h3").each((i, el) => {
            const text = $(el).text().trim();
            if (text) {
                contentArray.push(text);
            }
        });
        
        const content = contentArray.join("\n\n");

        if (!title && !content) {
            throw new Error("Não foi possível extrair o título e o conteúdo da página.");
        }

        const result = {
            success: true,
            date: today,
            title: title || "Reflexão Diária",
            content: content
        };

        // Salva no cache
        cache = {
            date: today,
            data: result
        };

        return result;

    } catch (error) {
        console.error("Erro ao fazer scraping:", error.message);
        throw error;
    }
}
