#!/bin/bash

git pull
npm install
npm run build
pm2 restart 'npx next start'