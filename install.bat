echo off
npm i -g pnpm
cd app-shell-root-config 
pnpm i
cd..
ECHO "app-shell-root-config application npm/pnpm install done..."
cd app-shell-root-config 
pnpm i
cd..
ECHO "app-shell-root-config application npm/pnpm install done..."
cd react-components\top-header
pnpm i
cd..
cd..
ECHO "react-components\top-header application npm/pnpm install done..."
cd react-components\bottom-footer
pnpm i
cd..
cd..
ECHO "react-components\bottom-footer application npm/pnpm install done..."
cd static-site-host 
pnpm i
cd..
ECHO "static-site-host application npm/pnpm install done..."