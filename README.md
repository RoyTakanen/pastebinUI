# PastebinUI

Simple frontend for [pastebin.fi](https://pastebin.fi) made with `next.js`.

## TODO:

- [ ] search bar to `/browse` (just get request to https://api.pastebin.fi/pastes?title=test and https://api.pastebin.fi/pastes?content=test)
- [ ] pagination to `/browse`
- [ ] fix code editor dark mode https://www.npmjs.com/package/@uiw/react-textarea-code-editor
- [ ] linewrap toggle to paste view

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