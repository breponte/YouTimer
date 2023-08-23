const YouTimer = document.createElement("div");

YouTimer.innerHTML = `
    <div id="displayModule" class="show">
        <section id="stopwatch" class="show">
            000:00:00
        </section>
    </div>
    <section id="minimize">_</section>
`;
YouTimer.setAttribute("id", "YouTimer");

document.body.insertBefore(YouTimer, document.body.firstChild);
