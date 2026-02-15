function cadastrar(event) {
    event.preventDefault();

    const novoUsuario = document.getElementById("novoUsuario").value;
    const novaSenha = document.getElementById("novaSenha").value;

    // Validar se o usuário já existe
    const usuarioExistente = usuarios.find(user => user.usuario === novoUsuario);

    if (usuarioExistente) {
        alert("Este usuário já existe. Por favor, escolha outro nome de usuário.");
        return;
    }

    // Adicionar o novo usuário ao array
    usuarios.push({ usuario: novoUsuario, senha: novaSenha });

    alert("Cadastro realizado com sucesso!");
    // Redirecionar para a página de login
    window.location.href = "login.html";
}