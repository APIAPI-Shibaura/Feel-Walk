import React from 'react';
import { cloudyTask } from '../data/cloudyTask';

const Cloudy = () => {
  const randomArr = [];
  const result = [];

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * 5);
    console.log(randomIndex);
    randomArr.push(randomIndex);
    result.push(cloudyTask[i].questions[`ques${randomIndex + 1}`].text);
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
    </div>
  );
}

export default Cloudy;
