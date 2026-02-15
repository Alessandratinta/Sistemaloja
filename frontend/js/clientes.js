document.addEventListener("DOMContentLoaded", () => {

  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  let clienteEditando = null;

  const form = document.getElementById("formCliente");
  const tabela = document.getElementById("listaClientes");

  function renderClientes() {
    tabela.innerHTML = "";

    clientes.forEach((c, i) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${c.nome}</td>
        <td>${c.telefone}</td>
        <td>${c.email}</td>
        <td>
          <button class="btn-editar" onclick="editarCliente(${i})">✏️ Editar</button>
          <button class="btn-excluir" onclick="excluirCliente(${i})">🗑 Excluir</button>
        </td>
      `;

      tabela.appendChild(tr);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nomeCliente").value.trim();
    const telefone = document.getElementById("telefoneCliente").value.trim();
    const email = document.getElementById("emailCliente").value.trim();

    if (!nome || !telefone || !email) {
      alert("Preencha todos os campos");
      return;
    }

    if (clienteEditando === null) {
      clientes.push({ nome, telefone, email });
    } else {
      clientes[clienteEditando] = { nome, telefone, email };
      clienteEditando = null;
      form.querySelector("button").textContent = "Salvar Cliente";
    }

    localStorage.setItem("clientes", JSON.stringify(clientes));
    renderClientes();
    form.reset();
  });

  window.editarCliente = function(index) {
    const c = clientes[index];

    document.getElementById("nomeCliente").value = c.nome;
    document.getElementById("telefoneCliente").value = c.telefone;
    document.getElementById("emailCliente").value = c.email;

    clienteEditando = index;
    form.querySelector("button").textContent = "Atualizar Cliente";
  };

  window.excluirCliente = function(index) {
    if (confirm("Deseja excluir este cliente?")) {
      clientes.splice(index, 1);
      localStorage.setItem("clientes", JSON.stringify(clientes));
      renderClientes();
    }
  };

  renderClientes();
});
