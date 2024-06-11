const d = document,
  $main = d.querySelector("main");

console.group("Reference ");
console.log("\t\t\t-> Zoids Chaotic Century");
console.log("\t\t-> Titan's fury");
console.log("\t-> Hellboy 2");
console.log("-> The end of Evangelion");
console.groupEnd();

const getHTML = (opciones) => {
  let { url, success, error } = opciones;

  let xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let html = xhr.responseText;
      success(html);
    } else {
      let $message = xhr.statusText || "An error ocurred";
      error(`Error: ${xhr.status} === ${$message}`);
    }
  });

  xhr.open("GET", url);
  xhr.setRequestHeader("Content-type", "text/html; charset=utf-8");
  xhr.send();
};

d.addEventListener("DOMContentLoaded", (e) => {
  getHTML({
    url: "assets/vid1.html",
    success: (html) => ($main.innerHTML = html),
    error: (mens) => ($main.innerHTML = `<p style="color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 600;">${mens}<p>`),
  });
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".aside a")) {
    e.preventDefault();
    d.querySelectorAll(".anchor-active").forEach((el) =>
      el.classList.remove("anchor-active")
    );
    e.target.classList.add("anchor-active");
    getHTML({
      url: e.target.href,
      success: (html) => ($main.innerHTML = html),
      error: (mens) => ($main.innerHTML = `<p>${mens}<p>`),
    });
  }
});
