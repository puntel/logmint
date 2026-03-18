# LogiMente

A gamified mobile app for teaching programming logic, inspired by Duolingo's approach.

## Description

LogiMente helps beginners learn programming logic through interactive quizzes, progress tracking, and gamification elements like XP, streaks, and achievements.

## Features

- **Levels and Units**: Structured content from basic algorithms to advanced topics
- **Gamification**: Points, lives, streaks, badges
- **Question Types**: Multiple choice, true/false, fill-in-the-blank, drag-and-drop
- **Progress Tracking**: Visual tree of skills
- **Offline Support**: Local storage with Firebase sync

## Technologies

- **Frontend**: React Native with Expo
- **Backend**: Firebase (Firestore)
- **Animations**: Lottie
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js >= 16
- Expo CLI: `npm install -g @expo/cli`
- For mobile: Expo Go app or Android/iOS simulator

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure Firebase (see below)
4. Start the development server: `npx expo start`
5. Scan QR code with Expo Go or run on simulator

### Firebase Setup

1. Create a Firebase project at console.firebase.google.com
2. Enable **Cloud Firestore** (modo de teste / regras).
3. Copy the Firebase config object (as mostrado nas configurações do projeto).
4. Open `src/firebase/firebaseConfig.ts` and replace the `YOUR_...` values.

> **Nota:** não compartilhe suas chaves do Firebase em repositórios públicos. Elas podem ser armazenadas em variáveis de ambiente ou em arquivos ignorados por git.

#### Exemplo de coleção Firestore (para o quiz)
Coleção: `lessons`
Documento ID: `sample-lesson`

Dados (JSON):
```json
{
  "title": "Exemplo: Operações Aritméticas",
  "description": "Introdução a expressões e precedência",
  "question": {
    "text": "Qual o valor da variável x após executar o código abaixo?",
    "code": "x = 5\ny = 2\nx = x + y * 3",
    "options": [
      { "id": "a", "label": "11" },
      { "id": "b", "label": "21" },
      { "id": "c", "label": "10" },
      { "id": "d", "label": "17" }
    ],
    "correct": "a",
    "explanation": "A expressão y * 3 resulta em 6, então x = 5 + 6 = 11."
  }
}
```

### Building

- Android: `npx expo run:android`
- iOS: `npx expo run:ios`

## Project Structure

- `App.tsx`: Main app component
- `src/`: Source code
  - `screens/`: App screens
  - `components/`: Reusable components
  - `data/`: Curriculum model (níveis, unidades, lições)
  - `services/`: Business logic (curriculum lookup, Firebase)
  - `firebase/`: Firebase configuration e acesso ao Firestore
  - `utils/`: Helper functions
  - `types/`: TypeScript types
- `assets/`: Images and icons

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Push and create PR

## License

MIT License