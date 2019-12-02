import React, { useReducer, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Controls from './components/Controls';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Quiz from './components/Quiz';

export const Context = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_WORD':
      if (state.wordIndex < state.words.length - 1) {
        let newWordIndex = state.wordIndex + 1;
        let newFrontWord = state.words[newWordIndex].front;
        let newBackWord = state.words[newWordIndex].back;
        return { ...state, wordIndex: newWordIndex, frontWord: newFrontWord, backWord: newBackWord, flipped: false };
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
        return { ...state, wordIndex: newWordIndex, frontWord: newFrontWord, backWord: newBackWord, flipped: false };
      }
    case 'INITIALIZE_CARDS':
      let initialWords = action.payload;
      let initialFrontWord = initialWords[0].front;
      let initialBackWord = initialWords[0].back;
      return { ...state, words: initialWords, frontWord: initialFrontWord, backWord: initialBackWord };
    case 'FLIP':
      let newFlipped = !state.flipped;
      return { ...state, flipped: newFlipped };
    case 'PROGRESS':
      let newProgress = state.progress + 1;
      return { ...state, progress: newProgress };
    case 'CHECK_ANSWER':
      let submittedAnswer = action.payload.choice;
      let correctAnswer = state.words[state.questionIndex].back;
      if (submittedAnswer === correctAnswer) {
        let newProgress = state.progress + 1;
        let newWordIndex = state.wordIndex + 1;
        let newQuestionIndex = state.questionIndex + 1;
        let newFrontWord = state.words[newWordIndex].front;
        let newBackWord = state.words[newWordIndex].back;
        let newChoiceBtnColor = ['secondary', 'secondary', 'secondary'];
        let newChoiceDisabled = [false, false, false];
        return {
          ...state,
          wordIndex: newWordIndex,
          frontWord: newFrontWord,
          backWord: newBackWord,
          flipped: false,
          progress: newProgress,
          questionIndex: newQuestionIndex,
          choiceBtnColor: newChoiceBtnColor,
          choiceDisabled: newChoiceDisabled
        };

      } else {
        let newChoiceBtnColor = state.choiceBtnColor;
        newChoiceBtnColor[action.payload.choiceIndex] = 'default';
        let newChoiceDisabled = state.choiceDisabled;
        newChoiceDisabled[action.payload.choiceIndex] = true;
        return {...state, 
                choiceBtnColor: newChoiceBtnColor,
                choiceDisabled: newChoiceDisabled
              };
      }
    default:
      throw new Error(":( Action Type not found!");
  }
}

export default function App() {

  useEffect(() => {
    axios.get('/cards.json')
      .then(function (response) {
        // handle success
        dispatch({ type: 'INITIALIZE_CARDS', payload: response.data })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const [state, dispatch] = useReducer(reducer,
    {
      wordIndex: 0,
      words: [],
      frontWord: "",
      backWord: "",
      flipped: false,
      progress: 0,
      questionIndex: 0,
      choiceBtnColor: ["secondary", "secondary", "secondary"],
      choiceDisabled: [false, false, false]
    });

  if (!state.words) {
    return false;
  } else {

    return (
      <>
        <Navbar />
        <Context.Provider value={dispatch}>
          {state.progress % 4 === 0 && state.progress !== 0 ?
            <Quiz
              questionIndex={state.questionIndex}
              words={state.words}
              answerIsCorrect={state.answerIsCorrect}
              choiceBtnColor={state.choiceBtnColor}
              choiceDisabled={state.choiceDisabled}
            /> :
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Card
                frontWord={state.frontWord}
                backWord={state.backWord}
                flipped={state.flipped}
                flippable={true} />
              <Controls />
            </Box>
          }
        </Context.Provider>
      </>
    );
  }
}