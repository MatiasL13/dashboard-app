# dashboard-app


## heroku
https://secure-crag-46096.herokuapp.com/exchange


## heroku deploy
```bash
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production

procfile
web: nuxt start

```
https://nuxtjs.org/faq/heroku-deployment/

## Build Setup


```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:8080
$ yarn dev -p 8080

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
