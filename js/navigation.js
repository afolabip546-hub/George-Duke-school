"use strict";

/*
 * =========================================
 * GEORGE & DUKE — NAVIGATION
 * =========================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(
    ".site-header__menu-toggle"
  );

  const siteNav = document.querySelector(
    ".site-nav"
  );

  const dropdownButtons = document.querySelectorAll(
    ".site-nav__dropdown-button"
  );


  /*
   * =========================================
   * MOBILE MENU
   * =========================================
   */

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );
      menuToggle.setAttribute(
        "aria-label",
        !isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      menuToggle.classList.toggle(
        "is-active",
        !isOpen
      );

      siteNav.classList.toggle(
        "is-open",
        !isOpen
      );

      document.body.classList.toggle(
        "nav-open",
        !isOpen
      );
    });
  }


  /*
   * =========================================
   * DROPDOWN MENUS
   * =========================================
   */

  dropdownButtons.forEach((button) => {
    const dropdown = button.nextElementSibling;
    const parentItem = button.closest(
      ".site-nav__item--dropdown"
    );

    if (!dropdown || !parentItem) {
      return;
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();

      const isOpen =
        button.getAttribute("aria-expanded") === "true";


      /*
       * Close all other dropdowns.
       */

      dropdownButtons.forEach((otherButton) => {
        if (otherButton === button) {
          return;
        }

        otherButton.setAttribute(
          "aria-expanded",
          "false"
        );

        const otherItem =
          otherButton.closest(
            ".site-nav__item--dropdown"
          );

        if (otherItem) {
          otherItem.classList.remove(
            "is-open"
          );
        }
      });


      /*
       * Toggle current dropdown.
       */

      button.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      parentItem.classList.toggle(
        "is-open",
        !isOpen
      );
    });
  });


  /*
   * =========================================
   * CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
   * =========================================
   */

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest(".site-nav")) {
      return;
    }

    dropdownButtons.forEach((button) => {
      button.setAttribute(
        "aria-expanded",
        "false"
      );

      const parentItem =
        button.closest(
          ".site-nav__item--dropdown"
        );

      if (parentItem) {
        parentItem.classList.remove(
          "is-open"
        );
      }
    });
  });


  /*
   * =========================================
   * CLOSE MOBILE MENU AFTER NAVIGATION
   * =========================================
   */

  const navigationLinks =
    document.querySelectorAll(
      ".site-nav a"
    );

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (siteNav) {
        siteNav.classList.remove(
          "is-open"
        );
      }

      if (menuToggle) {
        menuToggle.classList.remove(
          "is-active"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }

      document.body.classList.remove(
        "nav-open"
      );

      dropdownButtons.forEach((button) => {
        button.setAttribute(
          "aria-expanded",
          "false"
        );

        const parentItem =
          button.closest(
            ".site-nav__item--dropdown"
          );

        if (parentItem) {
          parentItem.classList.remove(
            "is-open"
          );
        }
      });
    });
  });


  /*
   * =========================================
   * ESCAPE KEY
   * =========================================
   */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    dropdownButtons.forEach((button) => {
      button.setAttribute(
        "aria-expanded",
        "false"
      );

      const parentItem =
        button.closest(
          ".site-nav__item--dropdown"
        );

      if (parentItem) {
        parentItem.classList.remove(
          "is-open"
        );
      }
    });


    /*
     * Close mobile navigation.
     */

    if (siteNav) {
      siteNav.classList.remove(
        "is-open"
      );
    }

    if (menuToggle) {
      menuToggle.classList.remove(
        "is-active"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

    document.body.classList.remove(
      "nav-open"
    );

    if (menuToggle && event.target !== menuToggle &&
        menuToggle.getAttribute("aria-expanded") === "false") {
      menuToggle.focus();
    }
  });


  /*
   * =========================================
   * RESET MOBILE NAVIGATION ON RESIZE
   * =========================================
   */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      if (siteNav) {
        siteNav.classList.remove(
          "is-open"
        );
      }

      if (menuToggle) {
        menuToggle.classList.remove(
          "is-active"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }

      document.body.classList.remove(
        "nav-open"
      );
    }
  });


  /* Close expanded menus with Escape for keyboard and touch accessibility. */
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    dropdownButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      const parentItem = button.closest(".site-nav__item--dropdown");
      if (parentItem) parentItem.classList.remove("is-open");
    });

    if (siteNav) siteNav.classList.remove("is-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.classList.remove("is-active");
    }
    document.body.classList.remove("nav-open");
  });
});