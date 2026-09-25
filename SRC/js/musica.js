const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const time = document.getElementById("time");
const cover = document.getElementById("cover");
const coverImg = document.getElementById("coverImg");
const titleEl = document.getElementById("musicTitle");
const artistEl = document.getElementById("musicArtist");

const ICON_PLAY = "https://img.icons8.com/ios-filled/50/play--v1.png";
const ICON_PAUSE = "https://img.icons8.com/ios-filled/50/pause--v1.png";

// ============================================================
// 🎵 PLAYLIST — adicione quantas músicas quiser aqui embaixo
// Copie um bloco { ... } inteiro, cole abaixo e mude os dados.
// "src" é o caminho do arquivo mp3 dentro da pasta SRC/musica/
// "cover" pode ser um link de imagem (https://...) ou um caminho
// local, tipo "../img/amor-1.jpg"
// ============================================================
const playlist = [
     {
        title: "Ela So Quer Paz",
        artist: "Projota",
        src: "../musica/Paz.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VJvS_zMgRjwgjnAJ2VORaVzT9IdLRpbW4J7n2jdR5g&s=10"
    },

    {
        title: "Poesia Acústica #2",
        artist: "PineappleStormTV",
        src: "../musica/Poesia Acústica _2 - Sobre Nós - Delacruz I Maria I Ducon I Luiz Lins I Diomedes I Bk_ I Kayuá(MP3_160K).mp3",
        cover: "https://i.pinimg.com/736x/ac/33/4c/ac334c9e08ef9b3d6d012373ddd010af.jpg"
    },

     {
        title: "Preta",
        artist: "Hungria Hip Hop",
        src: "../musica/Preta.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7c9lFK3Wb5gXvfmVxghlbWvxKLSyR2sK0RgwBJ3XELQ&s=10"
    },

     {
        title: "Deixe Me-Ir",
        artist: "1 Kilo",
        src: "../musica/Deixe Me-Ir.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2737931295ff66b70ceefd61000"
    },

     {
        title: "Sofa,Breja e Netflix",
        artist: "Mc julia, Projata",
        src: "../musica/Sofa,Breja e Netflix.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273dde4aeb3936a38b6522754c2"
    },

      {
        title: "Amor e fe",
        artist: "Hungria Hip Hop",
        src: "../musica/Amor e fe.mp3",
        cover: "https://s.mxmcdn.net/images-storage/albums2/7/5/9/7/2/2/77227957_500_500.jpg"
    },

      {
        title: "Vem ca",
        artist: "Pele MIlFlows",
        src: "../musica/Vem-ca.mp3",
        cover: "https://i.scdn.co/image/ab67616d00001e023b09db5c0356ad00d2be5b90"
    },

];

let currentIndex = 0;

function loadTrack(index) {
    currentIndex = (index + playlist.length) % playlist.length;
    const track = playlist[currentIndex];

    audio.src = track.src;
    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;
    coverImg.src = track.cover;
    progress.style.width = "0%";
    time.textContent = "0:00 / 0:00";
}

function showPlayingState() {
    cover.classList.add("rotate");
    playIcon.src = ICON_PAUSE;
}

function showPausedState() {
    cover.classList.remove("rotate");
    playIcon.src = ICON_PLAY;
}

function playPause() {
    if (audio.paused) {
        audio.play();
        showPlayingState();
    } else {
        audio.pause();
        showPausedState();
    }
}

function nextTrack() {
    loadTrack(currentIndex + 1);
    audio.play().then(showPlayingState).catch(showPausedState);
}

function prevTrack() {
    loadTrack(currentIndex - 1);
    audio.play().then(showPlayingState).catch(showPausedState);
}

playBtn.onclick = playPause;
nextBtn.onclick = nextTrack;
prevBtn.onclick = prevTrack;

audio.ontimeupdate = () => {
    if (audio.duration) {
        progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    }

    let cur = Math.floor(audio.currentTime);
    let dur = Math.floor(audio.duration) || 0;

    time.textContent =
        `${Math.floor(cur/60)}:${("0"+cur%60).slice(-2)} / ${Math.floor(dur/60)}:${("0"+dur%60).slice(-2)}`;
};

// Quando uma música termina, toca a próxima automaticamente
audio.onended = () => {
    nextTrack();
};

// ============================================================
// Início automático
// Os navegadores só deixam a música iniciar sozinha com som se
// a página já teve alguma interação do usuário. Por isso: tentamos
// tocar assim que a página carrega e, se o navegador bloquear,
// a música inicia automaticamente no primeiríssimo toque/clique
// em qualquer lugar da página.
// ============================================================
loadTrack(0);

function tentarAutoplay() {
    const promessa = audio.play();
    if (promessa !== undefined) {
        promessa.then(showPlayingState).catch(() => {
            showPausedState();
            const iniciarNoToque = () => {
                audio.play();
                showPlayingState();
            };
            document.addEventListener("click", iniciarNoToque, { once: true });
            document.addEventListener("touchstart", iniciarNoToque, { once: true });
            document.addEventListener("keydown", iniciarNoToque, { once: true });
        });
    }
}

tentarAutoplay();
