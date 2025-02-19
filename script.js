document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    // Stäng menyn när en länk klickas
    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", function () {
            navbar.classList.remove("active");
            menuToggle.classList.remove("active");
        });
    });
});
