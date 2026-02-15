document.getElementById("formVenda").addEventListener("submit", function (event) {
  event.preventDefault();

  const cliente = document.getElementById("cliente").value;
  const produto = document.getElementById("produto").value;
  const valor = document.getElementById("valor").value;
  const pagamento = document.getElementById("pagamento").value;

  if (!cliente || !produto || !valor || !pagamento) {
    alert("Preencha todos os campos");
    return;
  }

  const tabela = document.getElementById("listaVendas");

  const linha = document.createElement("tr");

  linha.innerHTML = `
    <td>${cliente}</td>
    <td>${produto}</td>
    <td>R$ ${parseFloat(valor).toFixed(2)}</td>
    <td>${pagamento}</td>
  `;

  tabela.appendChild(linha);

  document.getElementById("formVenda").reset();
});
