document.addEventListener("DOMContentLoaded", function () {
    // Hantera meny-toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function (event) {
            navbar.classList.toggle("active");
            menuToggle.classList.toggle("active");
            event.stopPropagation();
        });

        document.addEventListener("click", function (event) {
            if (!navbar.contains(event.target) && event.target !== menuToggle) {
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
    }

    // Kontrollera att vi är på booking-page.html innan vi kör formulär-koden
    if (document.getElementById("booking-form")) {
        const form = document.getElementById("booking-form");
        const popup = document.getElementById("popup-message");

        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stoppa vanlig formulärsubmission

            const formData = new FormData(form);
            const formspreeURL = "https://formspree.io/f/xkgjwpqq"; // Din Formspree-ID

            fetch(formspreeURL, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        popup.classList.remove("hidden"); // Visa popup
                        form.reset(); // Rensa formuläret efter skickat meddelande

                        // Stäng popupen automatiskt efter 3 sekunder
                        setTimeout(() => {
                            closePopup();
                        }, 3000);
                    } else {
                        alert("Something went wrong. Please try again later.");
                    }
                })
                .catch(error => {
                    alert("A technical error occurred. Please try again.");
                    console.error("Error:", error);
                });
        });
    }
});

// Stäng popupen manuellt när användaren klickar på "OK"
function closePopup() {
    const popup = document.getElementById("popup-message");
    if (popup) {
        popup.classList.add("hidden");
    }
}
