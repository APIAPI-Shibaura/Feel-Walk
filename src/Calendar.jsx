import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { db } from "./firebase/login";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  RiEmotionHappyLine,
  RiEmotionLine,
  RiEmotionNormalLine,
  RiEmotionSadFill,
  RiEmotionUnhappyFill,
} from "react-icons/ri";

function Calendar() {
  //カレンダーに表示するイベント(感情データ)を保持
  const [events, setEvents] = useState([]);

  //天気に基づくアイコンのマッピング
  const weatherIcons = {
    Clear: <RiEmotionHappyLine />,
    Sunny: <RiEmotionLine />,
    Cloudy: <RiEmotionNormalLine />,
    Rainy: <RiEmotionSadFill />,
    Thunder: <RiEmotionUnhappyFill />,
  };

  //firestoreから感情データを取得する関数
  const fetchFeelings = async () => {
    try {
      //"feelings"コレクションのすべてのドキュメントを取得
      const querySnapshot = await getDocs(collection(db, "feelings"));
      const fetchedEvents = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          //感情のタイトル
          title: data.emotion,
          //ドキュメントに保存された日付情報
          date: data.date.toDate().toISOString().slice(0, 10),
          //感情に基づくアイコン
          icon: weatherIcons[data.emotion],
        };
      });
      //取得したデータを状態に保存してカレンダーに反映
      setEvents(fetchedEvents);
    } catch (error) {
      console.log("error", error);
    }
  };

  //コンポーネントが最初にレンダリングされた際に、感情データを取得
  useEffect(() => {
    fetchFeelings();
  }, []);

  //カレンダーイベントにアイコンを表示
  const renderEventContent = (eventInfo) => {
    return <div>{eventInfo.event.extendedProps.icon}</div>;
  };

  return (
    <div className="cal">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        /*firestoreから取得した感情データをイベントとして表示*/
        events={events}
        eventContent={renderEventContent} //アイコン表示に仕様
      />
    </div>
  );
}

export default Calendar;
