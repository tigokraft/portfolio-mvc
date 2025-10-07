// Smooth scroll for hero button
document.querySelector(".hero__scroll").addEventListener("click", () => {
  document.getElementById("knowledge").scrollIntoView({ behavior: "smooth" });
});

function scrollToSkills() {
  document.getElementById("knowledge").scrollIntoView({ behavior: "smooth" });
}

/* ----------  reveal on scroll  ---------- */
gsap.registerPlugin(ScrollTrigger);

gsap.from(".skills__title", {
    scrollTrigger: { trigger: ".skills", start: "top 80%" },
    opacity: 0, y: 30, duration: .8
});

gsap.from(".skill-card", {
    scrollTrigger: { trigger: ".skills__galaxy", start: "top 75%" },
    opacity: 0, y: 40, scale: 0.95, duration: .7, stagger: .08
});

document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll('.skills__title, .skill-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.2 }); // trigger when 20% visible

  revealEls.forEach(el => observer.observe(el));
});