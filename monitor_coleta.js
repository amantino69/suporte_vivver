// monitor_coleta.js

function coletarGestaoX() {
  const dados = [];
  const linhas = document.querySelectorAll('#ctl00_MainContent_gridchamados_ctl00 tr.rgRow, #ctl00_MainContent_gridchamados_ctl00 tr.rgAltRow');
  linhas.forEach(tr => {
    const tds = tr.querySelectorAll('td');
    if (tds.length >= 14) {
      const codigo = tds[0]?.innerText.trim();
      const status = tds[9]?.innerText.trim();
      const responsavel = tds[10]?.innerText.trim();
      const servico = tds[13]?.innerText.trim();
      if (codigo && status && responsavel && servico) {
        dados.push({ codigo, status, nome: responsavel, servico, canal: 'GestãoX' });
      }
    }
  });
  return dados;
}

function coletarSURI() {
  const dados = [];
  document.querySelectorAll('tbody[name="usersGrid"] tr').forEach(row => {
    const nameTd = row.querySelector('td:nth-child(2)');
    const onlineTd = row.querySelector('td:nth-child(7) .label-online');
    if (onlineTd && nameTd) {
      const nome = nameTd.innerText.trim();
      dados.push({ codigo: '-', status: 'Online', nome, servico: '-', canal: 'SURI' });
    }
  });
  return dados;
}

function coletarUcontact() {
  const dados = [];
  const linhas = document.querySelectorAll('#tablaAgentes tr');
  linhas.forEach(linha => {
    const colunas = linha.querySelectorAll('td');
    if (colunas.length >= 4) {
      const estado = colunas[2].innerText.trim();
      const nome = colunas[3].innerText.trim();
      if (estado && nome) {
        dados.push({ codigo: '-', status: estado, nome, servico: '-', canal: 'Ucontact' });
      }
    }
  });
  return dados;
}

function exibirResumoMonitoramento() {
  const dadosGestaoX = coletarGestaoX();
  const dadosSURI = coletarSURI();
  const dadosUcontact = coletarUcontact();
  const todos = [...dadosGestaoX, ...dadosSURI, ...dadosUcontact];

  let conteudo = 'Resumo de Monitoramento\nCódigo\tStatus\tResp.\tServiço\tCanal\n';
  todos.forEach(item => {
    conteudo += `${item.codigo}\t${item.status}\t${item.nome}\t${item.servico}\t${item.canal}\n`;
  });

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
  popup.style.fontFamily = 'monospace';
  popup.style.fontSize = '14px';
  popup.style.whiteSpace = 'pre';
  popup.innerHTML = '<h3>Resumo de Monitoramento</h3><pre>' + conteudo + '</pre>';

  const fechar = document.createElement('button');
  fechar.innerText = 'Fechar';
  fechar.style.marginTop = '10px';
  fechar.onclick = () => document.body.removeChild(popup);
  popup.appendChild(fechar);

  document.body.appendChild(popup);
}

exibirResumoMonitoramento();
