npm install -g ionic cordova

ionic config set -g yarn true

ionic start firstapp --type=ionic-angular

cd firstapp

ionic serve

ionic generate page pagename

ionic cordova run android --device

ionic build --release android

ionic cordova build