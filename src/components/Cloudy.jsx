import React, { useState, useEffect } from 'react';
import { cloudyTask } from '../data/cloudyTask';
import { useLocation } from 'react-router-dom';

const Cloudy = () => {
  const location = useLocation();
  const { score: initialScore, emotion } = location.state || { score: 0, emotion: "Unknown" };

  const [randomQuestions, setRandomQuestions] = useState([]);
  const [score, setScore] = useState(initialScore);

  const progressBarStyle = {
    width: `${(score / 1000) * 100}%`,
    backgroundColor: "lightblue",
    height: "24px",
  };

  const getRandomQuestions = () => {
    const randomArr = [];
    const result = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * 5);
      randomArr.push(randomIndex);
      result.push({
        text: cloudyTask[i].questions[`ques${randomIndex + 1}`].text,
        id: `${i}-${randomIndex}`,
        points: cloudyTask[i].questions[`ques${randomIndex + 1}`].points
      });
    }
    return result;
  };

  useEffect(() => {
    const questions = getRandomQuestions();
    setRandomQuestions(questions);
  }, []);

  const deleteToDo = (id, points) => {
    setRandomQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
    setScore((prevScore) => prevScore + points);
  };

  return (
    <div id='cloudy'>
      <h1>cloudy</h1>
      <ul>
        {randomQuestions.map((question) => (
          <li
            key={question.id}
            onClick={() => deleteToDo(question.id, question.points)}
          >
            {question.text}
          </li>
        ))}
      </ul>
      <h2>{score}</h2>
      <div style={{ width: "100%", backgroundColor: "#ddd", height: "24px" }}>
        <div style={progressBarStyle}></div>
      </div>
    </div>
  );
};

export default Cloudy;
