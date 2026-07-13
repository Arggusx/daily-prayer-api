import fs from 'fs';

async function getSite() {
  const r = await fetch('https://liturgia.cancaonova.com/pb/');
  const t = await r.text();
  fs.writeFileSync('liturgia.html', t);
}
getSite();
