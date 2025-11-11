const imagens = [
  "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg",
  "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg",
  "img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg"
];

let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;

const tabuleiro = document.getElementById("tabuleiro");
const botaoReiniciar = document.getElementById("reiniciar");

function criarBaralho() {
  // Duplicar imagens para formar pares
  cartas = [...imagens, ...imagens]
    .sort(() => Math.random() - 0.5) // embaralha
    .map((img, index) => ({ id: index, img, virada: false, combinada: false }));
}

function renderizarCartas() {
  tabuleiro.innerHTML = "";
  cartas.forEach(carta => {
    const div = document.createElement("div");
    div.classList.add("carta");
    if (carta.virada) div.classList.add("virada");
    div.dataset.id = carta.id;

    div.innerHTML = `
      <div class="face frente"><img src="imagens/${carta.img}" width="150" height="150" style="border-radius:10px"></div>
      <div class="face verso"></div>
    `;

    div.addEventListener("click", () => virarCarta(carta.id));
    tabuleiro.appendChild(div);
  });
}

function virarCarta(id) {
  if (bloqueado) return;
  const carta = cartas.find(c => c.id === id);
  if (carta.virada || carta.combinada) return;

  carta.virada = true;
  renderizarCartas();

  if (!primeiraCarta) {
    primeiraCarta = carta;
  } else if (!segundaCarta) {
    segundaCarta = carta;
    verificarPar();
  }
}

function verificarPar() {
  bloqueado = true;
  if (primeiraCarta.img === segundaCarta.img) {
    primeiraCarta.combinada = true;
    segundaCarta.combinada = true;
    resetarSelecao();
  } else {
    setTimeout(() => {
      primeiraCarta.virada = false;
      segundaCarta.virada = false;
      resetarSelecao();
    }, 1000);
  }
}

function resetarSelecao() {
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
  renderizarCartas();

  if (cartas.every(c => c.combinada)) {
    setTimeout(() => alert("🎉 Parabéns! Você completou o jogo!"), 300);
  }
}

botaoReiniciar.addEventListener("click", iniciarJogo);

function iniciarJogo() {
  criarBaralho();
  renderizarCartas();
}

iniciarJogo();
