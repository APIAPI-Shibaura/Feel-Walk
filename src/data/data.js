const feeling = [
  {
    id: 1,
    question: '今の感情は？',
    choices: {
      ques1: { text: '楽しい', points: 5 },
      ques2: { text: 'うれしい', points: 4 },
      ques3: { text: 'めんどくさい', points: 3 },
      ques4: { text: 'つらい', points: 2 },
      ques5: { text: '悲しい', points: 1 },
    },
  },
  {
    id: 2,
    question: '今日の体調はどうですか？',
    choices: {
      ques1: { text: 'とても良い', points: 5 },
      ques2: { text: '良い', points: 4 },
      ques3: { text: '普通', points: 3 },
      ques4: { text: '悪い', points: 2 },
      ques5: { text: 'とても悪い', points: 1 },
    },
  },
];

export { feeling };
