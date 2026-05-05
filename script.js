class Slider {
  constructor(root, config = {}) {
    this.root = root;
    this.slidesLine = root.querySelector(".slides");
    this.slides = root.querySelectorAll(".slide");
    this.currentIndex = 0;
    this.timer = null;

    this.config = {
      autoplay: true,
      interval: 3000,
      showButtons: true,
      showDots: true,
      pauseOnHover: true,
      ...config
    };

    this.init();
  }

  init() {
    if (this.config.showButtons) {
      this.createButtons();
    }

    if (this.config.showDots) {
      this.createDots();
    }

    if (this.config.autoplay) {
      this.startAutoplay();
    }

    if (this.config.pauseOnHover) {
      this.root.addEventListener("mouseenter", () => this.stopAutoplay());
      this.root.addEventListener("mouseleave", () => this.startAutoplay());
    }
  }

  createButtons() {
    const prevBtn = document.createElement("button");
    prevBtn.className = "slider-btn prev-btn";
    prevBtn.textContent = "‹";

    const nextBtn = document.createElement("button");
    nextBtn.className = "slider-btn next-btn";
    nextBtn.textContent = "›";

    this.root.append(prevBtn, nextBtn);

    prevBtn.addEventListener("click", () => this.prevSlide());
    nextBtn.addEventListener("click", () => this.nextSlide());
  }

  createDots() {
    this.dotsWrapper = document.createElement("div");
    this.dotsWrapper.className = "dots";
    this.dots = [];

    this.slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.className = "dot";

      if (index === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => this.goToSlide(index));

      this.dotsWrapper.append(dot);
      this.dots.push(dot);
    });

    this.root.append(this.dotsWrapper);
  }

  updateSlider() {
    this.slidesLine.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    if (this.dots) {
      this.dots.forEach(dot => dot.classList.remove("active"));
      this.dots[this.currentIndex].classList.add("active");
    }
  }

  nextSlide() {
    this.currentIndex++;

    if (this.currentIndex >= this.slides.length) {
      this.currentIndex = 0;
    }

    this.updateSlider();
  }

  prevSlide() {
    this.currentIndex--;

    if (this.currentIndex < 0) {
      this.currentIndex = this.slides.length - 1;
    }

    this.updateSlider();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlider();
  }

  startAutoplay() {
    if (!this.config.autoplay) return;

    this.stopAutoplay();

    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.config.interval);
  }

  stopAutoplay() {
    clearInterval(this.timer);
  }
}

new Slider(document.getElementById("slider"), {
  autoplay: true,
  interval: 2500,
  showButtons: true,
  showDots: true,
  pauseOnHover: true
});
