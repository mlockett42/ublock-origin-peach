cd ./vue_frontend/src
if [ -z "$1" ]; then
    npm run test
else
    npm run test -- -t $1
fi
cd ../..
