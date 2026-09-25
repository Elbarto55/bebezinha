function createStarfield() {
    const container = document.body;
    const starCount = 150; // Quantidade de estrelas fixas/piscantes

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        star.style.left = x + 'vw';
        star.style.top = y + 'vh';
        
        const size = Math.random() * 2 + 0.5;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Cores aleatórias para as estrelas
        const colors = ['#ffffff', '#e0f7fa', '#fff9c4', '#fce4ec'];
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        star.style.opacity = Math.random();
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(star);
    }
}

function createMeteor() {
    const container = document.body;
    const meteor = document.createElement('span');
    meteor.classList.add('meteor');
    
    // Início aleatório (geralmente do topo ou direita)
    let x = Math.random() * window.innerWidth + 200;
    let y = Math.random() * window.innerHeight / 2 - 100;
    
    meteor.style.left = x + 'px';
    meteor.style.top = y + 'px';
    
    let duration = Math.random() * 1 + 0.5; // Mais rápido
    meteor.style.animationDuration = duration + 's';
    
    container.appendChild(meteor);
    
    setTimeout(() => {
        meteor.remove();
    }, duration * 1000);
}

// Inicia o campo de estrelas e os meteoros
createStarfield();
setInterval(createMeteor, 400); // Meteoros muito mais frequentes (a cada 0.4s)
