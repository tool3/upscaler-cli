const models = {
   'model': { name: 'MODEL', scale: ['SCALE'], seperator: false },
   '@upscalerjs/esrgan-slim': { name: '@upscalerjs/esrgan-slim', scale: ['2x', '3x', '4x', '8x'] },
   '@upscalerjs/esrgan-medium': { name: '@upscalerjs/esrgan-medium', scale: ['2x', '3x', '4x', '8x'] },
   '@upscalerjs/esrgan-thick': { name: '@upscalerjs/esrgan-thick', scale: ['2x', '3x', '4x', '8x'] },
   '@upscalerjs/esrgan-legacy': { name: '@upscalerjs/esrgan-legacy', scale: ['div2kx2', 'div2kx3', 'div2kx4', 'gans'] },
   '@upscalerjs/maxim-deblurring': { name: '@upscalerjs/maxim-deblurring', scale: ['64', '256'] },
   '@upscalerjs/maxim-dehazing': { name: '@upscalerjs/maxim-dehazing', scale: ['64', '256'] },
   '@upscalerjs/maxim-denoising': { name: '@upscalerjs/maxim-denoising', scale: ['64', '256'] },
   '@upscalerjs/maxim-deraining': { name: '@upscalerjs/maxim-deraining', scale: ['64', '256'] },
   '@upscalerjs/maxim-enhancement': { name: '@upscalerjs/maxim-enhancement', scale: ['64', '256'] },
   '@upscalerjs/maxim-retouching': { name: '@upscalerjs/maxim-retouching', scale: ['64', '256'] },
}

function getMaxLength(array: Record<string, any>) {
   return Object.keys(array).reduce((acc, key) => Math.max(acc, key.length), 0);
}

function row(model: Record<string, string[]>) {
   const maxLength = getMaxLength(models);
   const maxScaleLength = Object.values(models).reduce((acc, model) => Math.max(acc, model.scale.join(' ').length), 0);
   return '│' + ` ${model.name} ` + ' '.repeat(maxLength - model.name.length + 5) + model.scale.join(' ') + ' '.repeat((maxScaleLength - model.scale.join(' ').length) + 5) + '│';
}

export default function list() {
   const HEADER = '┌─────────────────────────────────────────────────────────────────────┐'
   const FOOTER = '└─────────────────────────────────────────────────────────────────────┘ ';
   const SEPERATOR = '├─────────────────────────────────────────────────────────────────────┤\n';

   const output = [HEADER];

   for (const key in models) {
      const model = models[key];
      const currentRow = model.seperator === undefined ? [SEPERATOR] : []
      currentRow.push(row(model));
      output.push(currentRow.join(''));
   }

   output.push(FOOTER);
   console.log('\x1b[0;2m' + output.join('\n') + '\x1b[0m');
}