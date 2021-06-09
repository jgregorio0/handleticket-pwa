# handleticket-pwa

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# Deploy to Heroku
1. Create server
```
heroku create handleticket-pwa
heroku buildpacks:set heroku/nodejs
heroku config:set HOST=0.0.0.0
```

2. Push changes
```
git push heroku master
```

3. Set URL_BASE
```
heroku config:set BASE_URL="https://handleticket-api.herokuapp.com"
```