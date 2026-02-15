const vendas = JSON.parse(localStorage.getItem("vendas")) || [];

const tabela = document.getElementById("listaRelatorio");
const totalVendas = document.getElementById("totalVendas");

let soma = 0;

vendas.forEach(v => {
  soma += v.total;

  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td>${v.cliente}</td>
    <td>${v.produto}</td>
    <td>R$ ${v.total.toFixed(2)}</td>
    <td>${v.pagamento}</td>
  `;
  tabela.appendChild(linha);
});

totalVendas.innerHTML = `<strong>Total do dia:</strong> R$ ${soma.toFixed(2)}`;
