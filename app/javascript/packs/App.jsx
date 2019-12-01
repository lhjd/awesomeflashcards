import React, { useReducer, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Controls from './components/Controls';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { responsiveFontSizes } from '@material-ui/core';

export const Context = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_WORD':
      if (state.wordIndex < state.words.length - 1) {
          let newWordIndex = state.wordIndex + 1;
          let newFrontWord = state.words[newWordIndex].front;
          let newBackWord = state.words[newWordIndex].back;
          return {...state, wordIndex: newWordIndex, frontWord: newFrontWord, backWord: newBackWord };
      } else {
          return state;
      }
    case 'PREVIOUS_WORD':
      if (state.wordIndex === 0) {
          return state;
      } else {
          let newWordIndex = state.wordIndex - 1;
          let newFrontWord = state.words[newWordIndex].front;
          let newBackWord = state.words[newWordIndex].back;
          return {...state, wordIndex: newWordIndex, frontWord: newFrontWord, backWord: newBackWord };
      }
    case 'INITIALIZE_CARDS':
       let initialWords = action.payload;
       let initialFrontWord = initialWords[0].front;
       let initialBackWord = initialWords[0].back;
       return {...state, words: initialWords, frontWord: initialFrontWord, backWord: initialBackWord};
    default:
      throw new Error("reducer error");
  }
}

export default function App() {


    useEffect(() => {
        axios.get('/cards.json')
        .then(function (response) {
          // handle success
          dispatch({type: 'INITIALIZE_CARDS', payload: response.data})
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }, []);

    // const [cards, setCards] = useState([]);
    // const [frontOfCard, setFrontOfCard] = useState("");
    // const [backOfCafrd, setBackOfCard] = useState("");

    // const words = [{front: "a, an", back: "apple"}, 
    //                 {front: "about", back: "banana"},
    //                 {front: "above", back: "cranberry"},
    //                 {front: "across", back: "durian"}, 
    //                 {front: "after", back: "egg"}, 
    //                 {front: "again", back: "banana"}];

    // let frontWord = words[0].front;
    // let backWord = words[0].back;

    const [state, dispatch] = useReducer(reducer, { wordIndex: 0, words: [], frontWord: "", backWord: ""});

    if (!state.words) {
        return false;
    } else {

    return (
        <>
            <Navbar />
            <Context.Provider value={dispatch}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Card frontWord={state.frontWord} backWord={state.backWord} />
                    <Controls />
                </Box>
            </Context.Provider>
        </>
    );
    }
}