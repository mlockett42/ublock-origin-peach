To build run `./tools/make-chromium.sh`

This will build the original uBlock-origin

To build the peach UI overlay
```
cd ./vue_frontend/src
npm run build
```

or to build the debug version
```
cd ./vue_frontend/src
npm run debug
```

Then copy the following files from the `./vue_frontend/dist` folder into 

```
popup.html
```

Then copy the following files from the `./vue_frontend/dist/js` folder

```
popup.*
chunk-vendors.*
```

