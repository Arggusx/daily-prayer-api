// services/translate.js
export async function traduzirTexto(texto) {
    const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            q: texto,
            source: "en",
            target: "pt",
            format: "text"
        })
    });

    const data = await response.json();
    return data.translatedText || texto;
}
