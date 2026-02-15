function entrar(event) {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (usuario === "" || senha === "") {
    alert("Preencha usuário e senha");
    return;
  }

  window.location.href = "dashboard.html";
}


 
