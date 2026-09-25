  const track = document.getElementById("track");
  const slides = Array.from(track.children);
  const dotsContainer = document.getElementById("dots");
  let index = 0;

  // Criar bolinhas dinâmicas
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => moveToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(document.querySelectorAll(".dot"));

  function moveToSlide(i) {
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  // Carrossel infinito automático
  setInterval(() => {
    index = (index + 1) % slides.length;
    moveToSlide(index);
  }, 3000);



  