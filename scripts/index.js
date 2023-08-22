window.addEventListener("DOMContentLoaded", init);

function init()
{
    minimizeButton = document.getElementById("minimize");
    displayModule = document.getElementById("displayModule");
    let hide = false;

    minimizeButton.addEventListener("click", () => {
        hide = !hide;
        if (hide) {
            displayModule.classList.add('hide');
        } else {
            displayModule.classList.remove('hide');
        }
    });
}