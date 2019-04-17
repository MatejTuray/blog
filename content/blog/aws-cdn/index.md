---

title: Vaša osobná CDN na AWS pre Next.js aplikáciu

date: "2019-04-16"

tags: ["next.js", "express", "aws"]

description: "Ako si zoptimalizovať asset delivery pre Next.js"

---
Tak robím si ja pekne na mojom malom (relatívne) projekte ktorý beží na Next.js + Express.js serveri, ktorý momentálne beží na Heroku (v blízkej budúcnosti však prejdem na iný spôsob - Docker a nejaká cloud platforma, o tom však inokedy), keď tu zrazu Google Lighthouse, mimochodom úžasný nástroj na benchmarking webových  stránok a aplikácií mi kričí že moje .js súbory nie sú skomprimované.

![](https://memegenerator.net/img/instances/66605245/hold-on-wtf-is-going-on-here.jpg)

Po dni zúriveho debugovania a zisťovania prečo moje krásne webpackom skomprimované gz a br súbory nechce express proste naservírovať klientovi...

![Express keď mu ponúkam kvalitne skomprimované súbory](https://boodlz.files.wordpress.com/2014/10/30d7a-badwhitekitten2.gif?w=287&h=254)

Nakoniec problém bol ako vždy medzi monitorom a stoličkou.

Next.js proste má aj svoje muchy...

###  Remove ahead of time gzip support #1155

Tento pull request ma proste dostal... no dobre takže riešenie je nejaké vlastné CDN.

Predtým som používal CDN na linkovanie libiek a css... teraz som si musel spraviť vlastné.

### Enter AWS..

![](https://i.redd.it/gkee3xdcfdz11.png)



Na spojazdnenie vlastného CDN potrebujeme vlastne len dve veci... no dobre možno tri.. alebo tak nejak.

First things first... S3 bucket

Po úspešnom spojazdnení bucketu a správnom nastavení privilégii a politiky a neviem čoho všetkého ešte, treba tú zložku tam aj nejako nahrať...

No dobre... to zas nebolo tak zlé

A (pred)posledný krok... CloudFront, to bolo naštastie len o tom ukázať na bucket a bolo.

Phew...

![(https://i.imgur.com/DuYzHBr.png](https://i.imgur.com/DuYzHBr.png)

Netreba zabudnúť aj na nastavenie v next.js.
Buď statické v next.config.js:

```js
const WebpackPwaManifest = require('webpack-pwa-manifest')
const withOffline = require('next-offline')
const withManifest = require('next-manifest')
const path = require('path')
const withBabelMinify = require('next-babel-minify')()
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')

const nextConfig = {
    distDir: 'someDirectory',
    assetPrefix: 'cdnAddress'
        ...
}
```

Alebo ak máte k next aj vlastný express server a potrebujete niektoré assety neprefixovať tak dynamické prefixovanie:

```js
expressApp.all('/api/*', (req, res) => {
    nextApp.setAssetPrefix('')
    let nextRequestHandler = nextApp.getRequestHandler()

    return nextRequestHandler(req, res)
})
// catch-all handler to handle all other routes
expressApp.all('*', (req, res) => {
    nextApp.setAssetPrefix('cdnUrl')
    let nextRequestHandler = nextApp.getRequestHandler()

    return nextRequestHandler(req, res)
})
```
