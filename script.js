// ----------------------------
// Infinite Skills Scroll
// ----------------------------

window.addEventListener("DOMContentLoaded", function () {
  // Infinite scroll: duplicate skills for seamless animation
  const skillScroll = document.getElementById("skills-scroll");
  if (skillScroll) {
    skillScroll.innerHTML += skillScroll.innerHTML;
  }

  // ----------------------------
  // Header scroll effect
  // ----------------------------
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ----------------------------
  // Smooth scrolling
  // ----------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ----------------------------
  // Intersection Observer for animations
  // ----------------------------
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s ease";
    observer.observe(section);
  });

  // Animate skill cards
  document.querySelectorAll(".skill-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate project cards
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
  });

  // ----------------------------
  // Stat counter animation
  // ----------------------------
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          entry.target.classList.add("animated");
          const statNumber = entry.target.querySelector(".stat-number");
          const text = statNumber.textContent;
          const number = parseFloat(text);

          if (!isNaN(number)) {
            statNumber.textContent = "0";
            setTimeout(() => {
              if (text.includes(".")) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                  current += increment;
                  if (current >= number) {
                    statNumber.textContent = text;
                    clearInterval(timer);
                  } else {
                    statNumber.textContent = current.toFixed(2);
                  }
                }, 30);
              } else {
                let current = 0;
                const timer = setInterval(() => {
                  current++;
                  statNumber.textContent = current + "+";
                  if (current >= number) {
                    statNumber.textContent = text;
                    clearInterval(timer);
                  }
                }, 50);
              }
            }, 200);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-card").forEach((card) => {
    statObserver.observe(card);
  });

  // ----------------------------
  // Form enhancement
  // ----------------------------
  const form = document.querySelector(".contact-form");
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.style.transform = "scale(1.01)";
      input.parentElement.style.transition = "transform 0.3s ease";
    });

    input.addEventListener("blur", () => {
      input.parentElement.style.transform = "scale(1)";
    });
  });

  form.addEventListener("submit", (e) => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      e.preventDefault();
      alert("Please enter a valid email address");
      return;
    }
  });

  // ----------------------------
  // Parallax effect on hero
  // ----------------------------
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.4}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });

  // ----------------------------
  // Mobile menu toggle
  // ----------------------------
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      console.log("Menu toggled");
    });

    // Close menu when clicking on a nav link
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }

  // ----------------------------
  // Friendly console log
  // ----------------------------
  console.log(
    "%c✨ Welcome to Milan's Portfolio! ✨",
    "color: #00d4ff; font-size: 20px; font-weight: bold;"
  );
  console.log(
    "%cBuilt with passion and creativity",
    "color: #7c3aed; font-size: 14px;"
  );
});
