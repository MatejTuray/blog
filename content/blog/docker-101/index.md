---
title: Docker 101 - kontajnery naše každodenné

date: "2019-04-20"

tags: ["next.js", "docker", "node.js"]

description: "Kontajnerizácia aplikácii s Dockrom"
featuredImage: "./featured-image.jpg"
---

![](https://memegenerator.net/img/instances/68311798/excuse-me-do-you-have-five-minutes-to-talk-about-docker.jpg)
No bude to menej... na začiatok...

Mnohí z vás, milí čitatelia, sa už určite s technológiou Docker stretli, tento článok je však pre tých, ktorí ako ja započuli slovo Docker len prednedávnom, chcú spoznať o čo tej veľrybe vlastne ide.

Stretli ste sa niekedy s problémom, že kód / web app fungoval perfektne na vašom stroji ale po nasadení niekam zrazu nie?

![](https://cdn-images-1.medium.com/max/1200/1*ookfwogTLx_1qhHaiFJoJw.png)

No v každom prípade, jednotné prostredie nie len pre Vás ale aj pre Váš tím je len plus.

### Inštalácia

Nuž z osobnej skúsenosti odporúčam sa hrať s Dockerom na Linuxe... mám ho aj na mojom Win10 desktope ale inštalácia a spojazdnenie mi spôsobili celoživotnú traumu. Oficiálna dokumentácia je dostatočná v prípade Linuxu a pri Windowse... no držím palce.

V každom prípade ak viete rozbehať:

```
docker run hello-world
```

Tak ste pripravení na cestu do nového sveta.

Tento príkaz stiahne hello-world obraz z docker repozitára - DockerHubu a spustí ho na vašom stroji.

A nainštalujte si aj docker-compose, zíde sa Vám to.

Docker pracuje s obrazmi OS, väčšina z nich však okrem samotnej Linux distribúcie má aj predinštalované určité programy. Teda napríklad obraz node.js má pripravený príkaz node, ako aj npm. Ak ste niekedy pracovali s .iso - súbormi obrazov diskov, je to podobné.

### Dockerfile

Dockerfile popisuje proces a postup ako vytvoriť žiadaný obraz.

Pokiaľ pracujete s Javascriptom, odporúčam vytvoriť .dockerignore súbor a hodiť tam node_modules.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--FqSJ910J--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/9i6bs4g6cx05jeagfhum.png)

Príklad pre moje dev prostredie (next.js/express.js):

```docker
# Ktorý obraz použiť ako základ pre náš
FROM node:10-alpine

# Cesta pre našu aplikáciu
WORKDIR /usr/src/app

# Inštalácia
COPY package*.json ./

RUN npm install

# Prekopírovanie zdrojovej zložky
COPY . .

# Buildovanie
RUN npm run build

# Spustenie
CMD [ "npm", "run", "dev"]

# Tento príkaz sám o sebe port neotvára je skôr dokumentáciou že ktorý port treba otvoriť pri docker-run a. i.
EXPOSE 5000
```

Následne

```
docker build -t vasnazov .
```

-t pridá nejake ozačenie pre obraz

A po úspešnom builde

```
docker run -p 5000:5000 vasnazov
```

A ide to - porty sú otvorené cez flag -p

Toľko k prvému článku zo sveta kontajnerovej veľryby, nabudúce si dáme docker-compose a pridávanie služieb v dev env.
