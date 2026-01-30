export async function getDailyPrayer() {
    const apiRes = await fetch(
        "https://discoverybiblestudy.org/daily/api/"
    );
    const apiData = await apiRes.json();

    const pageResponse = await fetch(apiData.verseUrl);
    const html = await pageResponse.text();

    return {
        ref: apiData.ref,
        date: apiData.date,
        html
    };
}
