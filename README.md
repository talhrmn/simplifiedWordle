# Simplified Wordle Game

A simplified implementation of the popular Wordle game built with React and TypeScript, featuring a custom action listener pattern for event handling.

## 🎮 Game Features

- **5-letter word input**: Enter letters using an on-screen keyboard
- **Dictionary validation**: Words are validated against the English dictionary API
- **Visual feedback**: Green borders for valid words, red for invalid ones
- **Backspace functionality**: Remove letters with the delete key

## 🏗️ Architecture

The project consists of two main parts:

### Part 1: Custom Action Listener

A custom event handling system implementing the observer pattern:

- **registerListener**: Add event listeners to actions
- **removeListener**: Remove all listeners from an action
- **emit**: Trigger all listeners for a specific action

### Part 2: React Application

A React-based Wordle game using the action listener for state management:

- **BoxesComponent**: Displays the 5-letter word boxes with visual feedback
- **KeyboardComponent**: On-screen QWERTY keyboard for input
- **SimplifiedWordle**: Main game logic and state management

## 📁 Project Structure

```
src/
├── common/
│   └── action-listener/
│       ├── ActionListener.ts      # Custom action listener implementation
│       └── types.ts              # Action listener type definitions
├── components/
│   ├── boxes-component/
│   │   ├── BoxesComponent.tsx    # Word display boxes
│   │   ├── consts.ts            # Box constants
│   │   ├── styles.module.css    # Box styling
│   │   └── types.ts             # Box component types
│   └── keyboard-component/
│       ├── KeyboardComponent.tsx # On-screen keyboard
│       ├── consts.ts            # Keyboard layout
│       ├── styles.module.css    # Keyboard styling
│       └── types.ts             # Keyboard component types
└── pages/
    └── simplified-wordle/
        ├── SimplifiedWordle.tsx  # Main game component
        ├── consts.ts            # API constants
        └── styles.module.css    # Game layout styling
```

## 🚀 Getting Started

1. Clone the repository and cd to project:

2. Install dependencies ("npm install").

3. Start the development server ("npm start"):

4. Open localhost to view the game in your browser.

## 🎯 How to Play

1. **Type letters**: Click on the keyboard letters to input your word
2. **Delete letters**: Use the backspace (⌫) button to remove letters
3. **Submit word**: Press ENTER when you have 5 letters to check if it's a valid English word
4. **Visual feedback**:
   - Green border = Valid word
   - Red border = Invalid word or incomplete

## 🔧 API Integration

The game uses the [Free Dictionary API](https://dictionaryapi.dev/) to validate words:

- Endpoint: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- Method: GET request to check word validity
- Response: 200 OK for valid words, 404 for invalid words
  In production env we might have used a preloaded word.txt file to be able to play offline, but this works for the assignment.

## 🔄 Event Flow

1. User clicks keyboard → `INPUT` action emitted
2. Letter added to word state → Boxes update
3. User clicks ENTER → `ENTER` action emitted
4. API call validates word → Visual feedback applied
5. User clicks DELETE → `DELETE` action emitted
6. Last letter removed → Boxes update

## 🧪 Testing the Action Listener

The action listener can be tested independently:

```javascript
const actionListener = new MyActionListener();

// Register listeners
actionListener.registerListener("TEST", (data) => console.log(data));

// Emit events
actionListener.emit("TEST", "Hello World");

// Remove listeners
actionListener.removeListener("TEST");
```
