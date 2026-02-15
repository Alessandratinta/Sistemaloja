const formFornecedor = document.getElementById("formFornecedor");
const tabelaFornecedores = document.getElementById("listarFornecedores");

let fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
let fornecedorEditando = null;

/* RENDERIZAR */
function renderizarFornecedores(lista) {
  tabelaFornecedores.innerHTML = "";

  lista.forEach((fornecedor, index) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${fornecedor.nome}</td>
      <td>
        <button class="btn-editar" onclick="editarFornecedor(${index})">✏️ Editar</button>
        <button class="btn-excluir" onclick="excluirFornecedor(${index})">🗑 Excluir</button>
      </td>
    `;
    tabelaFornecedores.appendChild(linha);
  });
}

/* SALVAR */
formFornecedor.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeFornecedor").value.trim();

  if (!nome) {
    alert("Informe o nome do fornecedor");
    return;
  }

  const novoFornecedor = {
    id: fornecedorEditando === null ? Date.now() : fornecedores[fornecedorEditando].id,
    nome
  };

  if (fornecedorEditando === null) {
    fornecedores.push(novoFornecedor);
  } else {
    fornecedores[fornecedorEditando] = novoFornecedor;
    fornecedorEditando = null;
    formFornecedor.querySelector("button[type='submit']").textContent = "Salvar Fornecedor";
  }

  localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
  renderizarFornecedores(fornecedores);
  formFornecedor.reset();
});

/* EDITAR */
window.editarFornecedor = function (index) {
  const fornecedor = fornecedores[index];

  document.getElementById("nomeFornecedor").value = fornecedor.nome;
  fornecedorEditando = index;

  formFornecedor.querySelector("button[type='submit']").textContent = "Atualizar Fornecedor";
};

/* EXCLUIR */
window.excluirFornecedor = function (index) {
  if (confirm("Deseja excluir este fornecedor?")) {
    fornecedores.splice(index, 1);
    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    renderizarFornecedores(fornecedores);
  }
};

/* INICIAL */
renderizarFornecedores(fornecedores);
