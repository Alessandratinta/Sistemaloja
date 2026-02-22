document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const usuarioDigitado = document.getElementById("email").value;
  const senha = document.getElementById("password").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(
    user => user.usuario === usuarioDigitado && user.senha === senha
  );

  if (usuarioEncontrado) {

    // salva o usuário logado corretamente
    localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

    window.location.href = "/html/dashboard.html";

  } else {
    alert("Usuário não encontrado ou senha incorreta.");
  }
});