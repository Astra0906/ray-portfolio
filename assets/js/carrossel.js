function carrosselInit() {
    const botaoAnterior = "[data-botao-anterior]";
    const botaoProximo = "[data-botao-proximo]";
    const listaProjetos = "[data-carrossel]";
    const navegacao = "[data-navegacao]";
    const titulo = "[data-projeto='titulo']";
    const link = "[data-projeto='link']";
    const detalhes = "[data-projeto='detalhes']";
    const techs = "[data-projeto='techs']";
    const botaoVisitar = "[data-botao='visitar']";
    const botaoRepositorio = "[data-botao='repositorio']";

    const dados = {
        projetos: [{
                titulo: "Study planner",
                link: "https://www.notion.so/Ray-s-dashboard-basic-ec9185a6b9cb4701998dd36ad2f57f9c",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["CSS3", "JavaScript", "Figma"],
            },
            {
                titulo: "Portfolio website",
                link: "https://astra0906.github.io/",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript", "React", "Figma"],
            },
            {
                titulo: "Knowledge geeks",
                link: "https://knowledgegeeks2020.blogspot.com/",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript", "Figma"],
            },
            {
                titulo: "Fitness blog",
                link: "https://health-saathi.blogspot.com/",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript"],
            },
            {
                titulo: "Aesthetic notion template",
                link: "https://www.notion.so/83789622b2fc442d98b4120b8aea15a1",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript", "Sass", "Figma"],
            },
            {
                titulo: "Digital arts",
                link: "https://www.instagram.com/the_aesthetic.ai/",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript", "Figma"],
            },
            {
                titulo: "Digital product seller",
                link: "https://6735683096285.gumroad.com/l/xciux",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML", "CSS3", "JavaScript"],
            },
            {
                titulo: "Personal Blog",
                link: "https://indie-ideas.blogspot.com/",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML5", "CSS3", "JavaScript"],
            },
            {
                titulo: "Insta downloader tool",
                link: "https://igsaver4k.blogspot.com/",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML5"],
            },
            {
                titulo: "Youtube channel",
                link: "https://www.youtube.com/@astraasraful2359",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML5", "CSS3"],
            },
            {
                titulo: "Content creator",
                link: "https://www.instagram.com/r_a_y_0906/",
                repositorio: "https://github.com/Astra0906",
                detalhes: "",
                techs: ["HTML5", "CSS3"],
            },

            /*
            {
              titulo: "Pet Planet | Usuário",
              link: "https://petplanet.netlify.app/07-user-page.html/",
              repositorio: "https://github.com/gc-barros/pet-planet",
              detalhes:
                "Páginas internas da clínica Pet Planet, para as quais os usuários seriam direcionados após o login e cadastro, com acesso a telas navegáveis de início, produtos, serviços e agenda (back-end não integrado).",
              techs: ["HTML5", "CSS3", "JavaScript", "Figma"],
            },
            */
        ],
    };

    let carrossel = new Carousel(
        botaoAnterior,
        botaoProximo,
        listaProjetos,
        navegacao,
        titulo,
        link,
        detalhes,
        techs,
        dados,
        botaoVisitar,
        botaoRepositorio
    );

    carrossel.preparaSlides();
}

export default carrosselInit;

class Carousel {
    constructor(
        anterior,
        proximo,
        listaProdutos,
        navegacao,
        titulo,
        link,
        detalhes,
        techs,
        dados,
        botaoVisitar,
        botaoRepositorio
    ) {
        this.anterior = document.querySelector(anterior);
        this.proximo = document.querySelector(proximo);
        this.listaProdutos = document.querySelector(listaProdutos);
        this.navegacao = document.querySelector(navegacao);

        this.titulo = document.querySelector(titulo);
        this.link = document.querySelector(link);
        this.detalhes = document.querySelector(detalhes);
        this.techs = document.querySelector(techs);
        this.dados = dados;

        this.botaoVisitar = document.querySelector(botaoVisitar);
        this.botaoRepositorio = document.querySelector(botaoRepositorio);

        this.slides = this.getListaSlides();
        this.indicadores = this.getListaIndicadores();
        this.tamanhoSlide = this.getTamanhoSlide();

        this.indiceDoSlideAtual = 0;

        this.proximo.addEventListener("click", this.proximoSlide.bind(this));
        this.anterior.addEventListener("click", this.slideAnterior.bind(this));

        this.navegacao.addEventListener("click", this.pularParaSlide.bind(this));

        this.preparaSlides();
        this.renderizarDescricao();
    }

    getListaSlides() {
        return Array.from(this.listaProdutos.children);
    }

    getListaIndicadores() {
        return Array.from(this.navegacao.children);
    }

    getTamanhoSlide() {
        return this.slides[0].offsetWidth !== 0 ?
            this.slides[0].offsetWidth :
            this.slides[0].getBoundingClientRect().width;
    }

    getSlideAtual() {
        return this.slides[this.indiceDoSlideAtual];
    }

    proximoSlide() {
        let proximaPosicao = this.indiceDoSlideAtual + 1;
        if (proximaPosicao > this.slides.length - 1) {
            proximaPosicao = 0;
        }

        this.vaParaSlide(proximaPosicao);
    }

    slideAnterior() {
        let posicaoAnterior = this.indiceDoSlideAtual - 1;
        if (posicaoAnterior < 0) {
            posicaoAnterior = this.slides.length - 1;
        }

        this.vaParaSlide(posicaoAnterior);
    }

    getIndiceAtual() {
        return this.indicadores[this.indiceDoSlideAtual];
    }

    vaParaSlide(posicao) {
        const indicadorAtual = this.getIndiceAtual();
        this.indiceDoSlideAtual = posicao;
        const indicadorSelecionado = this.getIndiceAtual();

        this.scrollParaSlide(this.getSlideAtual());
        this.atualizaIndicadores(indicadorAtual, indicadorSelecionado);

        this.renderizarDescricao();
    }

    scrollParaSlide(slideSelecionado) {
        this.listaProdutos.style.transform =
            "translateX(-" + slideSelecionado.style.left + ")";
    }

    atualizaIndicadores(indicadorAtual, indicadorSelecionado) {
        indicadorAtual.classList.remove("carousel__indicador--ativo");
        indicadorSelecionado.classList.add("carousel__indicador--ativo");
    }

    pularParaSlide(evento) {
        if (evento.target === evento.currentTarget) return;

        const indicadorSelecionado = evento.target.getAttribute("data-indicador");
        this.vaParaSlide(parseInt(indicadorSelecionado));
    }

    preparaSlides() {
        if (this.tamanhoSlide != 0) {
            this.slides.forEach((slide, i) => {
                slide.style.left = this.tamanhoSlide * i + "px";
            });
        } else {
            this.tamanhoSlide = this.getTamanhoSlide();
            this.preparaSlides();
        }
    }

    renderizarDescricao() {
        let i = this.indiceDoSlideAtual;
        let linkProjeto = this.dados.projetos[i].link;
        let linkRepositorio = this.dados.projetos[i].repositorio;

        this.titulo.innerText = this.dados.projetos[i].titulo;
        this.link.innerText = linkProjeto;
        this.link.setAttribute("href", linkProjeto);
        this.detalhes.innerText = this.dados.projetos[i].detalhes;

        this.carregarTechs(this.techs, i);

        this.botaoVisitar.setAttribute(
            "onclick",
            `window.open('${linkProjeto}', '_blank');`
        );
        this.botaoRepositorio.setAttribute(
            "onclick",
            `window.open('${linkRepositorio}', '_blank');`
        );
    }

    carregarTechs(techs, i) {
        // Techs do projeto atual
        const techsProject = this.dados.projetos[i].techs;
        // Todas as techs
        const techCollection = techs.children;
        const techList = [...techCollection];

        techList.forEach((tech) => {
            const techTitle = tech.getAttribute('title');
            tech.classList.add("projetos__techs--disabled");

            if (techsProject.includes(techTitle)) {
                tech.classList.remove("projetos__techs--disabled");
            }
        });

    }
}
