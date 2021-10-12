// funcao Global
function invalidForm(el, ell) {
  el.style.color = "#D91A2A";
  el.style.borderColor = "#D91A2A";
  ell.style.color = "#D91A2A";
}

function validForm(el, ell) {
  el.style.color = "#3951b2";
  el.style.borderColor = "#3951b2";
  ell.style.color = "#3951b2";
}

// Verificar Nome
document.getElementById("nome").addEventListener("focusout", checkName);

function checkName() {
  let name = document.getElementById("nome").value;
  let el = document.getElementById("nome");
  let ell = document.getElementById("nomelabel");
  if (name.length < 6) {
    invalidForm(el, ell);
    ell.innerHTML = "Nome Invalido";
  } else {
    validForm(el, ell);
    ell.innerHTML = "Nome";
  }
}

// Verificação de Cpf

document.getElementById("cpf").addEventListener("focusout", valida);

function invalidCpf() {
  let el = document.getElementById("cpf");
  let ell = document.getElementById("cpflabel");
  invalidForm(el, ell);
  let ellname = document.getElementById("cpflabel");
  ellname.innerHTML = "CPF Invalido";

  let elvalue = document.getElementById("cpf").value;
  removePoints(elvalue);
}

// Aqui remove se o cliente tiver digitado um cpf valido e depois apagou algum caractere

function removePoints(elvalue) {
  if (/(-|\.)/g.test(elvalue)) elvalue = elvalue.replace(/(-|\.)/g, "");
  let elvalue1 = (document.getElementById("cpf").value = elvalue);
}

// Se for valido

function validCpf() {
  let el = document.getElementById("cpf");
  let ell = document.getElementById("cpflabel");
  validForm(el, ell);
  let ellname = document.getElementById("cpflabel");
  ellname.innerHTML = "CPF";
}

function checkCpf() {
  let cpf = document.getElementById("cpf").value;
  if (cpf !== "") fixCpf(cpf);
}

// Coloca . e - no cpf é aumenta o tamanho da string

function fixCpf(cpf) {
  const regexFormatCPF = /(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/;
  const cleanCPF = cpf.replace(/\D/g, "");
  const digits = cleanCPF.match(regexFormatCPF).slice(1);
  // digits = ["123", "456", "789", "01"]
  const a = digits.slice(0, 3).join("."); // xxx.xxx.xxx
  const b = `-${digits[digits.length - 1]}`;
  const cpfFormated = a + b;
  cpf = document.getElementById("cpf").value = cpfFormated;
  cpf = document.getElementById("cpf").maxLength = 13;
}

function valida() {
  let cpf = document.getElementById("cpf").value;
  if (goTovalid(document.getElementById("cpf").value)) {
    validCpf();
    console.log(cpf.length);
  } else {
    if (cpf.length !== 14) {
      invalidCpf();
    }
  }
}

function goTovalid(cpf) {
  let numeros, digits, sum, i, result, equaldigits;
  equaldigits = 1;
  if (cpf.length < 11) return false;
  for (i = 0; i < cpf.length - 1; i++)
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      equaldigits = 0;
      break;
    }
  if (!equaldigits) {
    numeros = cpf.substring(0, 9);
    digits = cpf.substring(9);
    sum = 0;
    for (i = 10; i > 1; i--) sum += numeros.charAt(10 - i) * i;
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(0)) return false;
    numeros = cpf.substring(0, 10);
    sum = 0;
    for (i = 11; i > 1; i--) sum += numeros.charAt(11 - i) * i;
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(1)) return false;
    checkCpf();

    return true;
  } else return false;
}

// Verifica Telefone



function phoneGet() {
  let phone = document.getElementById("celphone").value;
  if (phone.length == 11) {
    upDatePhone(phone);
    validPhone();
  } else {
    if (phone.length !== 14) {
      invalidPhone();
    }
  }
}

function validPhone() {
  let el = document.getElementById("celphone");
  let ell = document.getElementById("celphone_label");
  let ellname = document.getElementById("celphone_label");
  ellname.innerHTML = "Telefone";
  validForm(el, ell);
}

function upDatePhone(phone) {
  let phone1 = `(${phone.slice(0, 2)})${phone.slice(2, 7)}-${phone.slice(
    7,
    11
  )}`;
  phone = document.getElementById("celphone").value = phone1;
  phone = document.getElementById("celphone").maxLength = 14;
}

function invalidPhone() {
  phone = document.getElementById("celphone").value;
  let el = document.getElementById("celphone");
  let ell = document.getElementById("celphone_label");
  invalidForm(el, ell);
  let ellname = document.getElementById("celphone_label");
  ellname.innerHTML = "Telefone Invalido";

  removePointsPhone(phone);
}

// remove () e o -
function removePointsPhone(phone) {
  let phone1 = phone.replace(/[)(-]/g, "");
  phone = document.getElementById("celphone").value = phone1;
  phone = document.getElementById("celphone").maxLength = 11;
}


document.getElementById("celphone").addEventListener("focusout", phoneGet);
// Valor



function addvalor() {
  let valor = document.getElementById("valueinput").value;
  valor = valor.replace(/\D+/g, "");
  if (valor[0] !== "R" && valor[1] !== "$") {
    upDateValor(valor);
  }
}

function upDateValor(valor) {
  let valor1 = `R$${valor}`;
  valor = document.getElementById("valueinput").value = valor1;
}

document.getElementById("valueinput").addEventListener("focusout", addvalor);

function validaData() {
  let data = document.getElementById("dateofbirth").value;
  data = data.replace(/\//g, "-");
  data = data.split("-");

  let hoje = new Date();
  let nasc = new Date(data);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  let m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

  if (idade < 18) {
    youngOfAge();
    return;
  } else {
    oldOfAge();
  }
}

const youngOfAge = () => {
  let el = document.getElementById("dateofbirth");
  let ell = document.getElementById("dateofbirthlabel");
  invalidForm(el, ell);
  let ellname = document.getElementById("dateofbirthlabel");
  ellname.innerText = "Data de Nascimento Invalida";
};

const oldOfAge = () => {
  let el = document.getElementById("dateofbirth");
  let ell = document.getElementById("dateofbirthlabel");
  validForm(el, ell);
  let ellname = document.getElementById("dateofbirthlabel");
  ellname.innerText = "Data de Nascimento";
};


document.getElementById("dateofbirth").addEventListener("focusout", validaData);

// Api Do Cep

const searchCep = async () => {
  const cep = document.getElementById("cep").value;

  const url = `http://viacep.com.br/ws/${cep}/json/`;
  const dados = await fetch(url);
  const andress = await dados.json();
  if (andress.hasOwnProperty("erro")) {
    return invalidCep();
  } else {
    fillOutForm(andress);
    return validCep();
  }
};

// função que preenche o formulario com dados da Api

const fillOutForm = (andress) => {
  document.getElementById("andress").value = andress.logradouro;
  document.getElementById("district").value = andress.bairro;
  document.getElementById("city").value = andress.localidade;
  document.getElementById("uf").value = andress.uf;
};

// Função que mudar a o label do CEP quando é invalido

function invalidCep() {
  let el = document.getElementById("cep");
  let ell = document.getElementById("ceplabel");
  invalidForm(el, ell);
  let ellname = document.getElementById("ceplabel");
  ellname.innerHTML = "CEP Invalido";
}

// Função que mudar a o label do CEP quando é valido

function validCep() {
  let el = document.getElementById("cep");
  let ell = document.getElementById("ceplabel");
  validForm(el, ell);
  let ellname = document.getElementById("ceplabel");
  ellname.innerHTML = "CEP";
}

document.getElementById("cep").addEventListener("focusout", searchCep); // Quando a Api é chamada

// Validação do Formulario


function validFormAll() {
  let nome = document.getElementById("nomelabel").textContent;
  let cpf = document.getElementById("cpflabel").textContent;
  let phone = document.getElementById("celphone_label").textContent;
  let born = document.getElementById("dateofbirthlabel").textContent;
  let cep = document.getElementById("ceplabel").textContent;
 

  if (
    !nome.includes("Invalido") &&
    !cpf.includes("Invalido") &&
    !phone.includes("Invalido") &&
    !born.includes("Invalida") &&
    !cep.includes("Invalido")
  ) {
    clearForm();
  } else {
    alert("Verifique os campos novamente ");
  }
}

function clearForm() {
  const allInputs = document.querySelectorAll("input");

  const inputs = Array.from(allInputs); //
  const checkInputs = inputs.every((input) => input.value);

  if (checkInputs) {
    inputs.forEach((input) => (input.value = ""));
    alert("Formulario enviado com sucesso ");
  } else {
    alert("Preencha todos os dados");
  }
}


document.getElementById("enviar").addEventListener("click", validFormAll);