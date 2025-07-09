// Quiz Data - Perguntas sobre água potável e saneamento
const quizData = [
    {
        question: "Qual é o principal objetivo da ODS 6?",
        options: [
            "Garantir disponibilidade e manejo sustentável da água e saneamento para todos",
            "Reduzir a poluição do ar nas cidades",
            "Promover energia limpa e acessível",
            "Combater as mudanças climáticas"
        ],
        correct: 0,
        explanation: "A ODS 6 tem como objetivo garantir a disponibilidade e o manejo sustentável da água e saneamento para todos até 2030."
    },
    {
        question: "Quais são os principais contaminantes encontrados em água de poços artesianos?",
        options: [
            "Apenas bactérias",
            "Coliformes fecais, metais pesados, pH inadequado e alta turbidez",
            "Somente metais pesados",
            "Apenas problemas de pH"
        ],
        correct: 1,
        explanation: "A água de poços pode conter diversos contaminantes: coliformes fecais, metais pesados, pH inadequado e alta turbidez, todos prejudiciais à saúde."
    },
    {
        question: "Qual material filtrante é mais eficaz para remover metais pesados da água?",
        options: [
            "Areia comum",
            "Carvão ativado",
            "Zeólita",
            "Terra de automassa"
        ],
        correct: 2,
        explanation: "A zeólita é um mineral natural com propriedades excepcionais de adsorção, sendo muito eficaz na remoção de metais pesados e amônia da água."
    },
    {
        question: "Qual EPI é essencial para proteger os olhos durante análises de água?",
        options: [
            "Máscara PFF2",
            "Óculos de proteção",
            "Luvas de borracha",
            "Touca descartável"
        ],
        correct: 1,
        explanation: "Os óculos de proteção são essenciais para evitar respingos de água contaminada ou reagentes químicos nos olhos durante as análises."
    },
    {
        question: "Qual é o tempo máximo recomendado para transporte de amostras de água?",
        options: [
            "2 horas",
            "4 horas",
            "6 horas",
            "8 horas"
        ],
        correct: 2,
        explanation: "O transporte de amostras deve ser feito em até 6 horas, mantendo-as refrigeradas para preservar suas características originais."
    },
    {
        question: "Qual é a função principal do carvão ativado no filtro?",
        options: [
            "Filtrar sedimentos grandes",
            "Remover metais pesados",
            "Reter impurezas orgânicas e melhorar sabor",
            "Ajustar o pH da água"
        ],
        correct: 2,
        explanation: "O carvão ativado tem alta capacidade de adsorção, sendo eficaz na remoção de impurezas orgânicas, cloro e melhoria do sabor da água."
    },
    {
        question: "Por que é importante usar EPIs durante todo o processo?",
        options: [
            "Apenas para seguir regulamentos",
            "Para proteger contra contaminação biológica e química",
            "Somente para impressionar os clientes",
            "Não é necessário usar EPIs"
        ],
        correct: 1,
        explanation: "Os EPIs são fundamentais para proteger o técnico contra contaminação por agentes biológicos, químicos e físicos presentes na água e materiais."
    },
    {
        question: "Qual é o pH ideal para água potável?",
        options: [
            "5,0 a 6,0",
            "6,0 a 9,5",
            "10,0 a 12,0",
            "3,0 a 5,0"
        ],
        correct: 1,
        explanation: "Segundo a ANVISA, o pH da água potável deve estar entre 6,0 e 9,5 para ser considerada adequada para consumo humano."
    },
    {
        question: "Qual material é usado como barreira natural final no filtro?",
        options: [
            "Areia comum",
            "Carvão ativado",
            "Zeólita",
            "Terra de automassa"
        ],
        correct: 3,
        explanation: "A terra de automassa atua como barreira natural final, proporcionando uma filtração adicional e polimento da água."
    },
    {
        question: "Qual é o principal benefício social do projeto de filtração?",
        options: [
            "Reduzir custos de energia",
            "Garantir água segura para famílias rurais",
            "Aumentar a produção agrícola",
            "Melhorar o transporte público"
        ],
        correct: 1,
        explanation: "O principal benefício é garantir acesso à água potável segura para famílias rurais, promovendo saúde, dignidade e qualidade de vida."
    }
];

// Variáveis globais do quiz
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let isQuizActive = false;

// Navegação suave
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Toggle do menu mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Highlight do menu ativo
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
});

// Função para rolar até o quiz inline
function scrollToInlineQuiz() {
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        quizSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para iniciar o quiz inline
function startInlineQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    isQuizActive = true;

    const quizIntro = document.getElementById('quiz-intro');
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result-inline');

    if (quizIntro) quizIntro.style.display = 'none';
    if (quizContent) quizContent.style.display = 'block';
    if (quizResult) quizResult.style.display = 'none';

    displayInlineQuestion();
}

// Função para exibir pergunta inline
function displayInlineQuestion() {
    const questionElement = document.getElementById('quiz-question-inline');
    const optionsElement = document.getElementById('quiz-options-inline');
    const progressElement = document.getElementById('quiz-progress-inline');
    const counterElement = document.getElementById('quiz-counter-inline');
    const nextButton = document.getElementById('quiz-next-inline');

    if (!questionElement || !optionsElement) return;

    const question = quizData[currentQuestion];
    
    questionElement.innerHTML = `<h4>Pergunta ${currentQuestion + 1}</h4><p>${question.question}</p>`;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.innerHTML = `
            <input type="radio" id="option-inline-${index}" name="quiz-option-inline" value="${index}">
            <label for="option-inline-${index}">${option}</label>
        `;
        optionsElement.appendChild(optionDiv);
    });

    // Atualizar progresso
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    if (progressElement) progressElement.style.width = `${progress}%`;
    if (counterElement) counterElement.textContent = `${currentQuestion + 1}/${quizData.length}`;

    // Event listeners para opções
    const radioButtons = optionsElement.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (nextButton) nextButton.disabled = false;
        });
    });

    if (nextButton) {
        nextButton.disabled = true;
        nextButton.textContent = currentQuestion === quizData.length - 1 ? 'Finalizar Quiz' : 'Próxima Pergunta';
    }
}

// Função para próxima pergunta inline
function nextInlineQuestion() {
    const selectedOption = document.querySelector('input[name="quiz-option-inline"]:checked');
    if (!selectedOption) return;

    const answer = parseInt(selectedOption.value);
    userAnswers.push(answer);

    if (answer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        displayInlineQuestion();
    } else {
        showInlineResult();
    }
}

// Função para mostrar resultado inline
function showInlineResult() {
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result-inline');

    if (quizContent) quizContent.style.display = 'none';
    if (quizResult) {
        quizResult.style.display = 'block';
        
        const percentage = Math.round((score / quizData.length) * 100);
        let resultClass = 'result-low';
        let resultMessage = 'Continue estudando!';
        
        if (percentage >= 80) {
            resultClass = 'result-high';
            resultMessage = 'Excelente conhecimento!';
        } else if (percentage >= 60) {
            resultClass = 'result-medium';
            resultMessage = 'Bom conhecimento!';
        }

        let resultHTML = `
            <div class="quiz-result-content ${resultClass}">
                <div class="result-header">
                    <i class="fas fa-trophy"></i>
                    <h3>Quiz Finalizado!</h3>
                </div>
                <div class="result-score">
                    <div class="score-circle">
                        <span class="score-number">${score}/${quizData.length}</span>
                        <span class="score-percentage">${percentage}%</span>
                    </div>
                    <p class="result-message">${resultMessage}</p>
                </div>
                <div class="result-details">
                    <h4>Respostas Detalhadas:</h4>
        `;

        quizData.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            resultHTML += `
                <div class="answer-review ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="question-review">
                        <strong>Pergunta ${index + 1}:</strong> ${question.question}
                    </div>
                    <div class="answer-info">
                        <div class="user-answer">
                            <i class="fas ${isCorrect ? 'fa-check' : 'fa-times'}"></i>
                            <span>Sua resposta: ${question.options[userAnswer]}</span>
                        </div>
                        ${!isCorrect ? `<div class="correct-answer">
                            <i class="fas fa-lightbulb"></i>
                            <span>Resposta correta: ${question.options[question.correct]}</span>
                        </div>` : ''}
                        <div class="explanation">
                            <i class="fas fa-info-circle"></i>
                            <span>${question.explanation}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        resultHTML += `
                </div>
                <div class="result-actions">
                    <button class="quiz-btn" onclick="restartInlineQuiz()">
                        <i class="fas fa-redo"></i>
                        Refazer Quiz
                    </button>
                    <button class="quiz-btn quiz-btn-secondary" onclick="scrollToTop()">
                        <i class="fas fa-arrow-up"></i>
                        Voltar ao Topo
                    </button>
                </div>
            </div>
        `;

        quizResult.innerHTML = resultHTML;
    }
}

// Função para reiniciar quiz inline
function restartInlineQuiz() {
    const quizIntro = document.getElementById('quiz-intro');
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result-inline');

    if (quizIntro) quizIntro.style.display = 'block';
    if (quizContent) quizContent.style.display = 'none';
    if (quizResult) quizResult.style.display = 'none';

    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    isQuizActive = false;
}

// Função para rolar para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Funções do quiz modal (mantidas para compatibilidade)
function openQuiz() {
    const modal = document.getElementById('quiz-modal');
    if (modal) {
        modal.style.display = 'flex';
        startQuiz();
    }
}

function closeQuiz() {
    const modal = document.getElementById('quiz-modal');
    if (modal) {
        modal.style.display = 'none';
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        isQuizActive = false;
    }
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    isQuizActive = true;
    displayQuestion();
}

function displayQuestion() {
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const progressElement = document.getElementById('quiz-progress');
    const counterElement = document.getElementById('quiz-counter');
    const nextButton = document.getElementById('quiz-next');
    const resultElement = document.getElementById('quiz-result');

    if (!questionElement || !optionsElement) return;

    if (resultElement) resultElement.style.display = 'none';

    const question = quizData[currentQuestion];
    
    questionElement.innerHTML = `<h4>Pergunta ${currentQuestion + 1}</h4><p>${question.question}</p>`;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.innerHTML = `
            <input type="radio" id="option-${index}" name="quiz-option" value="${index}">
            <label for="option-${index}">${option}</label>
        `;
        optionsElement.appendChild(optionDiv);
    });

    // Atualizar progresso
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    if (progressElement) progressElement.style.width = `${progress}%`;
    if (counterElement) counterElement.textContent = `${currentQuestion + 1}/${quizData.length}`;

    // Event listeners para opções
    const radioButtons = optionsElement.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (nextButton) nextButton.disabled = false;
        });
    });

    if (nextButton) {
        nextButton.disabled = true;
        nextButton.textContent = currentQuestion === quizData.length - 1 ? 'Finalizar Quiz' : 'Próxima Pergunta';
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    if (!selectedOption) return;

    const answer = parseInt(selectedOption.value);
    userAnswers.push(answer);

    if (answer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const nextButton = document.getElementById('quiz-next');
    const resultElement = document.getElementById('quiz-result');

    if (questionElement) questionElement.style.display = 'none';
    if (optionsElement) optionsElement.style.display = 'none';
    if (nextButton) nextButton.style.display = 'none';
    
    if (resultElement) {
        resultElement.style.display = 'block';
        
        const percentage = Math.round((score / quizData.length) * 100);
        let resultClass = 'result-low';
        let resultMessage = 'Continue estudando!';
        
        if (percentage >= 80) {
            resultClass = 'result-high';
            resultMessage = 'Excelente conhecimento!';
        } else if (percentage >= 60) {
            resultClass = 'result-medium';
            resultMessage = 'Bom conhecimento!';
        }

        let resultHTML = `
            <div class="quiz-result-content ${resultClass}">
                <div class="result-header">
                    <i class="fas fa-trophy"></i>
                    <h3>Quiz Finalizado!</h3>
                </div>
                <div class="result-score">
                    <div class="score-circle">
                        <span class="score-number">${score}/${quizData.length}</span>
                        <span class="score-percentage">${percentage}%</span>
                    </div>
                    <p class="result-message">${resultMessage}</p>
                </div>
                <div class="result-actions">
                    <button class="quiz-btn" onclick="startQuiz()">
                        <i class="fas fa-redo"></i>
                        Refazer Quiz
                    </button>
                    <button class="quiz-btn quiz-btn-secondary" onclick="closeQuiz()">
                        <i class="fas fa-times"></i>
                        Fechar
                    </button>
                </div>
            </div>
        `;

        resultElement.innerHTML = resultHTML;
    }
}

// Event listeners para fechar modal clicando fora
document.addEventListener('click', function(e) {
    const modal = document.getElementById('quiz-modal');
    if (modal && e.target === modal) {
        closeQuiz();
    }
});



// NR do Dia - Dados das Normas Regulamentadoras
const nrsData = [
    {
        "title": "NR-1 - DISPOSIÇÕES GERAIS E GERENCIAMENTO DE RISCOS OCUPACIONAIS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-1-nr-1"
    },
    {
        "title": "NR-2 - INSPEÇÃO PRÉVIA (REVOGADA)",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-2-nr-2"
    },
    {
        "title": "NR-3 - EMBARGO E INTERDIÇÃO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-3-nr-3"
    },
    {
        "title": "NR-4 - SERVIÇOS ESPECIALIZADOS EM SEGURANÇA E EM MEDICINA DO TRABALHO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-4-nr-4"
    },
    {
        "title": "NR-5 - COMISSÃO INTERNA DE PREVENÇÃO DE ACIDENTES E DE ASSÉDIO - CIPA",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-5-nr-5"
    },
    {
        "title": "NR-6 - EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL - EPI",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-6-nr-6"
    },
    {
        "title": "NR-7 - PROGRAMA DE CONTROLE MÉDICO DE SAÚDE OCUPACIONAL - PCMSO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-7-nr-7"
    },
    {
        "title": "NR-8 - EDIFICAÇÕES",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-8-nr-8"
    },
    {
        "title": "NR-9 - AVALIAÇÃO E CONTROLE DAS EXPOSIÇÕES OCUPACIONAIS A AGENTES FÍSICOS, QUÍMICOS E BIOLÓGICOS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-9-nr-9"
    },
    {
        "title": "NR-10 - SEGURANÇA EM INSTALAÇÕES E SERVIÇOS EM ELETRICIDADE",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10"
    },
    {
        "title": "NR-11 - TRANSPORTE, MOVIMENTAÇÃO, ARMAZENAGEM E MANUSEIO DE MATERIAIS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-11-nr-11"
    },
    {
        "title": "NR-12 - SEGURANÇA NO TRABALHO EM MÁQUINAS E EQUIPAMENTOS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-12-nr-12"
    },
    {
        "title": "NR-13 - CALDEIRAS, VASOS DE PRESSÃO E TUBULAÇÕES, E GERENCIAMENTO DE RISCOS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-13-nr-13"
    },
    {
        "title": "NR-14 - FORNOS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-14-nr-14"
    },
    {
        "title": "NR-15 - ATIVIDADES E OPERAÇÕES INSALUBRES",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-15-nr-15"
    },
    {
        "title": "NR-16 - ATIVIDADES E OPERAÇÕES PERIGOSAS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-16-nr-16"
    },
    {
        "title": "NR-17 - ERGONOMIA",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-17-nr-17"
    },
    {
        "title": "NR-18 - SEGURANÇA E SAÚDE NO TRABALHO NA INDÚSTRIA DA CONSTRUÇÃO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-18-nr-18"
    },
    {
        "title": "NR-19 - EXPLOSIVOS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-19-nr-19"
    },
    {
        "title": "NR-20 - SEGURANÇA E SAÚDE NO TRABALHO COM INFLAMÁVEIS E COMBUSTÍVEIS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-20-nr-20"
    },
    {
        "title": "NR-21 - TRABALHOS A CÉU ABERTO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-21-nr-21"
    },
    {
        "title": "NR-22 - SEGURANÇA E SAÚDE OCUPACIONAL NA MINERAÇÃO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-22-nr-22"
    },
    {
        "title": "NR-23 - PROTEÇÃO CONTRA INCÊNDIOS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-23-nr-23"
    },
    {
        "title": "NR-24 - CONDIÇÕES SANITÁRIAS E DE CONFORTO NOS LOCAIS DE TRABALHO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-24-nr-24"
    },
    {
        "title": "NR-25 - RESÍDUOS INDUSTRIAIS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-25-nr-25"
    },
    {
        "title": "NR-26 - SINALIZAÇÃO DE SEGURANÇA",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-26-nr-26"
    },
    {
        "title": "NR-27 - REGISTRO PROFISSIONAL DO TÉCNICO DE SEGURANÇA DO TRABALHO (REVOGADA)",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-27-nr-27"
    },
    {
        "title": "NR-28 - FISCALIZAÇÃO E PENALIDADES",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-28-nr-28"
    },
    {
        "title": "NR-29 - NORMA REGULAMENTADORA DE SEGURANÇA E SAÚDE NO TRABALHO PORTUÁRIO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-29-nr-29"
    },
    {
        "title": "NR-30 - SEGURANÇA E SAÚDE NO TRABALHO AQUAVIÁRIO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-30-nr-30"
    },
    {
        "title": "NR-31 - SEGURANÇA E SAÚDE NO TRABALHO NA AGRICULTURA, PECUÁRIA SILVICULTURA, EXPLORAÇÃO FLORESTAL E AQUICULTURA",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-31-nr-31"
    },
    {
        "title": "NR-32 - SEGURANÇA E SAÚDE NO TRABALHO EM SERVIÇOS DE SAÚDE",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-32-nr-32"
    },
    {
        "title": "NR-33 - SEGURANÇA E SAÚDE NOS TRABALHOS EM ESPAÇOS CONFINADOS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-33-nr-33"
    },
    {
        "title": "NR-34 - CONDIÇÕES E MEIO AMBIENTE DE TRABALHO NA INDÚSTRIA DA CONSTRUÇÃO, REPARAÇÃO E DESMONTE NAVAL",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-34-nr-34"
    },
    {
        "title": "NR-35 - TRABALHO EM ALTURA",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-35-nr-35"
    },
    {
        "title": "NR-36 - SEGURANÇA E SAÚDE NO TRABALHO EM EMPRESAS DE ABATE E PROCESSAMENTO DE CARNES E DERIVADOS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-36-nr-36"
    },
    {
        "title": "NR-37 - SEGURANÇA E SAÚDE EM PLATAFORMAS DE PETRÓLEO",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-37-nr-37"
    },
    {
        "title": "NR-38 - SEGURANÇA E SAÚDE NO TRABALHO NAS ATIVIDADES DE LIMPEZA URBANA E MANEJO DE RESÍDUOS SÓLIDOS",
        "url": "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-38-nr-38"
    }
];

// Variável para armazenar a NR atual
let currentNR = null;

// Função para sortear uma NR aleatória
function sortearNR() {
    // Seleciona uma NR aleatória
    const randomIndex = Math.floor(Math.random() * nrsData.length);
    currentNR = nrsData[randomIndex];
    
    // Extrai o número da NR do título
    const nrNumber = currentNR.title.match(/NR-(\d+)/)[0];
    
    // Verifica se é uma NR revogada
    const isRevogada = currentNR.title.includes('REVOGADA');
    
    // Atualiza a interface
    const nrIntro = document.getElementById('nr-intro');
    const nrContent = document.getElementById('nr-content');
    const nrCard = document.querySelector('.nr-card');
    
    if (nrIntro) nrIntro.style.display = 'none';
    if (nrContent) nrContent.style.display = 'block';
    
    // Atualiza o conteúdo da NR
    const nrNumberElement = document.getElementById('nr-number');
    const nrTitleElement = document.getElementById('nr-title');
    const nrLinkElement = document.getElementById('nr-link');
    const nrStatusElement = document.querySelector('.nr-status');
    
    if (nrNumberElement) nrNumberElement.textContent = nrNumber;
    if (nrTitleElement) nrTitleElement.textContent = currentNR.title;
    if (nrLinkElement) nrLinkElement.href = currentNR.url;
    
    // Atualiza o status e estilo para NRs revogadas
    if (nrCard) {
        if (isRevogada) {
            nrCard.classList.add('revogada');
            if (nrStatusElement) {
                nrStatusElement.innerHTML = '<i class="fas fa-times-circle"></i><span>Revogada</span>';
            }
        } else {
            nrCard.classList.remove('revogada');
            if (nrStatusElement) {
                nrStatusElement.innerHTML = '<i class="fas fa-check-circle"></i><span>Vigente</span>';
            }
        }
    }
    
    // Adiciona animação de entrada
    if (nrContent) {
        nrContent.style.opacity = '0';
        nrContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            nrContent.style.transition = 'all 0.5s ease';
            nrContent.style.opacity = '1';
            nrContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Rola suavemente para a seção da NR
    const nrSection = document.getElementById('nr-do-dia');
    if (nrSection) {
        nrSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Função para reiniciar a seção NR do Dia
function reiniciarNR() {
    const nrIntro = document.getElementById('nr-intro');
    const nrContent = document.getElementById('nr-content');
    
    if (nrIntro) nrIntro.style.display = 'block';
    if (nrContent) nrContent.style.display = 'none';
    
    currentNR = null;
}

// Função para rolar até a seção NR do Dia
function scrollToNRDoDia() {
    const nrSection = document.getElementById('nr-do-dia');
    if (nrSection) {
        nrSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Adiciona event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o link NR do Dia ao menu de navegação se ainda não existir
    const navMenu = document.querySelector('.nav-menu');
    const nrNavLink = document.querySelector('.nav-link[href="#nr-do-dia"]');
    
    if (navMenu && !nrNavLink) {
        const quizNavItem = document.querySelector('.nav-link[href="#quiz"]').parentElement;
        const nrNavItem = document.createElement('li');
        nrNavItem.innerHTML = '<a href="#nr-do-dia" class="nav-link nr-nav">NR do Dia</a>';
        
        // Insere após o item do quiz
        if (quizNavItem.nextSibling) {
            navMenu.insertBefore(nrNavItem, quizNavItem.nextSibling);
        } else {
            navMenu.appendChild(nrNavItem);
        }
    }
    
    // Adiciona smooth scrolling para o link NR do Dia
    const nrNavLinks = document.querySelectorAll('a[href="#nr-do-dia"]');
    nrNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToNRDoDia();
        });
    });
});

// Função para obter estatísticas das NRs
function getNRStats() {
    const vigentes = nrsData.filter(nr => !nr.title.includes('REVOGADA')).length;
    const revogadas = nrsData.filter(nr => nr.title.includes('REVOGADA')).length;
    const total = nrsData.length;
    
    return {
        total: total,
        vigentes: vigentes,
        revogadas: revogadas
    };
}

// Função para buscar NR por número
function buscarNRPorNumero(numero) {
    return nrsData.find(nr => nr.title.includes(`NR-${numero}`));
}

// Função para obter NRs por categoria (exemplo: EPIs, Segurança, etc.)
function getNRsPorCategoria() {
    const categorias = {
        'Disposições Gerais': ['NR-1', 'NR-2', 'NR-3', 'NR-28'],
        'Serviços e Comissões': ['NR-4', 'NR-5'],
        'EPIs e Medicina': ['NR-6', 'NR-7'],
        'Ambiente de Trabalho': ['NR-8', 'NR-9', 'NR-24'],
        'Segurança em Atividades': ['NR-10', 'NR-11', 'NR-12', 'NR-13', 'NR-14'],
        'Atividades Especiais': ['NR-15', 'NR-16', 'NR-17'],
        'Setores Específicos': ['NR-18', 'NR-19', 'NR-20', 'NR-21', 'NR-22'],
        'Proteção e Sinalização': ['NR-23', 'NR-25', 'NR-26'],
        'Trabalho Portuário e Aquaviário': ['NR-29', 'NR-30'],
        'Setores Rurais e Saúde': ['NR-31', 'NR-32'],
        'Trabalhos Especiais': ['NR-33', 'NR-34', 'NR-35', 'NR-36', 'NR-37', 'NR-38']
    };
    
    return categorias;
}

