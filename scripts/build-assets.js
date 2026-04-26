'use strict';
const renderAssets = require('./render-assets');
const fs = require('fs');

if (fs.existsSync('public/sitemap.xml')) {
    fs.copyFileSync('public/sitemap.xml', 'dist/sitemap.xml');
    console.log('Copied sitemap.xml');
}
if (fs.existsSync('public/robots.txt')) {
    fs.copyFileSync('public/robots.txt', 'dist/robots.txt');
    console.log('Copied robots.txt');
}
if (fs.existsSync('public/llms.txt')) {
    fs.copyFileSync('public/llms.txt', 'dist/llms.txt');
    console.log('Copied llms.txt');
}

renderAssets();
