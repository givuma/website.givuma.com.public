//Alpine JS and plugins import
import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import persist from "@alpinejs/persist";
import collapse from "@alpinejs/collapse";
import Iconify from "@iconify/iconify";

window.Alpine = Alpine;
//Init collapse plugin
Alpine.plugin(collapse);
//Init intersect plugin
Alpine.plugin(intersect);
//Init persist plugin
Alpine.plugin(persist);
//Init store
Alpine.store("app", {
  init() {
    //this.isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  },
  //isDark: Alpine.$persist(false),
  //isLoggedIn: Alpine.$persist(false),
});
//Start Alpine JS
Alpine.start();

import "./components";
import "./pages";

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    //Run something globally
    document.querySelectorAll('a[href^="#"]').forEach((trigger) => {
      trigger.onclick = function (e) {
        e.preventDefault();
        const hash = this.getAttribute("href");
        const target = document.querySelector(hash);
        const headerOffset = 100;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      };
    });
  }
};
