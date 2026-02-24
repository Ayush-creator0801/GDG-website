// Login Modal
const modal = document.getElementById("modal");
const loginBtn = document.getElementById("loginBtn");
const closeBtn = document.querySelector(".close");

loginBtn.onclick = () => {
modal.style.display = "flex";
};

closeBtn.onclick = () => {
modal.style.display = "none";
};

window.onclick = (e) => {
if (e.target == modal) {
modal.style.display = "none";
}
};

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