// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Music Player
const musicToggle = document.getElementById('musicToggle');
const musicWidget = document.getElementById('musicWidget');

musicToggle.addEventListener('click', function() {
    musicWidget.classList.toggle('active');
    
    // Alterar ícone
    const icon = this.querySelector('i');
    if (musicWidget.classList.contains('active')) {
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-music');
    }
});

// Fechar music player quando clicar fora
document.addEventListener('click', function(event) {
    if (!musicToggle.contains(event.target) && !musicWidget.contains(event.target)) {
        musicWidget.classList.remove('active');
        const icon = musicToggle.querySelector('i');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-music');
    }
});

// Confirmação de Presença e Presentes
function openPresenceForm() {
    const presenceForm = document.getElementById('presenceForm');
    const giftSection = document.getElementById('giftSection');
    
    presenceForm.style.display = 'block';
    
    // Scroll para o formulário
    presenceForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function openGiftSection() {
    const giftSection = document.getElementById('gifts');
    
    // Scroll para a seção de presentes
    giftSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Modal PIX
let currentAmount = 0;

function openPixModal(amount) {
    const modal = document.getElementById('pixModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalAmount = document.getElementById('modalAmount');
    
    currentAmount = amount;
    
    // Atualizar conteúdo do modal baseado no valor
    if (amount === 0) {
        modalTitle.textContent = 'Presente Personalizado';
        modalSubtitle.textContent = 'Escolha o valor que desejar';
        modalAmount.textContent = 'Qualquer valor';
    } else {
        modalTitle.textContent = `Presente ${getCategoryName(amount)}`;
        modalSubtitle.textContent = 'Utilize o PIX abaixo';
        modalAmount.textContent = `R$ ${amount.toFixed(2)}`;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePixModal() {
    const modal = document.getElementById('pixModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function getCategoryName(amount) {
    switch(amount) {
        case 50: return 'Bronze';
        case 150: return 'Prata';
        case 200: return 'Ouro';
        default: return 'Personalizado';
    }
}

// Fechar modal clicando fora
window.addEventListener('click', function(event) {
    const modal = document.getElementById('pixModal');
    if (event.target === modal) {
        closePixModal();
    }
});

// Copiar Chave PIX
function copyPixKey() {
    const pixKey = document.getElementById('pixKey').textContent;
    
    navigator.clipboard.writeText(pixKey).then(() => {
        // Feedback visual
        const copyBtn = event.target.closest('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        // Fallback para seleção de texto
        const tempInput = document.createElement('input');
        tempInput.value = pixKey;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        const copyBtn = event.target.closest('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    });
}

// Tecla ESC para fechar modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePixModal();
    }
});

// Form Submission
document.querySelector('.rsvp-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    
    // Simulação de envio
    this.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">💚</div>
            <h3 style="color: var(--olive); margin-bottom: 1rem;">Obrigado, ${name}!</h3>
            <p>Sua confirmação foi recebida com sucesso!</p>
            <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.7;">Mal podemos esperar para celebrar com você em Marechal Deodoro!</p>
        </div>
    `;
});

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.story, .details, .gallery, .confirmation, .verse, .gifts');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Efeito Digitação no Hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Inicializar efeito de digitação
document.addEventListener('DOMContentLoaded', function() {
    const coupleNames = document.querySelector('.couple-names');
    const originalText = coupleNames.textContent;
    typeWriter(coupleNames, originalText, 150);
});

// Background Particles (Opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particles = 30;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--light-olive);
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.2};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// CSS para animação das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg); }
        50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg); }
        75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg); }
    }
`;
document.head.appendChild(style);

// Iniciar partículas
window.addEventListener('load', createParticles);

// Substituir placeholder do QR Code quando tiver a imagem real
function loadQrCode(imageUrl) {
    const qrPlaceholder = document.getElementById('qrPlaceholder');
    const qrCodeImage = document.getElementById('qrCodeImage');
    
    if (imageUrl) {
        qrCodeImage.src = imageUrl;
        qrCodeImage.style.display = 'block';
        qrPlaceholder.style.display = 'none';
    }
}

// Exemplo de como carregar o QR Code (substitua pela sua URL)
// loadQrCode('caminho/para/seu-qr-code.png');
// Variáveis globais para confirmação
let currentConfirmationType = '';
let guestName = '';

// Função para abrir formulário de nome
function confirmPresence(type) {
    currentConfirmationType = type;
    const nameForm = document.getElementById('nameForm');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    
    // Atualizar textos do formulário baseado no tipo
    if (type === 'Sim') {
        formTitle.textContent = 'Confirmar Presença';
        formSubtitle.textContent = 'Digite seu nome completo';
    } else {
        formTitle.textContent = 'Não Poderei Comparecer';
        formSubtitle.textContent = 'Digite seu nome completo';
    }
    
    nameForm.style.display = 'block';
    nameForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Limpar campo nome
    document.getElementById('guestName').value = '';
}

// Fechar formulário de nome
function closeNameForm() {
    document.getElementById('nameForm').style.display = 'none';
    currentConfirmationType = '';
    guestName = '';
}

// Enviar confirmação para WhatsApp
function sendToWhatsApp() {
    guestName = document.getElementById('guestName').value.trim();
    
    if (!guestName) {
        alert('Por favor, digite seu nome completo.');
        return;
    }
    
    // Número de WhatsApp (substitua pelo número dos noivos)
    const phoneNumber = '82987081066'; // Substitua pelo número real
    
    // Mensagem personalizada
    let message = '';
    
    if (currentConfirmationType === 'Sim') {
        message = `Olá Anny & Filipe! 😊\n\nSou *${guestName}* e gostaria de confirmar minha presença no casamento de vocês!\n\nMal posso esperar para celebrar esse momento especial! 💚`;
    } else {
        message = `Olá Anny & Filipe!\n\nSou *${guestName}* e infelizmente não poderei comparecer ao casamento de vocês.\n\nDesejo toda a felicidade do mundo! 💚`;
    }
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Criar URL do WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Fechar formulário
    closeNameForm();
    
    // Feedback visual
    showConfirmationFeedback(currentConfirmationType);
}

// Mostrar feedback de confirmação
function showConfirmationFeedback(type) {
    let feedbackMessage = '';
    
    if (type === 'Sim') {
        feedbackMessage = 'Obrigado por confirmar! 💚 Estamos ansiosos para ver você!';
    } else {
        feedbackMessage = 'Obrigado por nos avisar! 💚 Sentiremos sua falta!';
    }
    
    // Criar elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.innerHTML = `
        <div class="feedback-content">
            <i class="fas fa-check-circle"></i>
            <p>${feedbackMessage}</p>
        </div>
    `;
    
    // Adicionar ao DOM
    document.getElementById('confirmation').appendChild(feedback);
    
    // Remover após 5 segundos
    setTimeout(() => {
        feedback.remove();
    }, 5000);
}

// CSS para feedback (adicione ao style.css)
const feedbackStyle = `
.feedback-message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--olive);
    color: var(--white);
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideDown 0.3s ease;
}

.feedback-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.feedback-content i {
    font-size: 1.2rem;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}
`;

// Adicionar estilo do feedback
const styleSheet = document.createElement('style');
styleSheet.textContent = feedbackStyle;
document.head.appendChild(styleSheet);