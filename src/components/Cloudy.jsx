import React from 'react';
import { rainyTask } from '../data/rainyTask';
import { useLocation } from 'react-router-dom';

const Cloudy = () => {
  const location = useLocation();
  const { score, emotion } = location.state || { score: 0, emotion: "Unknown" };
  const randomArr = [];
  const result = [];

  const progressBarStyle = {
    width: `${(score / 1000) * 100}%`,
    backgroundColor: "lightblue",
    height: "24px",
  };

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * 5);
    console.log(randomIndex);
    randomArr.push(randomIndex);
    result.push(rainyTask[i].questions[`ques${randomIndex + 1}`].text);
  }

  console.log(randomArr);
  console.log(result);

  return (
    <div id='cloudy'>
      <h1>cloudy</h1>
      <ul>
        {result.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
      <h2>スコア: {score}</h2>
      <div style={{ width: "100%", backgroundColor: "#ddd", height: "24px" }}>
        <div style={progressBarStyle}></div>
      </div>
    </div>
  );
}

export default Cloudy;