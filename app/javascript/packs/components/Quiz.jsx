import React from 'react';
import Card from './Card';
import Choice from './Choice';


// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
export default function Quiz(props) {
  
    let {words, questionIndex} = props;

    let choices = [];

    let choice1 = words[questionIndex].back; //this is the correct choice

    let randomWordIndex1 = getRandomInt(0, words.length - 1);
    let randomWordIndex2 = getRandomInt(0, words.length - 1);

    while (randomWordIndex1 === questionIndex || randomWordIndex2 === questionIndex) {
        randomWordIndex1 = getRandomInt(0, words.length - 1);
        randomWordIndex2 = getRandomInt(0, words.length - 1);    
    }

    let choice2 = words[randomWordIndex1].back;
    let choice3 = words[randomWordIndex2].back;

    choices.push(choice1);
    choices.push(choice2);
    choices.push(choice3);
    choices = shuffle(choices);

    return (
        <>
            <h1>Quiz</h1>
            <Card frontWord={words[questionIndex].front} backWord="nil" flipped={false} />
            { choices.map((choice,index) => (
                <Choice choice={choice} key={index}/>
            ))}
        </>
    );


}