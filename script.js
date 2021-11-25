const criarTarefa = document.getElementById('criar-tarefa');
const textoTarefa = document.getElementById('texto-tarefa');
const lista = document.getElementsByTagName('ol');
const quadroCentral = document.getElementById('quadro-central');
const listaLi = document.getElementsByTagName('li');
const buttonBar = document.getElementById('barra-botoes');
const corSeleção = 'rgb(128, 128, 128)';
let liMarcada;
// Função para criar os itens da lista de tarefas
function creat() {
  const text = document.createElement('li');
  text.innerText = textoTarefa.value;
  if (text.innerText !== '') {
    text.style.height = '20px';
    text.style.marginLeft = '15px';
    text.style.lineHeight = '20px';
    lista[0].appendChild(text);
    textoTarefa.value = '';
    quadroCentral.style.height = `${String(quadroCentral.offsetHeight + 20)}px`;
  } else {
    alert('Digite uma terefa');
  }
}
criarTarefa.addEventListener('click', creat);

// Função para mudar todas a li´s para o backgroundColor branco
function clearLiColor() {
  for (let i = 0; i < listaLi.length; i += 1) {
    listaLi[i].style.backgroundColor = 'white';
  }
}

// Função para colocar cor ao item da lista clicado
function liColor(event) {
  const liClicada = event.target;
  if (liClicada.tagName === 'LI') {
    clearLiColor();
    liClicada.style.backgroundColor = corSeleção;
    liMarcada = event.target;
  }
}
document.addEventListener('click', liColor);

// Função para colocar a classe "completed" em um item clicado duas vezes e riscar o item na lista
function addClass(event) {
  const liClicada = event.target;
  if (liClicada.tagName === 'LI' && liClicada.className === 'completed') {
    liClicada.className = '';
    liClicada.style.textDecoration = 'none';
  } else if (liClicada.tagName === 'LI') {
    liClicada.classList.add('completed');
    liClicada.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
  }
}
document.addEventListener('dblclick', addClass);

// Função para remover toda a lista de li´s
function liClear() {
  for (;listaLi.length > 0;) {
    lista[0].removeChild(listaLi[0]);
    quadroCentral.style.height = `${String(quadroCentral.offsetHeight - 20)}px`;
  }
}
const buttonClear = document.getElementById('apaga-tudo');
buttonClear.addEventListener('click', liClear);

// Função que adiciona o botão para apagar as li´s com a classe "completed"
function addButtonClearCompleted() {
  const buttonClear2 = document.createElement('button');
  buttonClear2.innerText = 'Limpar Completos';
  buttonClear2.id = 'remover-finalizados';
  buttonClear2.style.paddingLeft = '20px';
  buttonClear2.style.paddingRight = '20px';
  buttonClear2.style.border = 'none';
  buttonClear2.style.color = 'white';
  buttonClear2.style.backgroundColor = 'blue';
  buttonClear2.style.paddingTop = '7px';
  buttonClear2.style.paddingBottom = '7px';
  buttonClear2.style.borderRadius = '10px';
  buttonClear2.style.marginLeft = '4px';

  buttonBar.appendChild(buttonClear2);
}
addButtonClearCompleted();

// Função para remover apenas as li´s com a classe "completed"
function liClearCompleted() {
  for (let i = 0; i < listaLi.length; i += 1) {
    if (listaLi[i].className === 'completed') {
      lista[0].removeChild(listaLi[i]);
      quadroCentral.style.height = `${String(quadroCentral.offsetHeight - 20)}px`;
      i = -1;
    }
  }
}

const buttonClear2 = document.getElementById('remover-finalizados');
buttonClear2.addEventListener('click', liClearCompleted);

// Função que adiciona o botão para salvar as li´s no Local Storange
function addButtonSave() {
  const buttonSave = document.createElement('button');
  buttonSave.innerText = 'Salvar Lista';
  buttonSave.id = 'salvar-tarefas';
  buttonSave.style.paddingLeft = '20px';
  buttonSave.style.paddingRight = '20px';
  buttonSave.style.border = 'none';
  buttonSave.style.color = 'white';
  buttonSave.style.backgroundColor = 'green';
  buttonSave.style.paddingTop = '7px';
  buttonSave.style.paddingBottom = '7px';
  buttonSave.style.borderRadius = '10px';
  buttonSave.style.marginLeft = '4px';
  buttonBar.appendChild(buttonSave);
}
addButtonSave();

// Função para salvar as li´s no Local Storange
function liSave() {
  localStorage.clear();
  for (let i = 0; i < listaLi.length; i += 1) {
    const newItem = { conteudo: '', classe: '' };
    newItem.conteudo = listaLi[i].innerText;
    newItem.classe = listaLi[i].className;
    localStorage.setItem(i, JSON.stringify(newItem));
  }
}
const buttonSave = document.getElementById('salvar-tarefas');
buttonSave.addEventListener('click', liSave);

// Função para recarregar as li´s do Local Storange quando a página for recarregada
function reloadLi() {
  for (let i = 0; i < localStorage.length; i += 1) {
    const memory = JSON.parse(localStorage.getItem(i));
    const text = document.createElement('li');
    text.className = memory.classe;
    text.innerText = memory.conteudo;
    text.style.height = '20px';
    text.style.marginLeft = '15px';
    text.style.lineHeight = '20px';
    lista[0].appendChild(text);
    quadroCentral.style.height = `${String(quadroCentral.offsetHeight + 20)}px`;
    if (text.className === 'completed') {
      text.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    }
  }
}
reloadLi();

// Função que adiciona o botão para apagar Li selecionada
function addButtonX() {
  const buttonX = document.createElement('button');
  buttonX.innerText = 'X';
  buttonX.id = 'remover-selecionado';
  buttonX.style.paddingLeft = '20px';
  buttonX.style.paddingRight = '20px';
  buttonX.style.border = 'none';
  buttonX.style.color = 'white';
  buttonX.style.backgroundColor = 'red';
  buttonX.style.paddingTop = '7px';
  buttonX.style.paddingBottom = '7px';
  buttonX.style.borderRadius = '10px';
  buttonX.style.marginLeft = '50px';
  buttonBar.appendChild(buttonX);
}
addButtonX();

// Função que adiciona o botão para mover para baixo a Li selecionada
function addButtonDown() {
  const buttonD = document.createElement('button');
  buttonD.innerText = '⬇';
  buttonD.id = 'mover-baixo';
  buttonD.style.paddingLeft = '20px';
  buttonD.style.paddingRight = '20px';
  buttonD.style.border = 'none';
  buttonD.style.color = 'white';
  buttonD.style.backgroundColor = 'orange';
  buttonD.style.paddingTop = '7px';
  buttonD.style.paddingBottom = '7px';
  buttonD.style.borderRadius = '10px';
  buttonD.style.marginLeft = '10px';
  buttonBar.appendChild(buttonD);
}
addButtonDown();

// Função que adiciona o botão para mover para cima a Li selecionada
function addButtonUpp() {
  const buttonU = document.createElement('button');
  buttonU.innerText = '⬆';
  buttonU.id = 'mover-cima';
  buttonU.style.paddingLeft = '20px';
  buttonU.style.paddingRight = '20px';
  buttonU.style.border = 'none';
  buttonU.style.color = 'white';
  buttonU.style.backgroundColor = 'orange';
  buttonU.style.paddingTop = '7px';
  buttonU.style.paddingBottom = '7px';
  buttonU.style.borderRadius = '10px';
  buttonU.style.marginLeft = '10px';
  buttonBar.appendChild(buttonU);
}
addButtonUpp();

// Funções para apagar a Li selecionada - Criadas duas funções para reduzir a Cognitive Complexity do ESLint
function deleteLi() {
  for (let i = 0; i < listaLi.length; i += 1) {
    if (listaLi[i].style.backgroundColor !== 'white') {
      lista[0].removeChild(listaLi[i]);
      quadroCentral.style.height = `${String(quadroCentral.offsetHeight - 20)}px`;
    }
  }
}
function verificarSelecao() {
  if (liMarcada !== undefined) {
    deleteLi();
  }
}
const buttonDelete = document.getElementById('remover-selecionado');
buttonDelete.addEventListener('click', verificarSelecao);

// Função para ordenar a Li selecionada para cima
function up() {
  if (liMarcada !== undefined && liMarcada.previousElementSibling !== null) {
    const conteudoClicado = liMarcada.innerText;
    const conteudoSuperior = liMarcada.previousElementSibling.innerText;
    liMarcada.innerText = conteudoSuperior;
    liMarcada.previousElementSibling.innerText = conteudoClicado;
    liMarcada.style.backgroundColor = 'white';
    liMarcada = liMarcada.previousElementSibling;
    liMarcada.style.backgroundColor = corSeleção;
  }
}
const buttonUp = document.getElementById('mover-cima');
buttonUp.addEventListener('click', up);

// Função para ordenar a Li selecionada para cima
function down() {
  if (liMarcada !== undefined && liMarcada.nextElementSibling !== null) {
    const conteudoClicado = liMarcada.innerText;
    const conteudoInferior = liMarcada.nextElementSibling.innerText;
    liMarcada.innerText = conteudoInferior;
    liMarcada.nextElementSibling.innerText = conteudoClicado;
    liMarcada.style.backgroundColor = 'white';
    liMarcada = liMarcada.nextElementSibling;
    liMarcada.style.backgroundColor = corSeleção;
  }
}
const buttondown = document.getElementById('mover-baixo');
buttondown.addEventListener('click', down);
