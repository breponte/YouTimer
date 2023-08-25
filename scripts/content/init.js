/**
 * This file injects all the necessary HTML into the current webpage
 */

const YouTimer = document.createElement("div");

// set format of YouTimer
YouTimer.innerHTML = `
    <div id="displayModule" class="show">
        <section id="stopwatch" class="show">
            000:00:00
        </section>
    </div>
    <section id="minimize">_</section>
`;
YouTimer.setAttribute("id", "YouTimer");

// inject YouTimer to be the first element of body
document.body.insertBefore(YouTimer, document.body.firstChild);
