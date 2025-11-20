# Snake Game 🐍

Um jogo clássico da cobrinha (Snake) desenvolvido com tecnologias web modernas, focado em performance e código limpo.

## 🚀 Tecnologias Utilizadas

- **React 19**: Biblioteca para construção da interface.
- **TypeScript**: Superset do JavaScript para tipagem estática e segurança.
- **Vite**: Build tool rápida para desenvolvimento frontend.
- **Tailwind CSS v4**: Framework CSS utility-first para estilização.
- **React Icons**: Biblioteca de ícones para elementos do jogo.

## ✨ Funcionalidades

- **Jogabilidade Clássica**: Controle a cobra para comer maçãs e crescer.
- **Sistema de Níveis**: 5 níveis com dificuldade progressiva.
  - Nível 1: Campo aberto.
  - Nível 2: Barra horizontal central.
  - Nível 3: Duas barras verticais.
  - Nível 4: Caixa com aberturas ("Box").
  - Nível 5: Formato de cruz.
- **Obstáculos (Paredes)**: Paredes que aparecem conforme o nível aumenta.
- **Comida Bônus**: Um raio (⚡) aparece aleatoriamente e dá pontos extras e aumenta a velocidade.
- **Monitoramento de Performance**: Contador de FPS em tempo real.
- **Design Responsivo**: Interface limpa e moderna com tema escuro.

## 🛠️ Como Executar o Projeto

Siga os passos abaixo para rodar o jogo localmente:

1. **Clone o repositório** (se aplicável) ou navegue até a pasta do projeto.

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   O terminal mostrará o link local, geralmente `http://localhost:5173`.

## 📁 Estrutura do Projeto

O código foi refatorado para seguir uma arquitetura modular:

```
src/
├── components/      # Componentes visuais (Snake, Food, Walls, etc.)
├── hooks/           # Lógica do jogo (useSnakeGame)
├── assets/          # Recursos estáticos
├── constants.ts     # Configurações globais (tamanho da grade, velocidade)
├── types.ts         # Definições de tipos TypeScript
├── utils.ts         # Funções auxiliares
├── App.tsx          # Componente principal
└── main.tsx         # Ponto de entrada
```

## 🎮 Controles

- **Setas Direcionais**: Movem a cobra (Cima, Baixo, Esquerda, Direita).
- **Espaço**: Pausa o jogo.
