echo off
cd app-shell-root-config 
start serve
ECHO "app-shell-root-config server started..."
cd..
cd react-components\top-header
start serve
ECHO "react-components\top-header server started..."
cd..
cd..
cd react-components\bottom-footer
start serve
ECHO "react-components\bottom-footer server started..."
cd..
cd..
cd static-site-host 
start serve
ECHO "static-site-host server started..."
cd..
cd ogani-server
start serve
ECHO "ogani-server server started..."
cd..