// @ts-ignore
import * as shellfie from 'shellfie';
import fs from 'fs';

const string = fs.readFileSync(__dirname + '/utils/logo/logo.txt').toString();

(async () => {
  await shellfie(string + '\n' + '              upscale images from your terminal', { viewport: { width: 550, height: 350 }, theme: { foreground: 'pink' } });
})();
