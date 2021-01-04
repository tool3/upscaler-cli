# clider
[![Build Status](https://travis-ci.org/tool3/clider.svg?branch=master)](https://travis-ci.org/tool3/clider)  ![lint](https://github.com/tool3/clider/workflows/lint/badge.svg)   
a simple cli template

# usage
simply click `Use this template` and your'e good !  

# what's in the box
- `yargs`
- `eslint`
- `husky`
- `mocha`
- `chai`
- `github actions` for `lint` and `test`

# after 
once you created a repository using this template, use the following steps:  
  * update and rename `package.json`
  * add `"bin"` section to `package.json`:
  ```json
  "bin": {
      name_of_cli: "./index.js"
  }
  ```
