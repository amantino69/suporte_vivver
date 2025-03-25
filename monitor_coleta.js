// Arquivo novo: monitor_coleta.js

// Função para coletar dados do Ucontact
function coletarUcontact() {
    const resultado = [];
    const linhas = document.querySelectorAll('#tablaAgentes tr');
  
    linhas.forEach(linha => {
      const colunas = linha.querySelectorAll('td');
      if (colunas.length >= 4) {
        const estado = colunas[2].innerText.trim();
        const nome = colunas[3].innerText.trim();
        if (estado && nome) {
          resultado.push({ nome, status: estado, canal: 'Ucontact' });
        }
      }
    });
  
    return resultado;
  }
  
  // Função para coletar dados do SURI
  function coletarSURI() {
    const resultado = [];
    const linhas = document.querySelectorAll('tbody[name="usersGrid"] tr');
  
    linhas.forEach(row => {
      const nome = row.querySelector('td:nth-child(2)')?.innerText.trim();
      const online = row.querySelector('td:nth-child(7) .label-online');
      if (nome && online) {
        resultado.push({ nome, status: 'Online', canal: 'SURI' });
      }
    });
  
    return resultado;
  }
  
  // Função para coletar dados do GestãoX
  function coletarGestaoX() {
    const resultado = [];
    const linhas = document.querySelectorAll('#ctl00_MainContent_gridchamados_ctl00 tr.rgRow, #ctl00_MainContent_gridchamados_ctl00 tr.rgAltRow');
  
    linhas.forEach(tr => {
      const tds = tr.querySelectorAll('td');
      if (tds.length >= 14) {
        const codigo = tds[0].innerText.trim();
        const status = tds[9].innerText.trim();
        const responsavel = tds[10].innerText.trim();
        resultado.push({ nome: responsavel, status, canal: 'GestãoX' });
      }
    });
  
    return resultado;
  }

// Função para consolidar dados de todos os canais
function exibirResumoMonitoramento() {
    const dadosUcontact = coletarUcontact();
    const dadosSURI = coletarSURI();
    const dadosGestaoX = coletarGestaoX();
  
    const todos = [...dadosUcontact, ...dadosSURI, ...dadosGestaoX];
  
    if (todos.length === 0) {
      alert("Nenhum dado foi coletado. Verifique se está na tela correta.");
      return;
    }
  
    // Criar HTML da tabela
    const linhas = todos.map(item =>
      `<tr><td>${item.nome}</td><td>${item.status}</td><td>${item.canal}</td></tr>`
    ).join('');
  
    const htmlTabela = `
      <table border="1" cellpadding="8" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
        <thead>
          <tr style="background-color: #eee;">
            <th>Nome</th>
            <th>Status</th>
            <th>Canal</th>
          </tr>
        </thead>
        <tbody>${linhas}</tbody>
      </table>
    `;
  
    // Criar o popup
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '10%';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '2px solid #444';
    popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    popup.style.zIndex = 99999;
    popup.style.maxHeight = '80%';
    popup.style.overflowY = 'auto';
    popup.style.padding = '20px';
    popup.innerHTML = `
      <h2>📊 Resumo de Monitoramento</h2>
      ${htmlTabela}
      <button style="margin-top: 10px;" onclick="this.parentNode.remove()">Fechar</button>
    `;
  
    document.body.appendChild(popup);
  }
    