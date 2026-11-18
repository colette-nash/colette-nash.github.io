/* Light/dark theme. Loaded in <head> so the saved theme is applied before
   the page paints, avoiding a flash of the wrong theme. A reader's own
   choice is remembered; until they make one, the system setting is used. */
(function () {
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  apply(saved() || (media.matches ? 'dark' : 'light'));

  media.addEventListener('change', function (e) {
    if (!saved()) apply(e.matches ? 'dark' : 'light');
  });

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].hidden = false;
      buttons[i].addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', next); } catch (e) {}
        apply(next);
      });
    }
    apply(root.getAttribute('data-theme'));
  });
})();
