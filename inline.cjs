const fs = require('fs'), path = require('path');
const dist = path.join(__dirname, 'dist');
let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, (_, src) => {
  const js = fs.readFileSync(path.join(dist, src.replace('./', '')), 'utf8');
  return `<script type="module">\n${js}\n</script>`;
});
html = html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/, (_, href) => {
  const css = fs.readFileSync(path.join(dist, href.replace('./', '')), 'utf8');
  return `<style>\n${css}\n</style>`;
});
fs.writeFileSync('/mnt/user-data/outputs/hype-drink.html', html);
console.log('inline ok', (html.length/1024).toFixed(0)+'kb', /assets\//.test(html) ? 'AINDA TEM REF EXTERNA' : 'self-contained');
