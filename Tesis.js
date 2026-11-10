onst sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-btn");

menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
        sidebar.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
    });
});

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 350);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mantiene resaltado el apartado visible al desplazarse por la página.
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        }
    });
}, { rootMargin: "-25% 0px -65% 0px" });

sections.forEach(section => observer.observe(section));