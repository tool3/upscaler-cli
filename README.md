# shellfie-cli
create beautiful terminal screenshots using formatted string

# usage
```bash
echo "\x1b[32mHello world" | shellfie -w 200 -h 200 -n hello
```
or
```bash
shellfie "\x1b[32mHello" "\x1b[33mWORLD" -w 200 -n world
```

# useful examples
```bash
lolcat --help > help.txt
cat help.txt | shellfie -m raw
```
![](https://github.com/tool3/shellfied/blob/master/lolcat.png?raw=true)

```bash
shellfie '\x1b[105mSHELLFIE\\x1b[0m🤳' '\x1b[38;5;225mthe easiest way' '\x1b[38;5;213mto create beautiful' '\x1b[38;5;14mCLI screenshots 📸' '\x1b[38;5;199mprogrammatically 🚀' -h 300 -w 400
```
![](https://github.com/tool3/shellfie/blob/master/shellfies/shellfie.png?raw=true)

# options

see [shellfie](https://github.com/tool3/shellfie)
