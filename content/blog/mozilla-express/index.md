---
title: Pomôž nám Mozilla, si naša jediná nádej!
date: "2019-04-15"
tags: ["express", "node.js", "backend"]
description: "Bezpečnosť stránok a express.js aplikácií"
---

Platím cez internetbanking, odovzdávam svoje osobné údaje "dôveryhodným tretím stranám" a snažím sa nepozastavovať nad tom, či je to bezpečné. Ak si odmyslíme sociálne inžinierstvo, kedy útočný vektor je hlavne ľudský faktor, respektíve jeho zlyhanie (phising a pod.), človek by si myslel, že väčšina veľkých stránok dodržiava tzv. "best practices" bezpečnosti, napríklad TLS/SSL certifikát, HTTPS-only (HSTS)...

![](https://i.kym-cdn.com/entries/icons/original/000/028/596/dsmGaKWMeHXe9QuJtq_ys30PNfTGnMsRuHuo_MUzGCg.jpg)

Údaje z blogu spoločnosti Mozilla však hovoria o niečom inom:<sup>1</sup>

| Technológia                          | Jún 2017            | Február 2018        | Rozdiel v %     | Rozdiel od apríla 2016 |
| ------------------------------------ | ------------------- | ------------------- | --------------- | ---------------------- |
| Content Security Policy (CSP)        | .018% <br/> .043%   | .022%<br/> .112%    | +22% <br/> 161% | 340% <br/> +833%       |
| Cookies (Secure/HttpOnly)            | 6.50%               | 8.97%               | 38%             | 139%                   |
| Cross-origin Resource Sharing (CORS) | 96.55%              | 96.89%              | +.35%           | +3.3%                  |
| HTTPS                                | 45.80%              | 54.31%              | 19%             | 83%                    |
| HTTP -> HTTPS Redirection            | 14.38% <br/> 22.88% | 21.46% <br/> 32.82% | 49% <br/> 43%   | 324% <br/> 268%        |
| Public Key Pinning (HPKP)            | 0.71%               | 1.07%               | 51%             | 148%                   |
| HPKP Preloaded                       | 0.43%               | 0.70%               | 63%             | 71%                    |
| Strict Transport Security (HSTS)     | 4.37%               | 6.03%               | 38%             | 245%                   |
| HSTS Preloaded                       | .337%               | .631%               | 87%             | 299%                   |
| Subresource Integrity (SRI)          | 0.113%              | 0.182%              | 61%             | 1113%                  |
| X-Content-Type-Options (XCTO)        | 9.41%               | 11.72%              | 21%             | 89%                    |
| X-Frame-Options (XFO)                | 10.98%              | 12.55%              | 14%             | 84%                    |
| X-XSS-Protection (XXSSP)             | 8.12%               | 10.36%              | 28%             | 106%                   |

<small>Spracované podľa zdroja: [https://blog.mozilla.org/security/2018/02/28/analysis-alexa-top-1m-sites-2/](https://blog.mozilla.org/security/2018/02/28/analysis-alexa-top-1m-sites-2/)</small>
<small>Pozn. autora: Niektoré údaje sú uvedené s rôznymi parametrami</small>

Sú to údaje z minulého roka, nakoľko údaje z 2019 neboli zatiaľ dostupné, môžeme sledovať rastúci trend adaptácie bezpečnostných prvkov - HTTP hlavičiek a i., avšak samotné čísla sú zarážajúce.

Vedeli ste napríklad že HTTPS protokol vznikol v roku 1994 pre Netscape Navigator<sup>2</sup>?

Myslím si, že v roku 2019 by mal byť HTTPS protokol štandardom pre všetky stránky, nie pre väčšinu.

Mozilla ponúka skvelý nástroj na profilovanie bezpečnosti stránok, nájdete ho na https://observatory.mozilla.org/

Pre developerov ponúka náhľad na bezpečnostné diery v ich stránkach, a postup ako zlepšiť skóre, pre bežného užívateľa aspoň všeobecný prehľad ako stránky (ne)implementujú ochranné prvky a hlavičky

### Ako zvýšiť skóre v Mozilla Observatory pre Node.js/Express.js aplikáciu

TLDR: https://helmetjs.github.io/ alebo https://www.npmjs.com/package/lusca

Obidva npm balíky slúžia ako middleware pre express.js, takže ak už máte nejakú express.js aplikáciu:

```js
npm install helmet --save
```

resp.

```js
npm install lusca --save
```

A následne príklad implementácie pre helmet

```js
const express = require("express")
require("dotenv").config()
const path = require("path")
const app = express()
const publicPath = path.join(__dirname)
const port = process.env.PORT || 5000

const bodyParser = require("body-parser")
const helmet = require("helmet")

app.use(bodyParser.json())
app.use(helmet())

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
})
app.listen(port, () => {
  console.log("server is up, port: ", port)
})
module.exports = { app }
```

Takéto defaultné použitie však neobsahuje všetky HTTP hlavičky, možno ich pridať individuálne ako napr:

```js
app.use(helmet.referrerPolicy())

app.use(hsts({ maxAge: 31536000 }))
```

#### Použité zdroje:

1. KING, A.: Analysis of the Alexa Top 1M Sites. Mozilla Security Blog, 2018, [ cit. 15.04.2019 ]. Dostupné na stránke: https://blog.mozilla.org/security/2018/02/28/analysis-alexa-top-1m-sites-2/

2. Walls, Colin (2005). Embedded Software: The Works. Newnes. p. 344. ISBN 0-7506-7954-9.
