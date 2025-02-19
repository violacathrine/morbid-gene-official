document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", function (event) {
        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");
        event.stopPropagation();
    });

    document.addEventListener("click", function (event) {
        if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
            navbar.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", function () {
            navbar.classList.remove("active");
            menuToggle.classList.remove("active");
        });
    });
});
