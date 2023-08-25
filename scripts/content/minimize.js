/**
 * This file implements the minimize feature of YouTimer
 */

const minimizeButton = document.getElementById("minimize");
// elements that will be minimized
const shownElements = Array.from(document.getElementsByClassName("show"));
// track state of minimization
let hide = false;

// implements an on/off switch for minimization
minimizeButton.addEventListener("click", () => {
    hide = !hide;
    shownElements.forEach((element) => {
        if (hide) {
            // adds a class that set opacity to 0
            element.classList.add('hide');
        } else {
            // removes added class that set opacity to 0
            element.classList.remove('hide');
        }
    })
});