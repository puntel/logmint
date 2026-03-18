export type QuestionOption = {
  id: string;
  label: string;
};

export type LessonQuestion = {
  type: 'multiple-choice' | 'true-false' | 'fill-in-the-blank' | 'ordering' | 'matching' | 'simulation';
  text: string;
  code?: string;
  options: QuestionOption[];
  correct: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  description?: string;
  question: LessonQuestion;
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Level = {
  id: string;
  title: string;
  description: string;
  units: Unit[];
};

export type Curriculum = {
  levels: Level[];
};

export const curriculum: Curriculum = {
  levels: [
    {
      id: 'level-1',
      title: 'Nível Iniciante',
      description: 'Introdução aos conceitos básicos da lógica de programação.',
      units: [
        {
          id: 'unit-1',
          title: 'Algoritmos e Sequências Lógicas',
          description: 'Entenda o que é um algoritmo e como montar sequências lógicas.',
          lessons: [
            {
              id: 'lesson-1-1',
              title: 'Ordenando passos de algoritmo',
              description: 'Organize as etapas de uma receita simples para formar um algoritmo.',
              question: {
                type: 'ordering',
                text: 'Ordene os passos para fazer um copo de água com açúcar.',
                options: [
                  { id: 'a', label: 'Misturar o açúcar na água.' },
                  { id: 'b', label: 'Colocar água no copo.' },
                  { id: 'c', label: 'Mexer até dissolver.' },
                  { id: 'd', label: 'Adicionar o açúcar.' },
                ],
                correct: 'b,a,d,c',
                explanation: 'A sequência correta é: colocar água, adicionar açúcar, mexer até dissolver.',
              },
            },
          ],
        },
        {
          id: 'unit-2',
          title: 'Variáveis e Tipos de Dados',
          description: 'Aprenda o conceito de variável e os principais tipos de dados.',
          lessons: [
            {
              id: 'lesson-1-2',
              title: 'Identificando tipos de dados',
              description: 'Associe os valores ao tipo de dado correto.',
              question: {
                type: 'matching',
                text: 'Relacione cada valor ao tipo de dado mais adequado.',
                options: [
                  { id: 'a', label: '42' },
                  { id: 'b', label: '3.14' },
                  { id: 'c', label: '"Olá"' },
                  { id: 'd', label: 'true' },
                ],
                correct: 'a:inteiro,b:real,c:caractere,d:logico',
                explanation: 'Números sem vírgula são inteiros, com vírgula são reais, texto é caractere e true/false é lógico.',
              },
            },
          ],
        },
        {
          id: 'unit-3',
          title: 'Entrada e Saída de Dados',
          description: 'Entenda como ler e exibir informações em um programa.',
          lessons: [
            {
              id: 'lesson-1-3',
              title: 'Leitura e escrita simples',
              description: 'Simule a leitura de dados e a exibição de resultados.',
              question: {
                type: 'multiple-choice',
                text: 'Qual comando usamos para exibir uma mensagem na tela em muitas linguagens?',
                options: [
                  { id: 'a', label: 'imprimir()' },
                  { id: 'b', label: 'ler()' },
                  { id: 'c', label: 'enviar()' },
                  { id: 'd', label: 'entrada()' },
                ],
                correct: 'a',
                explanation: 'Geralmente usamos um comando como imprimir() ou print() para exibir saída.',
              },
            },
          ],
        },
        {
          id: 'unit-4',
          title: 'Operadores Aritméticos e Expressões',
          description: 'Aprenda operações matemáticas básicas e precedência.',
          lessons: [
            {
              id: 'lesson-1-4',
              title: 'Calculando expressões',
              description: 'Identifique o resultado de uma expressão simples.',
              question: {
                type: 'multiple-choice',
                text: 'Qual o resultado de: 5 + 3 * 2?',
                code: 'x = 5 + 3 * 2',
                options: [
                  { id: 'a', label: '16' },
                  { id: 'b', label: '11' },
                  { id: 'c', label: '13' },
                  { id: 'd', label: '10' },
                ],
                correct: 'b',
                explanation: 'A multiplicação tem precedência: 3*2=6, então 5+6=11.',
              },
            },
          ],
        },
        {
          id: 'unit-5',
          title: 'Estruturas Condicionais Simples',
          description: 'Use condições para tomar decisões no código.',
          lessons: [
            {
              id: 'lesson-1-5',
              title: 'If / Else básico',
              description: 'Complete a condição para imprimir “Aprovado”.',
              question: {
                type: 'fill-in-the-blank',
                text: 'Complete a condição do se para que a mensagem “Aprovado” seja exibida apenas se a nota for maior ou igual a 7.',
                code: 'se (nota ____ 7) {\n    escrever("Aprovado")\n}',
                options: [
                  { id: 'a', label: '==' },
                  { id: 'b', label: '>=' },
                  { id: 'c', label: '<' },
                  { id: 'd', label: '!=' },
                ],
                correct: 'b',
                explanation: 'A condição correta para verificar se a nota é maior ou igual a 7 é >=.',
              },
            },
          ],
        },
        {
          id: 'unit-6',
          title: 'Laços de Repetição (Loopings)',
          description: 'Entenda como repetir tarefas usando loops.',
          lessons: [
            {
              id: 'lesson-1-6',
              title: 'Quantas vezes o laço executa?',
              description: 'Determine quantas vezes o laço será executado.',
              question: {
                type: 'multiple-choice',
                text: 'Quantas vezes o laço abaixo executa?\nwhile (i < 3) { i = i + 1; }',
                options: [
                  { id: 'a', label: '2 vezes' },
                  { id: 'b', label: '3 vezes' },
                  { id: 'c', label: '4 vezes' },
                  { id: 'd', label: 'Infinito' },
                ],
                correct: 'b',
                explanation: 'i começa em 0 (assumindo) e incrementa até 3 (não incluso), executando 3 vezes.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'level-2',
      title: 'Nível Intermediário',
      description: 'Aprofundamento em estruturas de dados e lógica mais elaborada.',
      units: [
        {
          id: 'unit-7',
          title: 'Vetores (Arrays)',
          description: 'Trabalhe com listas e índices para acessar elementos.',
          lessons: [
            {
              id: 'lesson-2-7',
              title: 'Qual elemento está na posição 2?',
              description: 'Identifique o valor de um array em uma posição específica.',
              question: {
                type: 'multiple-choice',
                text: 'Dado o vetor [3, 7, 9, 2], qual valor está na posição 2 (considerando índice 0)?',
                options: [
                  { id: 'a', label: '3' },
                  { id: 'b', label: '7' },
                  { id: 'c', label: '9' },
                  { id: 'd', label: '2' },
                ],
                correct: 'c',
                explanation: 'Posição 0=3, 1=7, 2=9.',
              },
            },
          ],
        },
        {
          id: 'unit-8',
          title: 'Matrizes',
          description: 'Use arrays bidimensionais para armazenar tabelas.',
          lessons: [
            {
              id: 'lesson-2-8',
              title: 'Soma de elementos de matriz',
              description: 'Encontre a soma de uma linha ou coluna simples.',
              question: {
                type: 'multiple-choice',
                text: 'Em uma matriz 2x2 [[1,2],[3,4]], qual a soma de todos os elementos?',
                options: [
                  { id: 'a', label: '8' },
                  { id: 'b', label: '10' },
                  { id: 'c', label: '9' },
                  { id: 'd', label: '7' },
                ],
                correct: 'b',
                explanation: '1+2+3+4 = 10.',
              },
            },
          ],
        },
        {
          id: 'unit-9',
          title: 'Funções e Procedimentos',
          description: 'Defina e chame funções com parâmetros e retorno.',
          lessons: [
            {
              id: 'lesson-2-9',
              title: 'Saída de função',
              description: 'Determine o valor retornado por uma função simples.',
              question: {
                type: 'multiple-choice',
                text: 'Qual o valor retornado por f(2) se f(x) = x * 2 + 1?',
                options: [
                  { id: 'a', label: '4' },
                  { id: 'b', label: '5' },
                  { id: 'c', label: '6' },
                  { id: 'd', label: '3' },
                ],
                correct: 'b',
                explanation: 'f(2) = 2*2 + 1 = 5.',
              },
            },
          ],
        },
        {
          id: 'unit-10',
          title: 'Lógica Booleana e Expressões Complexas',
          description: 'Use operadores lógicos para combinar condições.',
          lessons: [
            {
              id: 'lesson-2-10',
              title: 'Tabela verdade simples',
              description: 'Entenda o resultado de uma expressão lógica.',
              question: {
                type: 'true-false',
                text: 'A expressão (verdadeiro E falso) é verdadeira?',
                options: [
                  { id: 'a', label: 'Verdadeiro' },
                  { id: 'b', label: 'Falso' },
                ],
                correct: 'b',
                explanation: 'AND (E) só é verdadeiro se ambas as partes forem verdadeiras.',
              },
            },
          ],
        },
        {
          id: 'unit-11',
          title: 'Introdução à Recursão',
          description: 'Entenda funções que chamam a si mesmas.',
          lessons: [
            {
              id: 'lesson-2-11',
              title: 'Recursão simples (fatorial)',
              description: 'Preveja o resultado de uma chamada recursiva simples.',
              question: {
                type: 'multiple-choice',
                text: 'O valor de f(3) se f(n) = n * f(n-1) e f(1) = 1?',
                options: [
                  { id: 'a', label: '3' },
                  { id: 'b', label: '6' },
                  { id: 'c', label: '9' },
                  { id: 'd', label: '1' },
                ],
                correct: 'b',
                explanation: '3 * 2 * 1 = 6.',
              },
            },
          ],
        },
        {
          id: 'unit-12',
          title: 'Noções de Complexidade de Algoritmos',
          description: 'Compare eficiência de diferentes algoritmos.',
          lessons: [
            {
              id: 'lesson-2-12',
              title: 'Busca linear vs binária',
              description: 'Qual algoritmo é mais eficiente em um array ordenado?',
              question: {
                type: 'multiple-choice',
                text: 'Para um array ordenado, qual busca tende a ser mais rápida em grandes volumes?',
                options: [
                  { id: 'a', label: 'Busca linear' },
                  { id: 'b', label: 'Busca binária' },
                  { id: 'c', label: 'Ambas são iguais' },
                  { id: 'd', label: 'Depende apenas do valor' },
                ],
                correct: 'b',
                explanation: 'Busca binária reduz o espaço pela metade a cada passo, sendo mais eficiente em grandes volumes.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'level-3',
      title: 'Nível Avançado',
      description: 'Algoritmos clássicos e estruturas de dados mais complexas.',
      units: [
        {
          id: 'unit-13',
          title: 'Algoritmos de Ordenação',
          description: 'Veja como diferentes algoritmos ordenam dados.',
          lessons: [
            {
              id: 'lesson-3-13',
              title: 'Estado do vetor após uma iteração',
              description: 'Identifique o vetor após um passo de Bubble Sort.',
              question: {
                type: 'multiple-choice',
                text: 'Dado o vetor [3, 1, 2], qual será o vetor após uma iteração de Bubble Sort (passando da esquerda para a direita)?',
                options: [
                  { id: 'a', label: '[1, 3, 2]' },
                  { id: 'b', label: '[3, 2, 1]' },
                  { id: 'c', label: '[1, 2, 3]' },
                  { id: 'd', label: '[2, 3, 1]' },
                ],
                correct: 'a',
                explanation: 'Bubble Sort compara pares e troca se estiverem fora de ordem. Primeiro compara 3 e 1 -> troca, depois 3 e 2 -> troca.',
              },
            },
          ],
        },
        {
          id: 'unit-14',
          title: 'Busca Binária',
          description: 'Entenda como buscar em dados ordenados de maneira eficiente.',
          lessons: [
            {
              id: 'lesson-3-14',
              title: 'Comparações necessárias',
              description: 'Quantas comparações a busca binária faz no pior caso?',
              question: {
                type: 'multiple-choice',
                text: 'Em um array com 16 elementos, quantas comparações a busca binária faz no pior caso?',
                options: [
                  { id: 'a', label: '4' },
                  { id: 'b', label: '8' },
                  { id: 'c', label: '16' },
                  { id: 'd', label: '2' },
                ],
                correct: 'a',
                explanation: 'Cada comparação reduz o espaço pela metade: log2(16) = 4.',
              },
            },
          ],
        },
        {
          id: 'unit-15',
          title: 'Manipulação de Strings',
          description: 'Trabalhe com texto: concatenação, substring e comparação.',
          lessons: [
            {
              id: 'lesson-3-15',
              title: 'Inverter uma string',
              description: 'Entenda como os caracteres mudam de posição.',
              question: {
                type: 'multiple-choice',
                text: 'Qual é o resultado de inverter a string "abc"?',
                options: [
                  { id: 'a', label: 'cba' },
                  { id: 'b', label: 'abc' },
                  { id: 'c', label: 'bac' },
                  { id: 'd', label: 'cab' },
                ],
                correct: 'a',
                explanation: 'A string invertida é "cba".',
              },
            },
          ],
        },
        {
          id: 'unit-16',
          title: 'Estruturas de Dados Lineares',
          description: 'Pilhas e filas: operações e aplicações.',
          lessons: [
            {
              id: 'lesson-3-16',
              title: 'Operação de pilha',
              description: 'Simule push e pop em uma pilha (LIFO).',
              question: {
                type: 'simulation',
                text: 'Após push(5), push(3), pop(), qual elemento está no topo?',
                options: [
                  { id: 'a', label: '5' },
                  { id: 'b', label: '3' },
                  { id: 'c', label: 'Nenhum' },
                  { id: 'd', label: 'Erro' },
                ],
                correct: 'a',
                explanation: 'Depois de push(5), push(3) e pop(), o topo volta a ser 5.',
              },
            },
          ],
        },
        {
          id: 'unit-17',
          title: 'Listas Encadeadas',
          description: 'Conceitos de nós e ponteiros em listas ligadas.',
          lessons: [
            {
              id: 'lesson-3-17',
              title: 'Inserção em lista encadeada',
              description: 'Compreenda o efeito de inserir um novo nó no início.',
              question: {
                type: 'multiple-choice',
                text: 'Se a lista atual é [A -> B -> C] e inserimos D no início, qual será a nova lista?',
                options: [
                  { id: 'a', label: '[D -> A -> B -> C]' },
                  { id: 'b', label: '[A -> B -> C -> D]' },
                  { id: 'c', label: '[A -> D -> B -> C]' },
                  { id: 'd', label: '[D -> C -> B -> A]' },
                ],
                correct: 'a',
                explanation: 'Inserir no início faz com que o novo nó aponte para o antigo primeiro nó.',
              },
            },
          ],
        },
        {
          id: 'unit-18',
          title: 'Desafios de Lógica e Problemas Clássicos',
          description: 'Exercite o raciocínio com problemas clássicos de lógica.',
          lessons: [
            {
              id: 'lesson-3-18',
              title: 'Torre de Hanói (conceitual)',
              description: 'Entenda a regra básica da Torre de Hanói.',
              question: {
                type: 'multiple-choice',
                text: 'Qual é a regra principal da Torre de Hanói ao mover discos?',
                options: [
                  { id: 'a', label: 'Mover qualquer disco para qualquer pino' },
                  { id: 'b', label: 'Nunca colocar um disco maior sobre um menor' },
                  { id: 'c', label: 'Mover dois discos ao mesmo tempo' },
                  { id: 'd', label: 'Sempre mover o disco do meio' },
                ],
                correct: 'b',
                explanation: 'A regra é nunca colocar um disco maior sobre um menor.',
              },
            },
          ],
        },
      ],
    },
  ],
};
