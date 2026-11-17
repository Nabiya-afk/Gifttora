document.addEventListener("DOMContentLoaded", function () {

    // COMMON VALIDATION FUNCTIONS

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const namePattern = /^[A-Za-z][A-Za-z .'-]{1,49}$/;

    function showMessage(element, message, success = false) {

        if (!element) return;

        element.textContent = message;
        element.style.display = "block";

        element.style.color = success
            ? "#27834B"
            : "#C0392B";

    }


    // =====================================
    // 1. USER LOGIN VALIDATION
    // =====================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.noValidate = true;

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("email").value.trim();

            const password = document.getElementById("password").value;

            const message = document.getElementById("loginMessage");


            if (email === "") {

                showMessage(message, "Please enter your email address.");
                return;

            }

            if (!emailPattern.test(email)) {

                showMessage(message, "Please enter a valid email address.");
                return;

            }

            if (password === "") {

                showMessage(message, "Please enter your password.");
                return;

            }

            if (password.length < 6) {

                showMessage(message, "Password must contain at least 6 characters.");
                return;

            }

            showMessage(
                message,
                "Login details validated successfully! 💗",
                true
            );

        });

    }


    // =====================================
    // 2. CONTACT FORM VALIDATION
    // =====================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.noValidate = true;

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();

            const email = document.getElementById("email").value.trim();

            const subject = document.getElementById("subject").value.trim();

            const message = document.getElementById("message").value.trim();

            const result = document.getElementById("formMessage");


            if (name === "") {

                showMessage(result, "Please enter your name.");
                return;

            }

            if (!namePattern.test(name)) {

                showMessage(result, "Please enter a valid name.");
                return;

            }

            if (!emailPattern.test(email)) {

                showMessage(result, "Please enter a valid email address.");
                return;

            }

            if (subject.length < 3) {

                showMessage(result, "Subject must contain at least 3 characters.");
                return;

            }

            if (message.length < 10) {

                showMessage(result, "Message must contain at least 10 characters.");
                return;

            }

            showMessage(
                result,
                "Thank you! Your message has been validated successfully. 💗",
                true
            );

            contactForm.reset();

        });

    }


    // =====================================
    // 3. CHECKOUT FORM VALIDATION
    // =====================================

    const checkoutForm = document.getElementById("checkoutForm");

    if (checkoutForm) {

        checkoutForm.noValidate = true;

        checkoutForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("fullName").value.trim();

            const email = document.getElementById("email").value.trim();

            const phone = document.getElementById("phone").value.trim();

            const address = document.getElementById("address").value.trim();

            const city = document.getElementById("city").value.trim();

            const pincode = document.getElementById("pincode").value.trim();

            const payment = document.querySelector(
                'input[name="payment"]:checked'
            );

            const result = document.getElementById("orderMessage");


            if (!namePattern.test(name)) {

                showMessage(result, "Please enter a valid full name.");
                return;

            }

            if (!emailPattern.test(email)) {

                showMessage(result, "Please enter a valid email address.");
                return;

            }

            if (!/^[6-9]\d{9}$/.test(phone)) {

                showMessage(result, "Please enter a valid 10-digit mobile number.");
                return;

            }

            if (address.length < 10) {

                showMessage(result, "Please enter a complete delivery address.");
                return;

            }

            if (!namePattern.test(city)) {

                showMessage(result, "Please enter a valid city name.");
                return;

            }

            if (!/^\d{6}$/.test(pincode)) {

                showMessage(result, "Please enter a valid 6-digit pincode.");
                return;

            }

            if (!payment) {

                showMessage(result, "Please select a payment method.");
                return;

            }


            // Check shopping cart

            let cart = [];

            try {

                cart = JSON.parse(
                    localStorage.getItem("giftoraCart") || "[]"
                );

            } catch (error) {

                showMessage(result, "Unable to read your cart. Please try again.");
                return;

            }


            if (!Array.isArray(cart) || cart.length === 0) {

                showMessage(result, "Your cart is empty. Please add products first.");
                return;

            }


            showMessage(
                result,
                "Order details validated successfully! Thank you for shopping with Giftora. 💗",
                true
            );


            // Clear cart after demonstration order

            localStorage.removeItem("giftoraCart");

            checkoutForm.reset();

            if (typeof displayCart === "function") {
                displayCart();
            }

        });

    }

});