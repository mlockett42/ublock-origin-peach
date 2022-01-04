echo "Set up development config"

cp ./vue_frontend/src/config/config.production.js ./vue_frontend/src/config/config.js
cp ./src/js/configHelper.production.js ./src/js/configHelper.js

echo "Build vuejs content"

cd ./vue_frontend/src
npm run build
cd ../..

echo "Copying HTML"
cp ./vue_frontend/dist/popup.html ./dist/build/uBlock0.chromium -v

echo "Copying Javascript"
cp ./vue_frontend/dist/js/popup.* ./dist/build/uBlock0.chromium/js -v
cp ./vue_frontend/dist/js/chunk-vendors.* ./dist/build/uBlock0.chromium/js -v

echo "Copying CSS"
cp ./vue_frontend/dist/css/popup.* ./dist/build/uBlock0.chromium/css -v

echo "Copying Fonts"
cp ./vue_frontend/dist/fonts/* ./dist/build/uBlock0.chromium/fonts -v

