# nnncoproj

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

## Deployment
Project is currently deployed at https://nnnco.herokuapp.com/.
To deploy, create and login to your own Heroku account, then run:
```
heroku create --app <APP_NAME>
```
To create a new application for you account under the project name provided.
Next, add a new remote for Heroku:
```
heroku git:remote --app <APP_NAME>
```
Now to deploy your code run:
```
git push heroku master
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
