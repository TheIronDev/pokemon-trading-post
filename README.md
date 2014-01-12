pokemon-trading-post
====================

Setup
=====
## Pull in dependencies
sudo apt-get install node  
sudo apt-get install npm  
sudo apt-get install mongodb-10gen

## Install HTTPS Certs
mkdir ssl;cd ssl
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem

## Pull in npm dependencies
sudo npm install  
sudo npm install -g nodemon

## Start the server
node server.js  
nodemon server.js
