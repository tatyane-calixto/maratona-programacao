const IMG_BALAO = 'balao.png'; // Caminho relativo ao projeto
function updateRanking() {
    const tbody = document.getElementById('rankingBody');
    const linhas = Array.from(tbody.querySelectorAll('tr'));
  
    const dados = linhas.map(linha => {
      const nome = linha.cells[1].textContent.trim();
      const pontos = parseInt(linha.cells[2].querySelector('input').value) || 0;
      return { nome, pontos };
    });
  
    dados.sort((a, b) => b.pontos - a.pontos);
  
    tbody.innerHTML = '';
    dados.forEach((grupo, index) => {
      const tr = document.createElement('tr');
  
      const tdPos = document.createElement('td');
      tdPos.textContent = index + 1;
  
      const tdNome = document.createElement('td');
      tdNome.contentEditable = true;
      tdNome.textContent = grupo.nome;
  
      const tdPontos = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 0;
      input.value = grupo.pontos;
      input.onchange = updateRanking;
      tdPontos.appendChild(input);
  
      const tdBaloes = document.createElement('td');
      for (let i = 0; i < grupo.pontos; i++) {
        const img = document.createElement('img');
        img.src = IMG_BALAO;
        img.alt = 'Balão';
        img.className = 'balao';
        tdBaloes.appendChild(img);
      }
  
      tr.appendChild(tdPos);
      tr.appendChild(tdNome);
      tr.appendChild(tdPontos);
      tr.appendChild(tdBaloes);
  
      tbody.appendChild(tr);
    });
  }

// CRONÔMETRO
let intervalo;

function iniciarCronometro() {
  clearInterval(intervalo);

  const horas = parseInt(document.getElementById('h').value) || 0;
  const minutos = parseInt(document.getElementById('m').value) || 0;
  let totalSegundos = (horas * 60 + minutos) * 60;

  atualizarDisplay(totalSegundos);

  intervalo = setInterval(() => {
    totalSegundos--;

    if (totalSegundos <= 0) {
      clearInterval(intervalo);
      atualizarDisplay(0);
      alert('Tempo encerrado!');
    } else {
      atualizarDisplay(totalSegundos);
    }
  }, 1000);
}

function atualizarDisplay(segundos) {
  const h = String(Math.floor(segundos / 3600)).padStart(2, '0');
  const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
  const s = String(segundos % 60).padStart(2, '0');

  const display = document.getElementById('display');
  display.textContent = `${h}:${m}:${s}`;

  // Mudar cor conforme o tempo restante
  if (segundos <= 60) {
    display.style.color = 'red'; // Último minuto
  } else if (segundos <= 600) {
    display.style.color = 'orange'; // Últimos 10 minutos
  } else {
    display.style.color = 'black';
  }
}
