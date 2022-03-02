echo off
cd app-shell-root-config 
start serve
cd..
ECHO "app-shell-root-config server started..."
cd react-components\top-header
start serve
cd..
cd..
ECHO "react-components\top-header server started..."
cd react-components\bottom-footer
start serve
cd..
cd..
ECHO "react-components\bottom-footer server started..."
cd static-site-host 
start serve
cd..
ECHO "static-site-host server started..."

