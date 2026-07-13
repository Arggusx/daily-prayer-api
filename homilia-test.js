import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('homilia.html', 'utf8');
const $ = cheerio.load(html);

const title = $('h1.entry-title span').text().trim() || $('h1.entry-title').text().trim();

let content = [];
$('div.entry-content.content-homilia').children('p, h3').each((i, el) => {
  const text = $(el).text().trim();
  if (text) {
    content.push(text);
  }
});

console.log('TITLE:', title);
console.log('CONTENT:', content.join('\n\n'));
