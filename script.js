document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    const conteudo = document.getElementById('conteudo');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            fetch(page)
                .then(response => response.text())
                .then(data => {
                    conteudo.innerHTML = data;
                });
        });
    });
});