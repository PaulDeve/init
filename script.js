// ===== PANTALLA DE BIENVENIDA =====
function initWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const flowersContainer = document.getElementById('flowersContainer');
    
    if (!welcomeScreen) return;
    
    // Crear ramo de flores
    const flowers = ['🌹', '💐', '🌺'];
    flowers.forEach(flower => {
        const flowerEl = document.createElement('div');
        flowerEl.className = 'flower';
        flowerEl.textContent = flower;
        flowersContainer.appendChild(flowerEl);
    });
    
    // Esconder la pantalla de bienvenida después de 3.5 segundos
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 800);
    }, 3500);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initWelcomeScreen);

// Si el DOM ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWelcomeScreen);
} else {
    initWelcomeScreen();
}


const card = document.querySelector('#mainCard');
const resetBtn = document.getElementById('resetBtn');
const shareBtn = document.getElementById('shareBtn');
let isFlipped = false;

if (card) {
    card.addEventListener('click', function() {
        isFlipped = !isFlipped;
        this.classList.toggle('flipped');
        if (isFlipped) {
            createConfetti();
            playSound();
        }
    });
}

// ===== BOTÓN DE REINICIO =====
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        isFlipped = false;
        if (card) card.classList.remove('flipped');
        playSound();
    });
}

// ===== BOTÓN DE COMPARTIR =====
if (shareBtn) {
    shareBtn.addEventListener('click', function() {
        const text = "¡Fany! He creado una tarjeta especial de San Valentín para ti 💕";
        if (navigator.share) {
            navigator.share({
                title: 'Tarjeta de San Valentín',
                text: text,
                url: window.location.href
            }).catch(err => console.log('Error compartiendo:', err));
        } else {
            // Fallback: copiar al portapapeles
            navigator.clipboard.writeText(text + ' ' + window.location.href)
                .then(() => {
                    alert('Enlace copiado al portapapeles');
                })
                .catch(() => {
                    alert('No se pudo compartir');
                });
        }
    });
}

// ===== CREAR PARTÍCULAS DE FONDO ===== 
function createParticles() {
    const container = document.getElementById('particlesContainer');
    
    // Función para crear una sola partícula
    function makeParticle() {
        const particle = document.createElement('div');
        
        const size = Math.random() * 12 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const colors = ['#ff6b9d', '#ff1744', '#ff5722', '#ff6e40', '#f093fb', '#00d4ff', '#00ff88', '#ffd600'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.bottom = '-30px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.boxShadow = `0 0 15px ${color}`;
        
        const duration = Math.random() * 8 + 6;
        const xOffset = (Math.random() - 0.5) * 200;
        
        particle.style.animation = `rise-up ${duration}s ease-in forwards`;
        particle.style.setProperty('--x-offset', xOffset + 'px');
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // Crear partículas iniciales
    for (let i = 0; i < 20; i++) {
        setTimeout(makeParticle, i * 200);
    }
    
    // Crear partículas continuamente
    setInterval(makeParticle, 500);
}

// ===== CREAR ESTRELLAS ===== 
function createStars() {
    const container = document.getElementById('starsContainer');
    const starCount = window.innerWidth > 768 ? 40 : 20;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 50 + '%';
        
        const delay = Math.random() * 3;
        star.style.animationDelay = delay + 's';
        
        container.appendChild(star);
    }
}

// ===== CREAR CONFETI AL VOLTEAR =====
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const confettiCount = window.innerWidth > 768 ? 100 : 70;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Posición aleatoria en la parte superior
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        
        // Tamaño más grande para mejor visibilidad
        const size = Math.random() * 12 + 6;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        const colors = ['#ff6b9d', '#ff1744', '#ff5722', '#ffd600', '#76ff03', '#00e5ff', '#e040fb', '#00d4ff'];
        const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = backgroundColor;
        
        // Rotación y duración aleatorias
        const duration = Math.random() * 3 + 2;
        const rotation = Math.random() * 720;
        const xOffset = (Math.random() - 0.5) * 400;
        
        const keyframes = `
            @keyframes confetti-fall-${i} {
                to {
                    transform: translateY(100vh) translateX(${xOffset}px) rotate(${rotation}deg) scale(0);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        confetti.style.animation = `confetti-fall-${i} ${duration}s linear`;
        confetti.style.boxShadow = `0 0 10px ${backgroundColor}`;
        
        container.appendChild(confetti);
        
        // Eliminar el confeti después de la animación
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// ===== EFECTO DE MOUSE SEGUIDOR EN EL CORAZÓN =====
const heartContainer = document.getElementById('heartContainer');

if (heartContainer) {
    document.addEventListener('mousemove', (e) => {
        if (isFlipped) return;
        
        const rect = heartContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const angle = Math.atan2(y, x) * (180 / Math.PI);
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 200) {
            heartContainer.style.transform = `rotate(${angle + 90}deg) scale(${1 + distance / 500})`;
        }
    });

    document.addEventListener('mouseleave', () => {
        heartContainer.style.transform = 'rotate(0deg) scale(1)';
    });
}

// ===== SONIDO AL VOLTEAR (WEB AUDIO API) =====
function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear dos notas para un sonido más agradable
        const now = audioContext.currentTime;
        
        // Nota 1: Do5
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        osc1.connect(gain1);
        gain1.connect(audioContext.destination);
        osc1.frequency.value = 523.25;
        osc1.type = 'sine';
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc1.start(now);
        osc1.stop(now + 0.2);
        
        // Nota 2: Mi5
        setTimeout(() => {
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            osc2.frequency.value = 659.25;
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            osc2.start(audioContext.currentTime);
            osc2.stop(audioContext.currentTime + 0.2);
        }, 100);
    } catch (e) {
        console.log('Audio no disponible');
    }
}

// ===== CREAR EFECTO DE SPARKLES EN CLICK =====
function createSparkles(x, y) {
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '12px';
        sparkle.style.height = '12px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.backgroundColor = '#ffff00';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.boxShadow = '0 0 15px #ffff00';
        
        const angle = (i / sparkleCount) * Math.PI * 2;
        const velocity = 6;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        
        let currX = x;
        let currY = y;
        
        document.body.appendChild(sparkle);
        
        let lifetime = 0;
        const maxLifetime = 0.8;
        
        const animate = () => {
            lifetime += 0.02;
            currX += vx;
            currY += vy;
            vy += 0.15; // gravedad
            
            sparkle.style.left = currX + 'px';
            sparkle.style.top = currY + 'px';
            sparkle.style.opacity = 1 - (lifetime / maxLifetime);
            
            if (lifetime < maxLifetime) {
                requestAnimationFrame(animate);
            } else {
                sparkle.remove();
            }
        };
        
        animate();
    }
}

// ===== INTERACTIVIDAD EN LA TARJETA CON SPARKLES =====
if (card) {
    card.addEventListener('click', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX || e.touches?.[0]?.clientX;
        const y = e.clientY || e.touches?.[0]?.clientY;
        if (x && y) createSparkles(x, y);
    });

    // ===== SOPORTE PARA TOUCH EN DISPOSITIVOS MÓVILES =====
    card.addEventListener('touchstart', function(e) {
        e.preventDefault();
        isFlipped = !isFlipped;
        this.classList.toggle('flipped');
        if (isFlipped) {
            createConfetti();
            playSound();
        }
        
        const touch = e.touches[0];
        createSparkles(touch.clientX, touch.clientY);
    });
}

// ===== EFECTO HOVER EN BOTONES =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        createSparkles(
            btn.getBoundingClientRect().left + btn.getBoundingClientRect().width / 2,
            btn.getBoundingClientRect().top + btn.getBoundingClientRect().height / 2
        );
    });
});

// ===== ANIMACIÓN DE ENTRADA CON SCROLL =====
function handleScroll() {
    const elements = document.querySelectorAll('.info-card');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', handleScroll);

// ===== EFECTO PARALLAX =====
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    
    const floatingHearts = document.getElementById('floatingHearts');
    if (floatingHearts && !isFlipped) {
        floatingHearts.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// ===== ANIMACIÓN DE PULSACIÓN EN CARDS DE INFORMACIÓN =====
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(255, 107, 157, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
    });
});

// ===== RESPONSIVE: AJUSTAR CANTIDAD DE PARTÍCULAS =====
window.addEventListener('resize', () => {
    // Recalcular si es necesario
});

// ===== INICIALIZAR =====
createParticles();
createStars();

// ===== EFECTO DE CARGA =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== EASTER EGG: KONAMI CODE =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            triggerEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerEasterEgg() {
    // Crear muchos corazones
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 100);
    }
    playSound();
}

// ===== DETECCIÓN DE MODO OSCURO =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
}

// ===== MONITOREAR CAMBIOS DE MODO OSCURO =====
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
    }
});

