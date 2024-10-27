import React, { useState } from "react";
import { feeling } from "../data/data";
import { Link } from "react-router-dom";
import { db } from "../firebase/login";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const Choice = () => {
  //現在の質問番号を保持
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  //スコアを保持
  const [score, setScore] = useState(0);
  //最終質問かどうかを確認
  const [isFinished, setIsFinished] = useState(false);
  //感情の結果を保持
  const [emotion, setEmotion] = useState("");
  const currentQuestion = feeling[currentQuestionNum];

  //質問の選択肢をクリックしたときにスコアを追加し、次の質問に移動
  const handleQuestionClick = (points) => {
    setScore((prevScore) => prevScore + points);
    if (currentQuestionNum < feeling.length - 1) {
      setCurrentQuestionNum((prevQuestionNum) => prevQuestionNum + 1);
    } else {
      //最後の質問でスコアに基づいて感情を決定
      determineEmotion(score + points);
      setIsFinished(true);
    }
  };

  //最終的なスコアに基づいて感情を決定する関数
  const determineEmotion = async (finalScore) => {
    let resultEmotion = "";

    if (finalScore >= 10) {
      resultEmotion = "Clear";
    } else if (finalScore >= 8) {
      resultEmotion = "Sunny";
    } else if (finalScore >= 6) {
      resultEmotion = "Cloudy";
    } else if (finalScore >= 4) {
      resultEmotion = "Rainy";
    } else {
      resultEmotion = "Thunder";
    }
    //感情の決定
    setEmotion(resultEmotion);
    //firestoreに結果を設定
    await saveToFirestore(resultEmotion);
  };

  //firestoreに感情データを保存する関数
  const saveToFirestore = async (emotion) => {
    try {
      await setDoc(doc(db, "feelings", new Date().toDateString()), {
        //感情の結果を保存
        score: emotion,
        //日付情報を保存(firestore形式)
        date: Timestamp.fromDate(new Date()),
      });
      console.log("感情が保存された", emotion);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div>
      <div className="feelingQuestion">
        {isFinished ? (
          <div>
            {emotion === "Clear" && <Link to="/Clear">Have a nice day</Link>}
            {emotion === "Sunny" && <Link to="/Sunny">Have a nice day</Link>}
            {emotion === "Cloudy" && <Link to="/Cloudy">Have a nice day</Link>}
            {emotion === "Rainy" && <Link to="/Rainy">Have a nice day</Link>}
            {emotion === "Thunder" && (
              <Link to="/Thunder">Have a nice day</Link>
            )}
          </div>
        ) : (
          <div>
            <h1>感情は？</h1>
            <h2>質問 {currentQuestionNum + 1}</h2>
            <div className="questions">
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
};

export default Choice;
