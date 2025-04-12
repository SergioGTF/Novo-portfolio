document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => preloader.style.display = 'none'
        });
    });

    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .icone, .nav-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.backgroundColor = 'rgba(67, 97, 238, 0.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    const typingElement = document.querySelector('.typing-animation');
    const professions = ['Desenvolvedor Full-stack.', 'Engenheiro de Computação.', 'Desenvolvedor de jogos.', 'Mesa Tenista.'];
    let currentProfession = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = professions[currentProfession];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentProfession = (currentProfession + 1) % professions.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, isDeleting ? 50 : 100);
        }
    }
    
    if (typingElement) {
        setTimeout(typeWriter, 1000);
    }

    document.getElementById('current-year').textContent = new Date().getFullYear();

    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const links = document.querySelectorAll('.nav-link');
    const conteudo = document.getElementById('conteudo');
    
    function carregarPagina(page) {
        gsap.to(conteudo, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                fetch(page)
                    .then(response => response.text())
                    .then(data => {
                        conteudo.innerHTML = data;
                        gsap.to(conteudo, {
                            opacity: 1,
                            duration: 0.5
                        });
                        
                        document.querySelectorAll('section').forEach((section, index) => {
                            gsap.from(section, {
                                opacity: 0,
                                y: 50,
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: "power2.out"
                            });
                        });
                    })
                    .catch(error => {
                        console.error('Erro ao carregar a página:', error);
                        conteudo.innerHTML = '<p class="error-message">Desculpe, não foi possível carregar o conteúdo.</p>';
                        gsap.to(conteudo, {
                            opacity: 1,
                            duration: 0.5
                        });
                    });
            }
        });
    }
    
    carregarPagina('Sobre.html');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            carregarPagina(page);
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    document.getElementById('form-contato').addEventListener('submit', function(event) {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
    
        if (!nome || !email || !mensagem) {
            event.preventDefault();
            alert('Por favor, preencha todos os campos.');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            event.preventDefault();
            alert('Por favor, insira um e-mail válido.');
        }
    });
});