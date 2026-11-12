// Theme backgrounds: sets the `--lb-theme-bg` CSS variable to the image matching the current daisyUI theme.
// Images live in `public/img/Themes/` (note the capital T: servers on Linux are case-sensitive).
// Themes without an image here fall back to no background image.

var THEME_BACKGROUNDS = {
  aqua: "aqua.jpg",
  bumblebee: "bumblebee.jpg",
  business: "business.jpg",
  cmyk: "cmyk.jpg",
  coffee: "coffee.jpg",
  corporate: "corporate.jpg",
  cupcake: "cupcake.jpg",
  cyberpunk: "cyberpunk.jpg",
  dracula: "dracula.jpg",
  emerald: "emerald.jpg",
  forest: "forest.jpg",
  garden: "garden.jpg",
  halloween: "halloween.jpg",
  lofi: "lofi.jpg",
  luxury: "luxury.jpg",
  retro: "retro.jpg",
  synthwave: "synthwave.jpg",
  valentine: "valentine.jpg",
  winter: "winter.jpg",
  wireframe: "wireframe.jpg",
};

export function initThemeBackground(baseUrl) {
  var root = document.documentElement;
  var base = baseUrl || "/";

  function apply() {
    var theme = root.getAttribute("data-theme");
    var file = THEME_BACKGROUNDS[theme];
    root.style.setProperty(
      "--lb-theme-bg",
      file ? 'url("' + base + "img/Themes/" + file + '")' : "none"
    );
  }

  apply(); // theme already restored from localStorage
  new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === "data-theme") { apply(); break; }
    }
  }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
}
