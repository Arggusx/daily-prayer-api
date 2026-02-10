import * as cheerio from "cheerio";
import { text } from "express";
import { traduzirTexto } from "./translate.js";

export async function getDailyPrayer() {
    const traduzido = await traduzirTexto(textPrayer);

    const apiRes = await fetch(
        "https://discoverybiblestudy.org/daily/api/"
    );
    const apiData = await apiRes.json();

    const pageResponse = await fetch(apiData.verseUrl);
    const html = await pageResponse.text();

    const $ = cheerio.load(html);

    const textPrayer = $(".scp").text().trim();
    const ref = $(".ref").text().trim();

    return {
        ref: apiData.ref,
        date: apiData.date,
        text: traduzido,
        textRef: ref,
    };
}
