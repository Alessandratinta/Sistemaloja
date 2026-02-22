function cadastrar(event) {
  event.preventDefault();

  const novoUsuario = document.getElementById("novoUsuario").value;
  const novaSenha = document.getElementById("novaSenha").value;

  // pega usuários já salvos
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // verifica se já existe
  const usuarioExistente = usuarios.find(
    user => user.usuario === novoUsuario
  );

  if (usuarioExistente) {
    alert("Este usuário já existe. Escolha outro.");
    return;
  }

  // adiciona novo usuário
  usuarios.push({
    usuario: novoUsuario,
    senha: novaSenha
  });

  // salva no navegador
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");

  // volta para login
 window.location.href = "/html/login.html";
}