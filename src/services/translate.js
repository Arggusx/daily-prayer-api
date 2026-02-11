export async function translateText(text, targetLang = "pt") {
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;

        const response = await fetch(url);
        const data = await response.json();

        const translated = data?.responseData?.translatedText || "";

        // Quando excede o limite de tradução, volta texto original
        if (
            !translated ||
            translated.includes("MYMEMORY WARNING") ||
            translated.toLowerCase().includes("limit")
        ) {
            console.warn("⚠️ Limite atingido. Retornando texto original.");
            return text;
        }

        return translated;

    } catch (error) {
        console.error("Erro na tradução:", error.message);
        return text;
    }
}
