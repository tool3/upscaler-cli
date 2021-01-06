# shellfie-cli
create beautiful terminal screenshots using formatted string

# usage
```bash
echo "\x1b[32mHello world" | shellfie --width 200
```
or
```bash
shellfie "\x1b[32mHello" "\x1b[33mWORLD"
```

# useful examples
```bash
yarn test --colors > test.txt
cat test.txt | shellfie --mode raw
```

# options

see [shellfie](https://github.com/tool3/shellfie)