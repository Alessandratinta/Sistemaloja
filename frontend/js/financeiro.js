const form = document.getElementById("formFinanceiro");
const tabela = document.getElementById("listarFinanceiro");

let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
let lancamentoEditando = null;

function renderizarFinanceiro(lista) {
  tabela.innerHTML = "";

  let totalEntradas = 0;
  let totalSaidas = 0;

  lista.forEach((item, index) => {

    if (item.tipo === "entrada") {
      totalEntradas += parseFloat(item.valor);
    } else {
      totalSaidas += parseFloat(item.valor);
    }

    const linha = document.createElement("tr");
    linha.innerHTML = `
        <td>${item.descricao}</td>
        <td>${item.tipo}</td>
        <td>R$ ${parseFloat(item.valor).toFixed(2)}</td>
        <td>${item.data}</td>
        <td>
          <button class="btn-editar" onclick="editarLancamento(${index})">✏️</button>
          <button class="btn-excluir" onclick="excluirLancamento(${index})">🗑</button>
        </td>
    `;
    tabela.appendChild(linha);
  });

  atualizarResumo(totalEntradas, totalSaidas);
}

// atualizar resumo financeiro
function atualizarResumo(entradas, saidas) {
  let saldo = entradas - saidas;

  document.getElementById("totalEntradas").textContent = 
    "R$ " + entradas.toFixed(2);

  document.getElementById("totalSaidas").textContent = 
    "R$ " + saidas.toFixed(2);

  document.getElementById("saldoAtual").textContent = 
    "R$ " + saldo.toFixed(2);
}

// salvar lançamento
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const novoLancamento = {
    descricao: document.getElementById("descricao").value,
    tipo: document.getElementById("tipo").value,
    valor: document.getElementById("valor").value,
    data: document.getElementById("data").value
  };

  if (lancamentoEditando === null) {
    lancamentos.push(novoLancamento);
  } else {
    lancamentos[lancamentoEditando] = novoLancamento;
    lancamentoEditando = null;
    form.querySelector("button[type='submit']").textContent = "Salvar Lançamento";
  }

  localStorage.setItem("lancamentos", JSON.stringify(lancamentos));

  renderizarFinanceiro(lancamentos);
  form.reset();
});

// editar
window.editarLancamento = function(index) {
  const item = lancamentos[index];

  document.getElementById("descricao").value = item.descricao;
  document.getElementById("tipo").value = item.tipo;
  document.getElementById("valor").value = item.valor;
  document.getElementById("data").value = item.data;

  lancamentoEditando = index;
  form.querySelector("button[type='submit']").textContent = "Atualizar Lançamento";
};

// excluir
window.excluirLancamento = function(index) {
  if (confirm("Deseja excluir este lançamento?")) {
    lancamentos.splice(index, 1);
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
    renderizarFinanceiro(lancamentos);
  }
};

// carregar ao abrir
renderizarFinanceiro(lancamentos);