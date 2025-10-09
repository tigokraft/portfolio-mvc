// Smooth scroll for hero button
document.querySelector(".hero__scroll").addEventListener("click", () => {
  document.getElementById("knowledge").scrollIntoView({ behavior: "smooth" });
});

/* ----------  reveal on scroll  ---------- */
gsap.registerPlugin(ScrollTrigger);

gsap.from(".skills__title", {
  scrollTrigger: { trigger: ".skills", start: "top 80%" },
  opacity: 0,
  y: 30,
  duration: 0.8,
});

gsap.from(".skill-card", {
  scrollTrigger: { trigger: ".skills__galaxy", start: "top 75%" },
  opacity: 0,
  y: 40,
  scale: 0.95,
  duration: 0.7,
  stagger: 0.08,
});

document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".skills__title, .skill-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.2 }
  ); // trigger when 20% visible

  revealEls.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    {
      text: "Code is like humor. When you have to explain it, it’s bad.",
      author: "Cory House",
    },
    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
    },
    {
      text: "Experience is the name everyone gives to their mistakes.",
      author: "Oscar Wilde",
    },
  ];
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteText").textContent = `"${q.text}"`;
  document.getElementById("quoteAuthor").textContent = `– ${q.author}`;
});
