// Smooth scroll for hero button
document.querySelector(".hero__scroll").addEventListener("click", () => {
  document.getElementById("knowledge").scrollIntoView({ behavior: "smooth" });
});

function scrollToSkills() {
  document.getElementById("knowledge").scrollIntoView({ behavior: "smooth" });
}
