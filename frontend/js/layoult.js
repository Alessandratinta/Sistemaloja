fetch("../html/layout.html")
  .then(r => r.text())
  .then(data => {
    document.getElementById("layout").innerHTML = data;

    document.getElementById("tituloPagina").textContent =
      document.title;
  });