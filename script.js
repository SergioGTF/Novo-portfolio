document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    const conteudo = document.getElementById('conteudo');

    function carregarPagina(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                conteudo.innerHTML = data;
            })
            .catch(error => {
                console.error('Erro ao carregar a página:', error);
                conteudo.innerHTML = '<p>Desculpe, não foi possível carregar a página.</p>';
            });
    }

    carregarPagina('Sobre.html');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            carregarPagina(page);
        });
    });
});