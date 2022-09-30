# PastebinUI

Simple frontend for [pastebin.fi](https://pastebin.fi) made with `next.js`.

## Development

Install dependencies:
`npm install`

---

>! I recommend enabling ESLint autofix in VSCode. First install ESLint extensions. Then go to Settings (on macOS: `cmd+,`) and select `Open Settings (JSON)` (top right corner)

Add this to the config:

```json
"eslint.format.enable": true,
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```
---

**Start local development:**
`npm run dev`

**Build:**
`npm run build`


## Deployment

`master` branch is automatically deployed to [pastebin.fi](https://pastebin.fi/) and [pastebin-ui.vercel.app](https://pastebin-ui.vercel.app/) with Vercel.