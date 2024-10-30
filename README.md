# upscaler-cli

![](/src//logo/logo.png)

# What’s new

✅ Rewritten in TypeScript.  
✅ Full `upscalejs` [models](https://upscalerjs.com/models/) support!  
✅ Scale support (`2x`, `3x`, `4x`, and `8x`!).

using [upscalerjs](https://upscalerjs.com/)

# Install

```bash
npm install upscaler-cli -g
```

# Usage

```bash
upscaler <img or dir> [options]

# example
upscaler align_landscape.png -m @upscalerjs/esrgan-medium -s 4x -o upscales/
```

![](/alien_landscape.png)
![](/alien_landscape_upscaled.png)
Artist: stable-diffusion  
Prompt: a fantastic alien landscape

> [!TIP]
> If upscaling appears "stuck" - it's probably maxing out the nodejs memory limit trying to upscale the image.  
> Try a lower scale, or a different model to see if it improves result time.

# Commands

| name        | description                                                             | example                        |
| ----------- | ----------------------------------------------------------------------- | ------------------------------ |
| path/to/img | path to image/directory to upscale                                      | `upscaler alien_landscape.png` |
| list, ls    | list all supported upscale models and their respective supported scales | `upscaler ls`, `upscaler ls`   |

# Options

| name   | description                   | type   | example                        |
| ------ | ----------------------------- | ------ | ------------------------------ |
| model  | upscale model to use          | string | `-m @upscalerjs/esrgan-medium` |
| output | output directory              | string | `-o upscales/`                 |
| scale  | scale of upscale model to use | string | `-s 4x`                        |

# Models

[upscalerjs models page](https://upscalerjs.com/models/)

| name                               | scale                        |
| ---------------------------------- | ---------------------------- |
| @upscalerjs/esrgan-slim            | 2x 3x 4x 8x                  |
| @upscalerjs/esrgan-medium          | 2x 3x 4x 8x                  |
| @upscalerjs/esrgan-thick           | 2x 3x 4x 8x                  |
| @upscalerjs/esrgan-legacy          | div2kx2 div2kx3 div2kx4 gans |
| @upscalerjs/maxim-deblurring       | 64 256                       |
| @upscalerjs/maxim-dehazing-indoor  | 64 256                       |
| @upscalerjs/maxim-dehazing-outdoor | 64 256                       |
| @upscalerjs/maxim-denoising        | 64 256                       |
| @upscalerjs/maxim-deraining        | 64 256                       |
| @upscalerjs/maxim-enhancement      | 64 256                       |
| @upscalerjs/maxim-retouching       | 64 256                       |

# Examples

upscale an image using the default upscaling model

```bash
upscaler image.png
```

| example                                        | description                                                                                                                 |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `upscaler ls`                                  | list all available upscale models and their supported scales                                                                |
| `upscaler image.png`                           | upscale image using the default model and save to current directory                                                         |
| `upscaler image.png -o ./upscales`             | upscale image using the default model and save to `./upscaels` (directory `./upscales` will be created if it doesn't exist) |
| `upscaler image.png -s 4x`                     | upscale image using the default model with a scale of `4` and save to current directory                               |
| `upscaleer -m @upscalerjs/esrgan-medium -s 8x` | upscale image using `@upscalerjs/esrgan-medium` model with a scale of `8` and save to current directory                     |
