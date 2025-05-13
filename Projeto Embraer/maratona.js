function updateRanking() {
    const table = document.getElementById('rankingBody');
    const rows = Array.from(table.querySelectorAll('tr'));

    // Obter dados da tabela
    const dados = rows.map(row => {
      const nome = row.cells[1].innerText;
      const baloes = parseInt(row.cells[2].querySelector('input').value);
      return { nome, baloes };
    });

    // Ordenar por balões em ordem decrescente
    dados.sort((a, b) => b.baloes - a.baloes);

    // Atualizar a tabela
    table.innerHTML = '';
    dados.forEach((grupo, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td contenteditable="true">${grupo.nome}</td>
        <td><input type="number" value="${grupo.baloes}" min="0" onchange="updateRanking()"></td>
      `;
      table.appendChild(tr);
    });
  }

  
  //adicionar balão de acordo com o valor 
  const IMG_BALAO = ' balao.png';

  function updateRanking() {
    const table = document.getElementById('rankingBody');
    const rows = Array.from(table.querySelectorAll('tr'));

    // Obter dados
    const dados = rows.map(row => {
      const nome = row.cells[1].innerText.trim();
      const qtd = parseInt(row.cells[2].querySelector('input').value) || 0;
      return { nome, qtd };
    });

    // Ordenar por balões
    dados.sort((a, b) => b.qtd - a.qtd);

    // Atualizar tabela
    table.innerHTML = '';
    dados.forEach((grupo, index) => {
      const tr = document.createElement('tr');
      const imagens = Array.from({ length: grupo.qtd }, () => `<img src="${IMG_BALAO}" class="balao" alt="Balão">`).join('');
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td contenteditable="true">${grupo.nome}</td>
        <td><input type="number" value="${grupo.qtd}" min="0" onchange="updateRanking()"></td>
        <td class="baloes-img">${imagens}</td>
      `;
      table.appendChild(tr);
    });
  }


  const horarios = [];

function addHorario(event) {
  event.preventDefault();
  const hora = parseInt(document.getElementById('hora').value);
  const minuto = parseInt(document.getElementById('minuto').value);

  if (isNaN(hora) || isNaN(minuto)) return;

  const horario = hora * 60 + minuto;
  horarios.push(horario);
  horarios.sort((a, b) => b - a); // Ordem decrescente

  renderizarHorarios();
  event.target.reset();
}

function renderizarHorarios() {
  const lista = document.getElementById('cronogramaLista');
  lista.innerHTML = '';
  horarios.forEach(minTotal => {
    const h = String(Math.floor(minTotal / 60)).padStart(2, '0');
    const m = String(minTotal % 60).padStart(2, '0');
    const li = document.createElement('li');
    li.textContent = `${h}:${m}`;
    lista.appendChild(li);
  });
}

//cronometro
let intervalo;

function iniciarCronometro() {
  clearInterval(intervalo); // Para cronômetro anterior, se houver

  const horas = parseInt(document.getElementById('h').value) || 0;
  const minutos = parseInt(document.getElementById('m').value) || 0;
  let totalSegundos = (horas * 60 + minutos) * 60;

  atualizarDisplay(totalSegundos);

  intervalo = setInterval(() => {
    totalSegundos--;
    if (totalSegundos <= 0) {
      clearInterval(intervalo);
      document.getElementById('display').textContent = '00:00:00';
      alert("Tempo encerrado!");
      return;
    }
    atualizarDisplay(totalSegundos);
  }, 1000);
}

function atualizarDisplay(segundos) {
  const h = String(Math.floor(segundos / 3600)).padStart(2, '0');
  const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
  const s = String(segundos % 60).padStart(2, '0');
  document.getElementById('display').textContent = `${h}:${m}:${s}`;
}

function atualizarDisplay(segundos) {
    const h = String(Math.floor(segundos / 3600)).padStart(2, '0');
    const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
    const s = String(segundos % 60).padStart(2, '0');
  
    // Obter o elemento de exibição
    const display = document.getElementById('display');
    
    // Atualizar texto do cronômetro
    display.textContent = `${h}:${m}:${s}`;
  
    // Lógica para mudar a cor com base no tempo restante
    if (segundos <= 60) {
      display.style.color = 'red';  // Último minuto
    } else if (segundos <= 600) {
      display.style.color = 'gold';  // Últimos 10 minutos
    } else {
      display.style.color = 'black';  // Cor padrão
    }
  }
  