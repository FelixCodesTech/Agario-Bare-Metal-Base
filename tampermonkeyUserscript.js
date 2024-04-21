// ==UserScript==
// @name         Agario Bare Metal Client
// @namespace    http://tampermonkey.net/
// @version      2024-04-21
// @description  A bare metal client for Agar.io
// @author       Felix
// @match        agar.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Start of my code
    console.log("Agario Bare Metal Client loaded!");

    // Replace the entire website with the contents of play.html
    document.open();
    // Fetch the contents of play.html
    fetch('https://felixcodestech.github.io/Agario-Bare-Metal-Base/play.html')
        .then(response => response.text())
        .then(html => {
            // Write the contents of play.html to the document
            document.write(html);
            document.close();
        })
        .catch(error => {
            console.error('Error fetching play.html:', error);
        });
})();