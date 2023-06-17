window.addEventListener("DOMContentLoaded", () => {
    let clicked = false,
        time = {
            green: 12000,
            yellow: 3000,
            red: 7000,
        },
        is_stopped = false;

    const button = document.getElementById("button"),
        red = document.getElementById("light_red"),
        yellow = document.getElementById("light_yellow"),
        green = document.getElementById("light_green");

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function start_traffic_light() {
        return new Promise((resolve) => {
            if (is_stopped) {
                resolve();
            }

            delay(0)
                .then(() => {
                    green.classList.add("green");
                    return delay(time.green);
                })
                .then(() => {
                    green.classList.remove("green");
                    yellow.classList.add("yellow");
                    return delay(time.yellow);
                })
                .then(() => {
                    yellow.classList.remove("yellow");
                    red.classList.add("red");
                    return delay(time.red);
                })
                .then(() => {
                    red.classList.remove("red");
                    yellow.classList.add("yellow");
                    return delay(time.yellow);
                })
                .then(() => {
                    yellow.classList.remove("yellow");
                    return start_traffic_light();
                });
        });
    }

    button.addEventListener("click", () => {
        switch (clicked) {
            case true:
                clicked = false;
                button.textContent = "Включити світлофор";
                is_stopped = true;
                break;
            case false:
                clicked = true;
                button.textContent = "Виключити світлофор";

                red.classList.remove("red"); // Забираю червоний колір, щоб світлофор був чистим

                start_traffic_light();
        }
    });
});
