To setup

```
cd vue_frontend
npm ci
```

To build run `./tools/make-chromium.sh`

This will build the original uBlock-origin

To build the Peach UI and load it into ublock-origin run `./tools/add-vue-development.sh`

Load the `ublock-origin-peach\dist\build\uBlock0.chromium` directory into chrome

Run `./tools/run-vue-unittests.sh` to run the Peach unit tests. Despite the name it runs tests that test functionality on the ublock origin side of things.

You can run just a single test by passing its name on the command line eg

`./tools/run-vue-unittests.sh test_using_eval_to_do_an_import`

