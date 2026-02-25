document.addEventListener("DOMContentLoaded", function () {

  let selectedEvent = "";

  const registerModal = document.getElementById("registerModal");
  const eventTitle = document.getElementById("eventTitle");
  const registerForm = document.getElementById("registerForm");
  const formMessage = document.getElementById("formMessage");

  // Make function GLOBAL so HTML can access it
  window.registerEvent = function (eventName) {
    selectedEvent = eventName;
    eventTitle.innerText = `Register for ${eventName}`;
    formMessage.innerText = "";
    registerModal.classList.add("active");
  };

  window.closeRegisterModal = function () {
    registerModal.classList.remove("active");
  };

  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    try {
      const response = await fetch("https://gdg-website-73eo.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          event: selectedEvent
        })
      });

      const data = await response.json();

      formMessage.style.color = "lightgreen"; 
      formMessage.innerText = data.message;

      registerForm.reset();

      setTimeout(() => {
        registerModal.classList.remove("active");
      }, 1500);

    } catch (error) {
      formMessage.style.color = "red";
      formMessage.innerText = "Registration failed ❌";
    }
  });
  // Scroll Reveal
  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run once on load

  const lines = [
    "const future = build();",
    "deploy(GDG_Project);",
    "success = true;"
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeEffect() {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];
    const target = document.getElementById("codeLine" + (lineIndex + 1));

    if (!target) return; // safety check

    if (charIndex < currentLine.length) {
      target.textContent += currentLine.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 60);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeEffect, 400);
    }
  }

  setTimeout(typeEffect, 1000);

  /* Blinking Cursor */
  setInterval(() => {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      cursor.style.opacity =
        cursor.style.opacity === "0" ? "1" : "0";
    }
  }, 500);
  /* ================= LOGIN MODAL ================= */

  const loginBtn = document.getElementById("loginBtn");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");

  if (loginBtn && modal && closeBtn) {

    loginBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

  }



});