import React, { useReducer } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Controls from './components/Controls';

export const Context = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_WORD':
      if (state.wordIndex < state.words.length - 1) {
          let newWordIndex = state.wordIndex + 1;
          let newWord = state.words[newWordIndex];
          return {...state, wordIndex: newWordIndex, word: newWord };
      } else {
          return state;
      }
    case 'PREVIOUS_WORD':
      if (state.wordIndex === 0) {
          return state;
      } else {
          let newWordIndex = state.wordIndex - 1;
          let newWord = state.words[newWordIndex];
          return {...state, wordIndex: newWordIndex, word: newWord };
      }
    default:
      throw new Error("reducer error");
  }
}

export default function App() {

    const words = ["a, an", "about", "above", "across","after", "again"];
    let word = words[0];

    const [state, dispatch] = useReducer(reducer, { wordIndex: 0, words: words, word: word });
    
    return (
        <>
            <Navbar />
            <Context.Provider value={dispatch}>
                <Card word={state.word} />
                {/* <Controls /> */}
            </Context.Provider>
        </>
    );
}