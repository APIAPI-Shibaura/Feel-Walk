const feeling = [
  {
    id: 1,
    question: '今の感情は？',
    choices: {
      ques1: { text: '楽しい', points: 400 },
      ques2: { text: 'うれしい', points: 350 },
      ques3: { text: 'めんどくさい', points: 200 },
      ques4: { text: 'つらい', points: 150 },
      ques5: { text: '悲しい', points: 50 },
    },
  },
  {
    id: 2,
    question: '今日の体調はどうですか？',
    choices: {
      ques1: { text: 'とても良い', points: 400 },
      ques2: { text: '良い', points: 350 },
      ques3: { text: '普通', points: 200 },
      ques4: { text: '悪い', points: 100 },
      ques5: { text: 'とても悪い', points: 50 },
    },
  },
];

export { feeling };