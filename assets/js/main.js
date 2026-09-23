(function () {
  "use strict";

  let ultraScrollTriggerRegistered = false;
  let ultraTickerAnimationId = null;
  let ultraTickerRunning = true;
  let ultraResizeTimer = null;

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initSmoothLinks();
    initBackgroundImages();
    initTextAnimations();
    initCounters();
    initServices();
    initServicesSticky();
    initTestimonialSwiper();
    initContactTicker();
    initScrollAnimations();
    initScrollTop();
    initContactForm();
    initScrollTriggerRefresh();
  });

  function registerScrollTrigger() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return false;
    }

    if (!ultraScrollTriggerRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      ultraScrollTriggerRegistered = true;
    }

    return true;
  }

  function initHeader() {
    const toggle = document.querySelector("#ultra-header-toggle");
    const menu = document.querySelector("#ultra-mobile-menu");
    const close = document.querySelector("#ultra-menu-close");

    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add("is-open");
      toggle.classList.add("is-active");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      document.body.classList.add("ultra-menu-open");
    }

    function closeMenu() {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("ultra-menu-open");
    }

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (menu.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (close) {
      close.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        closeMenu();
      });
    }

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("click", function (event) {
      if (
        menu.classList.contains("is-open") &&
        !menu.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 992) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  function initSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  function initBackgroundImages() {
    const elements = document.querySelectorAll("[data-background]");

    if (!elements.length) return;

    elements.forEach(function (element) {
      const backgroundImage = element.getAttribute("data-background");

      if (!backgroundImage) return;

      element.style.backgroundImage = 'url("' + backgroundImage + '")';
    });

    window.addEventListener(
      "load",
      function () {
        elements.forEach(function (element) {
          const backgroundImage = element.getAttribute("data-background");

          if (!backgroundImage) return;

          if (!element.style.backgroundImage) {
            element.style.backgroundImage = 'url("' + backgroundImage + '")';
          }
        });
      },
      { once: true },
    );
  }

  function initTextAnimations() {
    if (!registerScrollTrigger()) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const elements = document.querySelectorAll("[data-text-animation]");

    if (!elements.length) return;

    elements.forEach(function (element) {
      if (element.dataset.ultraTextAnimated === "true") {
        return;
      }

      const animation = element.getAttribute("data-text-animation");

      const splitType = element.getAttribute("data-split") || "char";

      const duration = parseFloat(element.getAttribute("data-duration")) || 0.9;

      const stagger = parseFloat(element.getAttribute("data-stagger")) || 0.03;

      if (typeof SplitType === "undefined" || !element.textContent.trim()) {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: duration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );

        element.dataset.ultraTextAnimated = "true";
        return;
      }

      const split = new SplitType(element, {
        types: splitType,
      });

      let target = split.chars;

      if (splitType === "word") {
        target = split.words;
      }

      if (splitType === "line") {
        target = split.lines;
      }

      if (!target || !target.length) {
        element.dataset.ultraTextAnimated = "true";
        return;
      }

      let fromVars = {
        opacity: 0,
        y: 25,
      };

      if (animation === "fade-in-right") {
        fromVars = {
          opacity: 0,
          x: 30,
        };
      } else if (animation === "fade-in-left") {
        fromVars = {
          opacity: 0,
          x: -30,
        };
      } else if (animation === "fade-in-up") {
        fromVars = {
          opacity: 0,
          y: 30,
        };
      } else if (animation === "fade-in-down") {
        fromVars = {
          opacity: 0,
          y: -30,
        };
      } else if (animation === "zoom-in") {
        fromVars = {
          opacity: 0,
          scale: 0.9,
        };
      }

      gsap.fromTo(target, fromVars, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: duration,
        stagger: stagger,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      });

      element.dataset.ultraTextAnimated = "true";
    });
  }

  function initCounters() {
    const counters = document.querySelectorAll(".odometer");

    if (!counters.length) return;

    if (typeof Odometer === "undefined" || !registerScrollTrigger()) {
      counters.forEach(function (counter) {
        const value = counter.getAttribute("data-count");

        if (value !== null) {
          counter.textContent = value;
        }
      });

      return;
    }

    counters.forEach(function (counter) {
      if (counter.dataset.ultraCounterAnimated === "true") {
        return;
      }

      const value = parseInt(
        counter.getAttribute("data-count") ||
          counter.getAttribute("data-value") ||
          counter.textContent,
        10,
      );

      if (isNaN(value)) return;

      counter.textContent = "0";

      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: function () {
          if (counter.dataset.ultraOdometerStarted === "true") {
            return;
          }

          counter.dataset.ultraOdometerStarted = "true";

          const odometer = new Odometer({
            el: counter,
            value: 0,
            format: "(,ddd)",
            duration: 1500,
          });

          odometer.update(value);
        },
      });

      counter.dataset.ultraCounterAnimated = "true";
    });
  }

  function initServices() {
    const serviceItems = document.querySelectorAll(".ultra-services-item");

    if (!serviceItems.length) return;

    serviceItems.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        serviceItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove("is-active");
          }
        });

        item.classList.add("is-active");
      });

      item.addEventListener("mouseleave", function () {
        item.classList.remove("is-active");
      });
    });
  }

  function initServicesSticky() {
    if (!registerScrollTrigger()) return;

    if (typeof gsap.matchMedia !== "function") {
      return;
    }

    const pinInner = document.querySelector("#ultra-services-layout");

    const pinBox = document.querySelector("#ultra-services-left-content");

    const scrollContent = document.querySelector("#ultra-services-item-wrap");

    if (!pinInner || !pinBox || !scrollContent) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", function () {
      const trigger = ScrollTrigger.create({
        trigger: pinInner,
        start: "-150px top",
        endTrigger: scrollContent,
        end: "bottom bottom",
        pin: pinBox,
      });

      return function () {
        if (trigger) {
          trigger.kill();
        }
      };
    });
  }

  function initTestimonialSwiper() {
    const carousel = document.querySelector("#ultra-testimonial-carousel");

    if (!carousel || typeof Swiper === "undefined") {
      return;
    }

    if (carousel.dataset.ultraSwiperInitialized === "true") {
      return;
    }

    new Swiper(carousel, {
      slidesPerView: 3,
      spaceBetween: 24,
      slidesPerGroup: 1,
      loop: true,
      autoplay: false,
      grabCursor: true,
      speed: 800,
      navigation: {
        nextEl: "#ultra-testimonial-swiper-nav-wrap .swiper-prev",
        prevEl: "#ultra-testimonial-swiper-nav-wrap .swiper-next",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        767: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 1,
        },
      },
    });

    carousel.dataset.ultraSwiperInitialized = "true";
  }

  function initContactTicker() {
    const ticker = document.querySelector("#ultra-contact-running-text");

    const list = ticker
      ? ticker.querySelector(".ultra-contact-ticker-list")
      : null;

    if (!list || !list.children.length) {
      return;
    }

    if (list.dataset.ultraTickerInitialized === "true") {
      return;
    }

    const originalItems = Array.from(list.children);

    originalItems.forEach(function (item) {
      list.appendChild(item.cloneNode(true));
    });

    let position = 0;
    let previousTime = performance.now();

    let itemWidth = 0;

    const speed = 80;

    function measureTicker() {
      const firstItem = list.children[0];

      if (!firstItem) return;

      itemWidth = firstItem.getBoundingClientRect().width;
    }

    measureTicker();

    window.addEventListener(
      "resize",
      function () {
        measureTicker();
      },
      { passive: true },
    );

    function runTicker(currentTime) {
      if (!ultraTickerRunning) {
        ultraTickerAnimationId = requestAnimationFrame(runTicker);
        return;
      }

      const delta = (currentTime - previousTime) / 1000;

      previousTime = currentTime;

      position -= speed * delta;

      if (itemWidth > 0 && Math.abs(position) >= itemWidth) {
        position += itemWidth;

        const firstItem = list.children[0];

        if (firstItem) {
          list.appendChild(firstItem);
        }
      }

      list.style.transform = "translate3d(" + position + "px,0,0)";

      ultraTickerAnimationId = requestAnimationFrame(runTicker);
    }

    list.dataset.ultraTickerInitialized = "true";

    ultraTickerAnimationId = requestAnimationFrame(runTicker);

    document.addEventListener("visibilitychange", function () {
      ultraTickerRunning = !document.hidden;

      previousTime = performance.now();
    });
  }

  function initScrollAnimations() {
    if (!registerScrollTrigger()) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    function reveal(selector, options) {
      const elements = document.querySelectorAll(selector);

      if (!elements.length) {
        return;
      }

      elements.forEach(function (element, index) {
        if (element.dataset.ultraRevealAnimated === "true") {
          return;
        }

        const duration =
          options.duration !== undefined ? options.duration : 0.7;

        const delay =
          options.delay !== undefined
            ? options.delay + index * (options.stagger || 0)
            : index * (options.stagger || 0);

        const fromVars = {
          opacity: 0,
          y: options.y !== undefined ? options.y : 30,
          x: options.x !== undefined ? options.x : 0,
          scale: options.scale !== undefined ? options.scale : 1,
          rotate: options.rotate !== undefined ? options.rotate : 0,
        };

        gsap.fromTo(element, fromVars, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: duration,
          delay: delay,
          ease: options.ease || "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: element,
            start: options.start || "top 88%",
            once: true,
          },
        });

        element.dataset.ultraRevealAnimated = "true";
      });
    }

    reveal(
      ".ultra-hero-title, .interior-about__title, .ultra-services-title, .ultra-who-title, .ultra-counter-main-title, .ultra-testimonial-title, .ultra-contact-title",
      {
        y: 45,
        duration: 0.75,
        stagger: 0.02,
      },
    );

    reveal(
      ".ultra-hero-description, .interior-about__content > p, .ultra-services-section-heading > p, .ultra-contact-glass-content p",
      {
        y: 25,
        duration: 0.65,
        delay: 0.05,
        stagger: 0.03,
      },
    );

    reveal(".interior-about__content", {
      y: 30,
      duration: 0.65,
      delay: 0.08,
    });

    reveal(".interior-about__content li", {
      x: 25,
      y: 0,
      duration: 0.5,
      stagger: 0.06,
    });

    reveal(".ultra-services-item", {
      y: 25,
      duration: 0.5,
      stagger: 0.06,
    });

    reveal(".ultra-who-item", {
      y: 25,
      duration: 0.5,
      stagger: 0.06,
    });

    reveal(".ultra-counter-item", {
      y: 20,
      duration: 0.5,
      stagger: 0.06,
    });

    reveal(".ultra-testimonial-item", {
      y: 20,
      duration: 0.5,
      stagger: 0.06,
    });

    reveal(".ultra-contact-glass-box", {
      y: 25,
      duration: 0.6,
    });

    reveal(
      "#ultra-contact-form .ultra-contact-form-row, #ultra-contact-form .ultra-contact-form-item, #ultra-contact-form .ultra-contact-submit",
      {
        y: 20,
        duration: 0.5,
        stagger: 0.05,
      },
    );

    reveal(".ultra-footer-widget", {
      y: 20,
      duration: 0.5,
      stagger: 0.06,
    });

    reveal(".ultra-slide-anim", {
      x: 30,
      y: 0,
      duration: 0.6,
    });

    reveal(".ultra-scale", {
      y: 0,
      scale: 0.96,
      duration: 0.6,
    });
  }

  function initScrollTop() {
    const button = document.querySelector("#ultra-scroll-top");

    if (!button) return;

    let ticking = false;

    function updateScrollTop() {
      if (window.scrollY > 500) {
        button.classList.add("is-visible");
      } else {
        button.classList.remove("is-visible");
      }

      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(updateScrollTop);
          ticking = true;
        }
      },
      { passive: true },
    );

    button.addEventListener("click", function (event) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  function initContactForm() {
  const form = document.querySelector("#ultra-contact-form");

  if (!form) return;

  const fullname = document.querySelector("#ultra-contact-fullname");
  const phone = document.querySelector("#ultra-contact-phone");
  const email = document.querySelector("#ultra-contact-email");
  const service = document.querySelector("#ultra-contact-service");
  const message = document.querySelector("#ultra-contact-message");
  const submitButton = document.querySelector("#ultra-contact-submit-button");

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCeIX6RUJv6N-yajXoFKwq64C9WWVci8b5jRz3biv7g-Fcy5X_7TI0YoKc5fQT8qs0/exec";

  function showError(field, messageText) {
    if (!field) return false;

    field.classList.add("ultra-field-error");

    let error = field.parentElement.querySelector(".ultra-form-error");

    if (!error) {
      error = document.createElement("span");
      error.className = "ultra-form-error";
      field.parentElement.appendChild(error);
    }

    error.textContent = messageText;

    return false;
  }

  function clearError(field) {
    if (!field) return;

    field.classList.remove("ultra-field-error");

    const error = field.parentElement.querySelector(".ultra-form-error");

    if (error) {
      error.remove();
    }
  }

  function validateFullname() {
    if (!fullname) return true;

    const value = fullname.value.trim();

    clearError(fullname);

    if (!value) {
      return showError(fullname, "Please enter your name.");
    }

    if (!/^[A-Za-z][A-Za-z\s.'-]{1,59}$/.test(value)) {
      return showError(fullname, "Please enter a valid name.");
    }

    return true;
  }

  function validatePhone() {
    if (!phone) return true;

    const value = phone.value.trim();

    clearError(phone);

    if (!value) {
      return showError(phone, "Please enter your phone number.");
    }

    if (!/^\+?[0-9]{10,15}$/.test(value)) {
      return showError(phone, "Please enter a valid phone number.");
    }

    return true;
  }

  function validateEmail() {
    if (!email) return true;

    const value = email.value.trim();

    clearError(email);

    if (!value) {
      return showError(email, "Please enter your email address.");
    }

    const emailRegex = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

    if (!emailRegex.test(value)) {
      return showError(email, "Please enter a valid email address.");
    }

    return true;
  }

  function validateService() {
    if (!service) return true;

    clearError(service);

    const value = service.value.trim();

    if (!value) {
      return showError(service, "Please select a service.");
    }

    const validServices = [
      "Home Interiors",
      "Modular Kitchen",
      "Tv Unit",
      "Wardropes",
      "Wall Panelling",
      "False Ceiling",
      "Pooja Unit",
    ];

    if (!validServices.includes(value)) {
      return showError(service, "Please select a valid service.");
    }

    return true;
  }

  function validateMessage() {
    if (!message) return true;

    const value = message.value.trim();

    clearError(message);

    if (!value) {
      return showError(message, "Please enter your message.");
    }

    if (value.length < 10) {
      return showError(message, "Please enter at least 10 characters.");
    }

    if (value.length > 5000) {
      return showError(message, "Your message is too long.");
    }

    return true;
  }

  if (fullname) {
    fullname.addEventListener("input", function () {
      fullname.value = fullname.value.replace(/[^A-Za-z\s.'-]/g, "");
      validateFullname();
    });

    fullname.addEventListener("blur", validateFullname);
  }

  if (phone) {
    phone.addEventListener("input", function () {
      let value = phone.value.replace(/[^0-9+]/g, "");

      if (value.includes("+")) {
        value = "+" + value.replace(/\+/g, "");
      }

      phone.value = value.slice(0, 16);

      validatePhone();
    });

    phone.addEventListener("blur", validatePhone);
  }

  if (email) {
    email.addEventListener("input", validateEmail);
    email.addEventListener("blur", validateEmail);
  }

  if (service) {
    service.addEventListener("change", validateService);
    service.addEventListener("blur", validateService);
  }

  if (message) {
    message.addEventListener("input", validateMessage);
    message.addEventListener("blur", validateMessage);
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const validName = validateFullname();
    const validPhone = validatePhone();
    const validEmail = validateEmail();
    const validService = validateService();
    const validMessage = validateMessage();

    if (
      !validName ||
      !validPhone ||
      !validEmail ||
      !validService ||
      !validMessage
    ) {
      const firstError = form.querySelector(".ultra-field-error");

      if (firstError) {
        firstError.focus();
      }

      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.innerText;
      submitButton.innerText = "Sending...";
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
        alert("Your message has been sent successfully.");
      } else {
        alert(result.message || "Unable to send your message.");
      }
    } catch (error) {
      alert("Unable to send your message. Please try again.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerText =
          submitButton.dataset.originalText || "Send Message";
      }
    }
  });
}

  function initScrollTriggerRefresh() {
    if (typeof ScrollTrigger === "undefined") {
      return;
    }

    window.addEventListener(
      "load",
      function () {
        requestAnimationFrame(function () {
          ScrollTrigger.refresh();
        });
      },
      { once: true },
    );

    window.addEventListener(
      "resize",
      function () {
        clearTimeout(ultraResizeTimer);

        ultraResizeTimer = setTimeout(function () {
          if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
          }
        }, 250);
      },
      { passive: true },
    );
  }
})();
