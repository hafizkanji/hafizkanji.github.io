// ===== Chat Demo =====
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const quickReplies = document.getElementById('quickReplies');

const responses = {
    "schedule": "I'd be happy to help you schedule a meeting! We have the following rooms available today:\n\n- Room A (4 people) — 10:00 AM, 2:00 PM\n- Room B (8 people) — 11:00 AM, 3:00 PM\n- Board Room (20 people) — 1:00 PM\n\nWhich time works best for you?",
    "room": "Sure! Here are our conference rooms:\n\n- Room A is on the 2nd floor, left wing\n- Room B is on the 3rd floor, right wing\n- The Board Room is on the 5th floor\n\nWould you like me to send you directions or book a room?",
    "check-in": "Welcome! I'll get you checked in right away. I just need a couple of details:\n\n1. Who are you here to see?\n2. Do you have a scheduled appointment?\n\nOnce confirmed, I'll notify your host and print your visitor badge.",
    "hours": "Our office hours are Monday–Friday, 8:00 AM to 6:00 PM. The lobby is accessible 24/7 with a key card. Is there anything else I can help with?",
    "default": "Thanks for your message! As a demo, I can help with scheduling meetings, finding conference rooms, and visitor check-ins. Try asking about one of those topics, or click a quick reply below!"
};

function getResponse(message) {
    const lower = message.toLowerCase();
    if (lower.includes('schedule') || lower.includes('meeting') || lower.includes('book') || lower.includes('appointment')) {
        return responses.schedule;
    }
    if (lower.includes('room') || lower.includes('where') || lower.includes('direction') || lower.includes('find')) {
        return responses.room;
    }
    if (lower.includes('check') || lower.includes('visit') || lower.includes('see someone') || lower.includes('here to')) {
        return responses['check-in'];
    }
    if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('time')) {
        return responses.hours;
    }
    return responses.default;
}

function addMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    div.innerHTML = `
        <div class="message-avatar">${isUser ? 'You' : '◈'}</div>
        <div class="message-bubble">${text.replace(/\n/g, '<br>')}</div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'message bot-message';
    div.id = 'typingIndicator';
    div.innerHTML = `
        <div class="message-avatar">◈</div>
        <div class="message-bubble">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

function handleSend(message) {
    if (!message.trim()) return;

    addMessage(message, true);
    chatInput.value = '';

    showTyping();

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
        removeTyping();
        addMessage(getResponse(message), false);
    }, delay);
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSend(chatInput.value);
});

quickReplies.addEventListener('click', (e) => {
    const btn = e.target.closest('.quick-reply');
    if (btn) {
        handleSend(btn.dataset.message);
    }
});

// ===== Mobile Nav Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
    }
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#10b981';
    setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ===== Scroll Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .pricing-card').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
