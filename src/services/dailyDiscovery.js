import * as cheerio from "cheerio";
import Tesseract from "tesseract.js";
// import { translateText } from "./translate.js";

export async function getImage(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const imageUrl = $("img").first().attr("src");

    if (!imageUrl) {
        throw new Error("Nenhuma imagem encontrada na página");
    }

    return imageUrl;
}

export async function getDailyVerse() {
    const baseUrl = "https://discoverybiblestudy.org";

    const apiRes = await fetch("https://discoverybiblestudy.org/daily/api/", {
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    const contentType = apiRes.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
        const text = await apiRes.text();
        console.error("Resposta inesperada:", text.slice(0, 200));
        throw new Error("API não retornou JSON válido");
    }

    const apiData = await apiRes.json();


    const pageResponse = await fetch(apiData.verseUrl);
    const html = await pageResponse.text();

    const $ = cheerio.load(html);

    let imageUrl = $(".votd").attr("src");

    if (!imageUrl) {
        throw new Error("Imagem do verso não encontrada");
    }

    imageUrl = new URL(imageUrl, baseUrl).href;

    const ocrResult = await extractImage(imageUrl);

    return {
        imageUrl,
        ...ocrResult
    };
}


export async function getDailyPrayer() {

    const apiRes = await fetch(
        "https://discoverybiblestudy.org/daily/api/"
    );
    const apiData = await apiRes.json();

    const pageResponse = await fetch(apiData.verseUrl);
    const html = await pageResponse.text();

    const $ = cheerio.load(html);
    const textPrayer = $(".scp").text().trim();
    // const translatedPrayer = await translateText(textPrayer, "pt");
    const ref = $(".ref").text().trim();

    return {
        ref: apiData.ref,
        date: apiData.date,
        textOriginal: textPrayer,
        // textTranslate: translatedPrayer,
        textRef: ref
    };
}

export async function extractImage(imageUrl) {
    const response = await fetch(imageUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    console.log("CONTENT-TYPE:", response.headers.get("content-type"));

    if (!response.headers.get("content-type")?.startsWith("image/")) {
        throw new Error("URL não retornou uma imagem válida");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: { text } } = await Tesseract.recognize(buffer, "eng");

    // const translatedText = await translateText(text, "pt");

    return {
        originalText: text.trim(),
        // translatedText: translatedText
    }
}

