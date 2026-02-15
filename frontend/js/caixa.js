const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const selectProduto = document.getElementById("produto");
const campoValor = document.getElementById("valor");

selectProduto.innerHTML = '<option value="">Selecione</option>';

produtos.forEach((p, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = p.nome;
  selectProduto.appendChild(option);
});

selectProduto.addEventListener("change", () => {
  if (selectProduto.value !== "") {
    const produtoSelecionado = produtos[selectProduto.value];
    campoValor.value = produtoSelecionado.preco;
  } else {
    campoValor.value = "";
  }
});

document.getElementById("formCaixa").addEventListener("submit", function (event) {
  event.preventDefault();

  const cliente = document.getElementById("cliente").value;
  const quantidade = document.getElementById("quantidade").value;
  const pagamento = document.getElementById("pagamento").value;

  if (!cliente || selectProduto.value === "" || !quantidade || !campoValor.value || !pagamento) {
    alert("Preencha todos os campos");
    return;
  }

  const produto = produtos[selectProduto.value];
  const total = quantidade * produto.preco;

  const tabela = document.getElementById("listaCaixa");

  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td>${cliente}</td>
    <td>${produto.nome}</td>
    <td>${quantidade}</td>
    <td>R$ ${total.toFixed(2)}</td>
    <td>${pagamento}</td>
  `;

  tabela.appendChild(linha);
  document.getElementById("formCaixa").reset();
});
