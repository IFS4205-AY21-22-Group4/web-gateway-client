# ifs4205-web-gateway-client

## Gateway setup

#### Prerequisites:

* Ensure that laptop device is able to scan nearby bluetooth devices (refer to [token-issuing-tools](https://github.com/IFS4205-AY21-22-Group4/token-issuing-tools) for instructions)
* Unused ports following the default configuration
* 2 separate terminal console for running the webservers

1. Clone this repository
1. Start the token discovery server

```bash
node src/token-discovery.js
```

1. Start the Vue Local Webserver

```bash
npm install
npm run build
npm install -g serve
serve -s dist
```

1. Access `http://localhost:5000` from a browser

 Known working browser:
 
 * Chrome

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
