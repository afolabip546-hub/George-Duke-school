"use strict";

/*
 * =========================================
 * GEORGE & DUKE — MAIN JAVASCRIPT
 * =========================================
 */

document.addEventListener("DOMContentLoaded", () => {

  /*
   * -----------------------------------------
   * CURRENT YEAR
   * -----------------------------------------
   */

  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });


  /*
   * -----------------------------------------
   * HEADER SCROLL STATE
   * -----------------------------------------
   */

  const header = document.querySelector(
    ".site-header"
  );

  const updateHeader = () => {
    if (!header) {
      return;
    }

    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /*
   * -----------------------------------------
   * SMOOTH INTERNAL LINKS
   * -----------------------------------------
   */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /*
   * -----------------------------------------
   * IMAGE ERROR HANDLING
   * -----------------------------------------
   *
   * Prevents broken images from creating
   * awkward empty areas without hiding the
   * problem from developers.
   */

  const images =
    document.querySelectorAll("img");

  images.forEach((image) => {

    image.addEventListener("error", () => {

      image.classList.add(
        "image-load-error"
      );

      image.setAttribute(
        "data-image-error",
        "true"
      );

    });

  });


  /*
   * -----------------------------------------
   * EXTERNAL LINKS
   * -----------------------------------------
   *
   * Opens external links safely in a new tab
   * when explicitly marked with target="_blank".
   */

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );

  externalLinks.forEach((link) => {

    const rel =
      link.getAttribute("rel") || "";

    const relValues =
      new Set(
        rel
          .split(" ")
          .map((value) => value.trim())
          .filter(Boolean)
      );

    relValues.add("noopener");
    relValues.add("noreferrer");

    link.setAttribute(
      "rel",
      Array.from(relValues).join(" ")
    );

  });


  /*
   * -----------------------------------------
   * ENQUIRY FORM SUBMISSION FEEDBACK
   * -----------------------------------------
   */

  const enquiryForms = document.querySelectorAll(".form, .enquiry-form");

  enquiryForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const feedback = form.querySelector(".form-feedback");
      if (feedback) {
        feedback.style.display = "block";
        feedback.className = "form-feedback form-feedback--success";
        feedback.textContent =
          "Thank you! Your enquiry has been received. Our admissions team will be in touch with you shortly.";
        feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      form.reset();
    });
  });


  /*
   * -----------------------------------------
   * PAGE READY STATE
   * -----------------------------------------
   */

  document.documentElement.classList.add(
    "js-ready"
  );

});