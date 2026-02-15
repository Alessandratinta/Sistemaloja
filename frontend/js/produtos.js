const form = document.getElementById("formProduto");
const tabela = document.getElementById("listarProdutos");
const filtro = document.getElementById("filtroCategoria");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let produtoEditando = null;

function renderizarProdutos(lista) {
  tabela.innerHTML = "";

  lista.forEach((produto, index) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
            <td>${produto.quantidade}</td>
            <td>
              <button class="btn-editar" onclick="editarProduto(${index})">✏️ Editar</button>
              <button class="btn-excluir" onclick="excluirProduto(${index})">🗑 Excluir</button>
            </td>
        `;
    tabela.appendChild(linha);
  });
}

// salvar produto
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const novoProduto = {
    nome: document.getElementById("nome").value,
    categoria: document.getElementById("categoria").value.toLowerCase(),
    preco: document.getElementById("preco").value,
    quantidade: document.getElementById("quantidade").value,
  };

  if (produtoEditando === null) {
    produtos.push(novoProduto);
  } else {
    produtos[produtoEditando] = novoProduto;
    produtoEditando = null;
    form.querySelector("button[type='submit']").textContent = "Salvar Produto";
  }

  localStorage.setItem("produtos", JSON.stringify(produtos));

  renderizarProdutos(produtos);
  form.reset();
});

// filtro
filtro.addEventListener("change", function () {
  if (filtro.value === "todos") {
    renderizarProdutos(produtos);
  } else {
    const filtrados = produtos.filter((p) => p.categoria === filtro.value);
    renderizarProdutos(filtrados);
  }
});

// editar
window.editarProduto = function (index) {
  const produto = produtos[index];

  document.getElementById("nome").value = produto.nome;
  document.getElementById("categoria").value = produto.categoria;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("quantidade").value = produto.quantidade;

  produtoEditando = index;
  form.querySelector("button[type='submit']").textContent = "Atualizar Produto";
};

// excluir
window.excluirProduto = function (index) {
  if (confirm("Deseja excluir este produto?")) {
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    renderizarProdutos(produtos);
  }
};

// carrega ao abrir
renderizarProdutos(produtos);