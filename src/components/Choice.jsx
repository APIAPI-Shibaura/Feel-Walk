import React, { useState } from 'react';
import { feeling } from '../data/data';
import { Link } from 'react-router-dom';


const Choice = () => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const currentQuestion = feeling[currentQuestionNum];

  const handleQuestionClick = (points) => {
    setScore((prevScore) => prevScore + points);
    if (currentQuestionNum < feeling.length - 1) {
      setCurrentQuestionNum((prevQuestionNum) => prevQuestionNum + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div>
      <div className='feelingQuestion'>
        {isFinished ? (
          <div>
            {score >= 10 && <Link to='/Clear' className='choice'>Have a nice day!</Link>}
            {score < 10 && score >= 8 && <Link to='/Sunny' className='choice'>Have a nice day!</Link>}
            {score < 8 && score >= 6 && <Link to='/Cloudy' className='choice'>Have a nice day!</Link>}
            {score < 6 && score >= 4 && <Link to='/Rainy' className='choice'>Have a nice day!</Link>}
            {score < 4 && score >= 0 && <Link to='/Thunder' className='choice'>Have a nice day!</Link>}
          </div>
        ) : (
          <div>
            <h1>感情は？</h1>
            <h2>質問 {currentQuestionNum + 1}</h2>
            <div className='questions'>
              {Object.values(currentQuestion.choices).map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(choice.points)}
                  className="questionButton"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Choice;
