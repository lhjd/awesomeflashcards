import React, { useReducer, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Controls from './components/Controls';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Quiz from './components/Quiz';
import { Line } from 'rc-progress';
import Congrats from './components/Congrats';
import Monster from './components/Monster';
import EasterEgg from './components/EasterEgg';

export const Context = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_WORD':

      if (state.wordIndex < state.words.length - 1) {
        let newWordIndex = state.wordIndex + 1;
        let newFrontWord = state.words[newWordIndex].front;
        let newBackWord = state.words[newWordIndex].back;
        let newWordId = state.words[newWordIndex].id;

        let apple = state.savedWords.find(word => word.card_id === newWordId);
        // console.log("*** apple ***", apple);
        if (apple) {
          let niceIsEasy = apple.isEasy;
          let niceIsHard = apple.isHard;
          let niceSavedWordId = apple.id;

          return {
            ...state,
            wordIndex: newWordIndex,
            frontWord: newFrontWord,
            backWord: newBackWord,
            wordId: newWordId,
            flipped: false,
            isEasy: niceIsEasy,
            isHard: niceIsHard,
            savedWordId: niceSavedWordId
          };
        } else {
          // console.log("*** no saved words!!! ***");
          return {
            ...state,
            wordIndex: newWordIndex,
            frontWord: newFrontWord,
            backWord: newBackWord,
            wordId: newWordId,
            flipped: false,
            isEasy: false,
            isHard: false,
            savedWordId: null
          };
        }

      } else {
        let newFrontWord = state.words[0].front;
        let newBackWord = state.words[0].back;
        let newWordId = state.words[0].id;

        let apple = state.savedWords.find(word => word.card_id === newWordId);

        if (apple) {
          let niceIsEasy = apple.isEasy;
          let niceIsHard = apple.isHard;
          let niceSavedWordId = apple.id;

          return {
            ...state,
            wordIndex: 0,
            frontWord: newFrontWord,
            backWord: newBackWord,
            isEasy: niceIsEasy,
            isHard: niceIsHard,
            savedWordId: niceSavedWordId
          };
        } else {
          return {
            ...state,
            wordIndex: 0,
            frontWord: newFrontWord,
            backWord: newBackWord
          };
        }
      }
    case 'PREVIOUS_WORD':
      if (state.wordIndex === 0) {
        return state;
      } else {
        let newWordIndex = state.wordIndex - 1;
        let newFrontWord = state.words[newWordIndex].front;
        let newBackWord = state.words[newWordIndex].back;
        let newWordId = state.words[newWordIndex].id;
        return {
          ...state,
          wordIndex: newWordIndex,
          frontWord: newFrontWord,
          backWord: newBackWord,
          wordId: newWordId,
          flipped: false
        };
      }
    case 'INITIALIZE_CARDS':
      let initialWords = action.payload;
      let initialFrontWord = initialWords[0].front;
      let initialBackWord = initialWords[0].back;
      let initialWordId = initialWords[0].id;
      return {
        ...state,
        words: initialWords,
        frontWord: initialFrontWord,
        backWord: initialBackWord,
        wordId: initialWordId
      };
    case 'INITIALIZE_SAVED_WORDS':
      let initialSavedWords = action.payload;
      if (initialSavedWords) {
        let banana = initialSavedWords.find(word => word.card_id === state.wordId);
        if (banana) {
          let newIsEasy = banana.isEasy;
          let newIsHard = banana.isHard;
          let newSavedWordId = banana.id;
          return {
            ...state,
            savedWords: initialSavedWords,
            isEasy: newIsEasy,
            isHard: newIsHard,
            savedWordId: newSavedWordId
          };
        } else {
          return state;
        }
      }
    case 'FLIP':
      let newFlipped = !state.flipped;
      return { ...state, flipped: newFlipped };
    case 'RESTART':
      let newFrontWord = state.words[0].front;
      let newBackWord = state.words[0].back;
      let newWordId = state.words[0].id;

      let apple = state.savedWords.find(word => word.card_id === newWordId);
      if (apple) {
        let niceIsEasy = apple.isEasy;
        let niceIsHard = apple.isHard;
        let niceSavedWordId = apple.id;

        return {
          ...state,
          progress: 0,
          percentComplete: 0,
          endOfQuiz: false,
          wordId: newWordId,
          wordIndex: 0,
          frontWord: newFrontWord,
          backWord: newBackWord,
          isEasy: niceIsEasy,
          isHard: niceIsHard,
          questionIndex: 0,
          savedWordId: niceSavedWordId
        };
      } else {
        return {
          ...state,
          questionIndex: 0,
          progress: 0,
          percentComplete: 0,
          endOfQuiz: false,
          wordIndex: 0,
          wordId: newWordId,
          frontWord: newFrontWord,
          backWord: newBackWord,
          isEasy: false,
          isHard: false
        };
      }

    case 'TOGGLE_EASY_HARD':
      let wowIsEasy = action.payload.isEasy;
      let wowIsHard = action.payload.isHard;
      let wowSavedWordId = action.payload.savedWordId;
      let wowSavedWord = action.payload.savedWord;
      let newSavedWords = state.savedWords;

      if (state.savedWords.filter(e => e.id === wowSavedWordId).length === 0) {
        newSavedWords = [...state.savedWords, wowSavedWord];
      }

      return {
        ...state,
        isEasy: wowIsEasy,
        isHard: wowIsHard,
        savedWordId: wowSavedWordId,
        savedWords: newSavedWords
      };

    case 'PROGRESS':
      let newProgress = state.progress + 1;
      return { ...state, progress: newProgress };

    case 'SHOW_EASTER_EGG':
      let newEasterCount = state.easterCount + 1;

      let showEaster = state.showEaster;

      if (newEasterCount >= 5) {
        showEaster = true
      }

      return {...state, easterCount: newEasterCount, showEaster: showEaster};

    case 'SHOW_QUIZ':
      
      return {...state, 
              easterCount: 0, 
              showEaster: false,
              choiceBtnColor: ["secondary", "secondary", "secondary"],
              choiceDisabled: [false, false, false],            
            };

    case 'CHECK_ANSWER':
      if (state.questionIndex < state.words.length - 1) {
        let submittedAnswer = action.payload.choice;
        let correctAnswer = state.words[state.questionIndex].back;
        if (submittedAnswer === correctAnswer) {
          let newProgress = state.progress + 1;
          let newWordIndex = state.wordIndex;
          let newQuestionIndex = state.questionIndex + 1;
          let newPercentComplete = newQuestionIndex / (state.words.length) * 100;
          let newFrontWord = state.words[newWordIndex].front;
          let newBackWord = state.words[newWordIndex].back;
          let newWordId = state.words[newWordIndex].id;
          let newChoiceBtnColor = ['secondary', 'secondary', 'secondary'];
          let newChoiceDisabled = [false, false, false];
          return {
            ...state,
            wordIndex: newWordIndex,
            frontWord: newFrontWord,
            backWord: newBackWord,
            wordId: newWordId,
            flipped: false,
            progress: newProgress,
            questionIndex: newQuestionIndex,
            choiceBtnColor: newChoiceBtnColor,
            choiceDisabled: newChoiceDisabled,
            percentComplete: newPercentComplete,
          };
        } else {
          let newChoiceBtnColor = state.choiceBtnColor;
          newChoiceBtnColor[action.payload.choiceIndex] = 'default';
          let newChoiceDisabled = state.choiceDisabled;
          newChoiceDisabled[action.payload.choiceIndex] = true;
          return {
            ...state,
            choiceBtnColor: newChoiceBtnColor,
            choiceDisabled: newChoiceDisabled
          };
        }
      } else {
        let submittedAnswer = action.payload.choice;
        let correctAnswer = state.words[state.questionIndex].back;
        if (submittedAnswer === correctAnswer) {
          let newProgress = state.progress + 1;
          let newChoiceBtnColor = ['secondary', 'secondary', 'secondary'];
          let newChoiceDisabled = [false, false, false];
          // console.log("*** END OF QUIZ! ***");
          return {
            ...state,
            progress: newProgress,
            choiceBtnColor: newChoiceBtnColor,
            choiceDisabled: newChoiceDisabled,
            endOfQuiz: true,
            percentComplete: 100
          };
        } else {
          let newChoiceBtnColor = state.choiceBtnColor;
          newChoiceBtnColor[action.payload.choiceIndex] = 'default';
          let newChoiceDisabled = state.choiceDisabled;
          newChoiceDisabled[action.payload.choiceIndex] = true;
          return {
            ...state,
            choiceBtnColor: newChoiceBtnColor,
            choiceDisabled: newChoiceDisabled
          };
        }
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

    axios.get('/words.json')
      .then(function (response) {
        // handle success
        dispatch({ type: 'INITIALIZE_SAVED_WORDS', payload: response.data })
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
      wordId: 1, //cardId 
      frontWord: "",
      backWord: "",
      flipped: false,
      progress: 0,
      questionIndex: 0,
      choiceBtnColor: ["secondary", "secondary", "secondary"],
      choiceDisabled: [false, false, false],
      endOfQuiz: false,
      percentComplete: 0,
      isEasy: false,
      isHard: false,
      savedWords: [],
      savedWordId: null,
      showEaster: false,
      easterCount: 0
    });

  if (!state.words) {
    return false;
  } else {
    return (
      <>
        <Navbar />
        <Context.Provider value={dispatch}>
          {
            state.endOfQuiz
              ?
              <>
                <Congrats />
              </>
              :
              (state.progress % 4 === 0 && state.progress !== 0
                ?
                (state.showEaster
                  ?
                  <EasterEgg />
                  :
                  <>
                    <Box
                      m={2}
                    >
                      <Line
                        percent={state.percentComplete}
                        strokeWidth="1" strokeColor="#2ecc71" />
                    </Box>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                      <Quiz
                        questionIndex={state.questionIndex}
                        words={state.words}
                        answerIsCorrect={state.answerIsCorrect}
                        choiceBtnColor={state.choiceBtnColor}
                        choiceDisabled={state.choiceDisabled}
                      />
                      <Monster wrongAnswer={state.choiceDisabled} />
                    </Box>
                  </>
                )
                :
                <>
                  <Box
                    m={2}
                  >
                    <Line
                      percent={state.percentComplete}
                      strokeWidth="1" strokeColor="#2ecc71" />
                  </Box>
                  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Card
                      frontWord={state.frontWord}
                      backWord={state.backWord}
                      isEasy={state.isEasy}
                      isHard={state.isHard}
                      wordId={state.wordId}
                      flipped={state.flipped}
                      flippable={true}
                      savedWords={state.savedWords}
                      savedWordId={state.savedWordId} />
                    <Controls />
                  </Box>
                </>)
          }
        </Context.Provider>
      </>
    );
  }
}