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

Then copy the following files from the `./vue_frontend/dist` folder into `./dist/build/uBlock0.chromium`

```
popup.html
```

Then copy the following files from the `./vue_frontend/dist/js` folder `./dist/build/uBlock0.chromium/js`

```
popup.*
chunk-vendors.*
```

Then copy the following files from the `./vue_frontend/dist/css` folder `./dist/build/uBlock0.chromium/css`

```
popup.*
```
