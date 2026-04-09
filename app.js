const form = document.getElementById("formCliente");
const inputNome = document.getElementById("nome");
const inputCPF = document.getElementById("cpf");
const inputEmail = document.getElementById("email");
const inputTelefone = document.getElementById("telefone");
const listaClientes = document.getElementById("listaClientes");

// Função para destacar campo com borda vermelha ao ocorrer erro
function marcarErro(input) {
  input.classList.add("erro");
}

// Função para resetar o style da borda após apresentar um erro e clicar novamente no campo.
[inputNome, inputCPF, inputEmail, inputTelefone].forEach(function (input) {
  input.onfocus = function () {
    this.style.border = "";
    this.classList.remove("erro");
  };
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = inputNome.value.trim();
  const cpf = inputCPF.value.trim();
  const email = inputEmail.value.trim();
  const telefone = inputTelefone.value.trim();
  const regex = /^[A-Za-zÀ-ÿ\s'-]+$/; // Usei regex para excluir números e caracteres especiais do campo nome!

  // VALIDAÇÃO CAMPOS VAZIOS
  if (nome === "" && cpf === "" && email === "" && telefone === "") {
    alert("Preencha todos os campos.");
    return;
  }

  //VALIDAÇÃO NOME

  // Validação campo vazio
  if (nome === "") {
    alert("Nome não preenchido.");
    marcarErro(inputNome);
    return;
  }
  // Tamanho mínimo caracteres
  if (nome.length < 3) {
    alert("O nome deve ter no mínimo 3 caracteres.");
    marcarErro(inputNome);
    return;
  }
  // Caracteres válidos
  if (!regex.test(nome)) {
    alert("O nome não pode conter números ou caracteres especiais.");
    marcarErro(inputNome);
    return;
  }

  //VALIDAÇÃO CPF

  // Validação campo vazio
  if (cpf === "") {
    alert("CPF não preenchido.");
    marcarErro(inputCPF);
    return;
  }
  // Validação tamanho exato
  if (cpf.length !== 14) {
    alert("CPF deve estar no formato XXX.XXX.XXX-XX");
    marcarErro(inputCPF);
    return;
  }
  // Validação de formatação (pontos e hífen)
  if (cpf[3] !== "." || cpf[7] !== "." || cpf[11] !== "-") {
    alert("Use o formato XXX.XXX.XXX-XX");
    marcarErro(inputCPF);
    return;
  }
  // Validação: garante que só existem números nas posições corretas
  for (let i = 0; i < cpf.length; i++) {
    if (i === 3 || i === 7 || i === 11) continue;
    if (isNaN(cpf[i])) {
      alert("CPF deve conter apenas números no formato XXX.XXX.XXX-XX");
      marcarErro(inputCPF);
      return;
    }
  }

  //VALIDAÇÃO EMAIL

  // Validação campo vazio
  if (email === "") {
    alert("Email não preenchido.");
    marcarErro(inputEmail);
    return;
  }
  // Validação formato email
  if (
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1 ||
    email.startsWith("@") ||
    email.endsWith("@") ||
    email.startsWith(".") ||
    email.endsWith(".")
  ) {
    alert("Email inválido. Use um formato válido como exemplo@email.com");
    marcarErro(inputEmail);
    return;
  }

  //VALIDAÇÃO TELEFONE

  // Validação campo vazio
  if (telefone === "") {
    alert("Telefone não preenchido.");
    marcarErro(inputTelefone);
    return;
  }
  // Validação apenas números
  for (let i = 0; i < telefone.length; i++) {
    if (isNaN(telefone[i])) {
      alert("Telefone deve conter apenas números.");
      marcarErro(inputTelefone);
      return;
    }
  }
  //Validação tamanho
  if (telefone.length < 10 || telefone.length > 11) {
    alert("Telefone inválido.");
    marcarErro(inputTelefone);
    return;
  }

  // CADASTRAR NA LISTA
  const li = document.createElement("li");
  li.innerHTML = `
  <div class="cliente-info">
    <strong>${nome}</strong><br>
    ${cpf}<br>
    ${email}<br>
    ${telefone}
  </div>
  <div class="cliente-acoes">
    <button class="btn-remover"><i class="fa-solid fa-trash"></i></button>
  </div>
`;
  const btnRemover = li.querySelector(".btn-remover");
  btnRemover.addEventListener("click", function () {
    li.remove();
  });

  listaClientes.appendChild(li);
  form.reset();
});
