document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL_old = "https://unviere.github.io";
  const BASE_URL = window.location.origin;

  console.log("Origin:", window.location.origin);

  document.querySelectorAll("a[data-pathOld]").forEach(link => {
    // Only set href if it doesn't already have data-path to avoid override
    if (!link.hasAttribute("data-path")) {
      link.href = BASE_URL_old + link.getAttribute("data-pathOld");
    }
  });

  document.querySelectorAll("a[data-path]").forEach(link => {
    link.href = BASE_URL + link.getAttribute("data-path");
  });
});
