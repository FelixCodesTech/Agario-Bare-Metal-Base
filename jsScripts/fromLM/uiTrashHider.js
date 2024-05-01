// This script aims to remove (by hiding it via css) the trash UI we dont need
// it makes everything inside body invisible, except for <canvas>


hideUI = function() {
    let allElements = document.querySelectorAll('*');
    let cssToInject = 'display: none;';

    // Main loop
    for (let i = 0; i < allElements.length; i++) {
        let element = allElements[i];
        if (element.tagName !== 'CANVAS' && element.tagName !== 'html' && element.tagName !== 'body' && element.tagName !== 'head') {
            element.style.cssText += cssToInject;
        }
    }
}


// Call the function after page has loaded
window.onload = function() {
    setTimeout(function() {hideUI();}, 3000);
}