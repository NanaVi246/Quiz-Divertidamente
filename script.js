document.addEventListener('DOMContentLoaded', () => {
  const perguntas = [
    { pergunta: "1. Em uma situação difícil, você tende a:", opcoes: { alegria: "Tentar ver o lado positivo.", tristeza: "Sentir vontade de chorar.", raiva: "Ficar irritado e explosivo.", medo: "Ficar paralisado pensando nos riscos.", nojo: "Rejeitar e se afastar imediatamente." } },
    { pergunta: "2. Qual dessas frases mais combina com você?", opcoes: { alegria: "Sempre tem algo bom a aprender.", tristeza: "As coisas nunca são tão boas quanto parecem.", raiva: "Se não lutar, nada muda.", medo: "É melhor não arriscar.", nojo: "Prefiro manter distância do que me desagrada." } },
    { pergunta: "3. Quando está em grupo, você geralmente:", opcoes: { alegria: "Anima todos com energia.", tristeza: "Fica quieto e reflexivo.", raiva: "Tenta liderar com firmeza.", medo: "Observa sem se expor.", nojo: "Evita pessoas que considera falsas." } },
    { pergunta: "4. Como reage a uma crítica?", opcoes: { alegria: "Leva como aprendizado.", tristeza: "Fica magoado.", raiva: "Responde na hora com força.", medo: "Prefere não se expor mais.", nojo: "Ignora e se afasta." } },
    { pergunta: "5. O que mais valoriza em amigos?", opcoes: { alegria: "Alegria e diversão.", tristeza: "Empatia e compreensão.", raiva: "Lealdade e força.", medo: "Proteção e segurança.", nojo: "Autenticidade e bom gosto." } },
    { pergunta: "6. Seu passatempo favorito seria:", opcoes: { alegria: "Sair com amigos.", tristeza: "Escrever ou ouvir músicas profundas.", raiva: "Esportes ou algo competitivo.", medo: "Jogos estratégicos.", nojo: "Artes, moda ou algo refinado." } },
    { pergunta: "7. Quando algo dá errado, você:", opcoes: { alegria: "Segue tentando com otimismo.", tristeza: "Se fecha e pensa bastante.", raiva: "Explode e tenta resolver na força.", medo: "Analisa muito antes de tentar de novo.", nojo: "Se afasta e procura algo melhor." } },
    { pergunta: "8. Em um desafio, você é mais:", opcoes: { alegria: "Confiante.", tristeza: "Inseguro.", raiva: "Determinado e explosivo.", medo: "Cauteloso.", nojo: "Crítico." } },
    { pergunta: "9. O que mais te motiva?", opcoes: { alegria: "Buscar felicidade.", tristeza: "Expressar sentimentos.", raiva: "Superar limites.", medo: "Manter-se seguro.", nojo: "Evitar o que não gosta." } },
    { pergunta: "10. Qual destas palavras mais te define?", opcoes: { alegria: "Esperança.", tristeza: "Sensibilidade.", raiva: "Coragem.", medo: "Prudência.", nojo: "Exigência." } }
  ];

  const mensagens = {
    alegria: "Você é guiado pela ALEGRIA ✨! Sua energia positiva inspira e aumenta a resiliência.",
    tristeza: "A TRISTEZA 💙 traz profundidade e empatia — você sente e acolhe emoções.",
    raiva: "A RAIVA 🔥, quando bem canalizada, vira coragem para mudanças e justiça.",
    medo: "O MEDO 😨 indica cautela e planejamento — você reduz riscos com estratégia.",
    nojo: "O NOJO 😒 mostra senso crítico e seletivo — você valoriza autenticidade."
  };

  const imagens = {
    alegria: "Alegria.jpg",
    tristeza: "Tristeza.jpg",
    raiva: "Raiva.jpg",
    medo: "Medo.jpg",
    nojo: "Nojo.jpg"
  };

  let indiceAtual = 0;
  let selecionada = null;
  const pontuacao = { alegria:0, tristeza:0, raiva:0, medo:0, nojo:0 };

  const progressoEl = document.getElementById('progresso');
  const perguntaEl = document.getElementById('pergunta');
  const opcoesEl = document.getElementById('opcoes');
  const btnProxima = document.getElementById('btnProxima');
  const btnReiniciarTopo = document.getElementById('btnReiniciarTopo');
  const resultadoEl = document.getElementById('resultado');
  const quizWrap = document.getElementById('quiz');

  function atualizarProgresso() {
    progressoEl.textContent = `Pergunta ${indiceAtual+1} de ${perguntas.length}`;
  }

  function mostrarPergunta() {
    atualizarProgresso();
    selecionada = null;
    btnProxima.disabled = true;
    btnReiniciarTopo.style.display = indiceAtual>0 ? 'inline-block' : 'none';

    const q = perguntas[indiceAtual];
    perguntaEl.textContent = q.pergunta;
    opcoesEl.innerHTML = '';

    Object.keys(q.opcoes).forEach(emo => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opcao';
      btn.dataset.emo = emo;
      btn.textContent = q.opcoes[emo];
      btn.addEventListener('click', () => selecionar(btn));
      opcoesEl.appendChild(btn);
    });
  }

  function selecionar(btn) {
    [...opcoesEl.children].forEach(el => el.classList.remove('selecionada'));
    btn.classList.add('selecionada');
    selecionada = btn.dataset.emo;
    btnProxima.disabled = false;
  }

  btnProxima.addEventListener('click', () => {
    if(!selecionada) return;
    pontuacao[selecionada]++;
    indiceAtual++;
    if(indiceAtual < perguntas.length) {
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  });

  btnReiniciarTopo.addEventListener('click', reiniciarQuiz);

  function mostrarResultado() {
    quizWrap.style.display = 'none';
    resultadoEl.style.display = 'block';

    const emocaoFinal = Object.keys(pontuacao).reduce((a,b)=> pontuacao[a] >= pontuacao[b] ? a : b);
    const badgeClasse = emocaoFinal;

    resultadoEl.innerHTML = `
      <div class="badge ${badgeClasse}">${emocaoFinal.toUpperCase()}</div>
      <h2>Resultado: ${emocaoFinal.toUpperCase()}</h2>
      <p>${mensagens[emocaoFinal]}</p>
      <img src="${imagens[emocaoFinal]}" alt="${emocaoFinal}">
      <div style="margin-top:12px">Pontuações: 
        <small>
          Alegria ${pontuacao.alegria} · Tristeza ${pontuacao.tristeza} · Raiva ${pontuacao.raiva} · Medo ${pontuacao.medo} · Nojo ${pontuacao.nojo}
        </small>
      </div>
      <div class="actions" style="margin-top:16px">
        <button class="primary" onclick="location.reload()">Reiniciar</button>
      </div>
    `;
  }

  function reiniciarQuiz() {
    indiceAtual = 0;
    selecionada = null;
    Object.keys(pontuacao).forEach(k => pontuacao[k]=0);
    quizWrap.style.display = 'block';
    resultadoEl.style.display = 'none';
    mostrarPergunta();
  }

  mostrarPergunta();
});
