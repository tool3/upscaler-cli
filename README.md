# upscaler-cli

![](/utils//logo/logo.png)

# What’s new

✅ Rewritten in TypeScript.  
✅ Full `upscalejs` [models](https://upscalerjs.com/models/) support!  
✅ Scale support (`2x`, `3x`, `4x`, and `8x`!).

using [upscalerjs](https://upscalerjs.com/)

# install

```bash
npm install upscaler-cli -g
```

# usage

```bash
upscaler <img or dir> [options]

# example
upscaler align_landscape.png -m @upscalerjs/esrgan-medium -s 4x -o upscales/
```

![](/alien_landscape.png)
![](/alien_landscape_upscaled.png)
Artist: stable-diffusion  
Prompt: a fantastic alien landscape

# Options

| name   | description                   | type   | example                        |
| ------ | ----------------------------- | ------ | ------------------------------ |
| model  | upscale model to use          | string | `-m @upscalerjs/esrgan-medium` |
| output | output directory              | string | `-o upscales/`                 |
| scale  | scale of upscale model to use | string | `-s 4x`                        |
