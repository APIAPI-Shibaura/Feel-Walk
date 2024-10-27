import React, { useState } from "react";
import { feeling } from "../data/data";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    if (finalScore >= 1000) resultEmotion = "Clear";
    else if (finalScore >= 800)  resultEmotion = "Sunny";
    else if (finalScore >= 600)  resultEmotion = "Cloudy";
    else if (finalScore >= 400)  resultEmotion = "Rainy";
    else resultEmotion = "Thunder";

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

  const navigateToClear = () => {navigate("/clear", { state: { score, emotion } });};
  const navigateToSunny = () => {navigate("/sunny", { state: { score, emotion } });};
  const navigateToCloudy = () => {navigate("/cloudy", { state: { score, emotion } });};
  const navigateToRainy = () => {navigate("/rainy", { state: { score, emotion } });};
  const navigateToThunder = () => {navigate("/thunder", { state: { score, emotion } });};


  return (
    <div>
      <div className="feelingQuestion">
        {isFinished ? (
          <div>
            {emotion === "Clear" && <a className="linkButton" onClick={navigateToClear}>Have a nice day!</button>}
            {emotion === "Sunny" && <a className="linkButton"onClick={navigateToSunny}>Have a nice day!</button>}
            {emotion === "Cloudy" && <a className="linkButton"onClick={navigateToCloudy}>Have a nice day!</button>}
            {emotion === "Rainy" && <a className="linkButton"onClick={navigateToRainy}>Have a nice day!</button>}
            {emotion === "Thunder" && <a className="linkButton"onClick={navigateToThunder}>Have a nice day!</button>}
          </div>
        ) : (
          <div>
            <h1>{feeling[currentQuestionNum].question}</h1>
            <h2>質問 {currentQuestionNum + 1}</h2>
            <div className="questions">
              {Object.values(currentQuestion.choices).map((choice, index) => (
                <a
                  key={index}
                  onClick={() => handleQuestionClick(choice.points)}
                  className="questionButton"
                >
                  {choice.text}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Choice;