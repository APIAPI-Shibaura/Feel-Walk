import React from 'react';
import { thunderTask } from '../data/thunderTask';

const Thunder = () => {
  const randomArr = [];
  const result = [];

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * 5);
    console.log(randomIndex);
    randomArr.push(randomIndex);
    result.push(thunderTask[i].questions[`ques${randomIndex + 1}`].text);
  }

  console.log(randomArr);
  console.log(result);

  return (
    <div id='thunder'>
      <h1>thunder</h1>
      <ul>
        {result.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}

export default Thunder;
