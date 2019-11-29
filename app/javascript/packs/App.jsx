import React, { useReducer } from 'react';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import Controls from './components/Controls';

export const Context = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_WORD':
      if (state.wordIndex < state.words.length - 1) {
          return {...state, wordIndex: state.wordIndex + 1};
      } else {
          return state;
      }
    case 'PREVIOUS_WORD':
      if (state.wordIndex === 0) {
          return state;
      } else {
          return {...state, wordIndex: state.wordIndex - 1};
      }
    default:
      throw new Error("reducer error");
  }
}

export default function App() {

    const words = ["a, an", "about", "above", "across","after", "again"];

    const [state, dispatch] = useReducer(reducer, { wordIndex: 0, words });
    
    return (
        <>
            <Navbar />
            <Context.Provider value={dispatch}>
                <Cards words={state.words} wordIndex={state.wordIndex} />
                {/* <Controls /> */}
            </Context.Provider>
        </>
    );
}