import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { db } from "./firebase/login";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

function Calendar() {
  //カレンダーに表示するイベント(感情データ)を保持
  const [events, setEvents] = useState([]);

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
          date: data.date,
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

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        /*firestoreから取得した感情データをイベントとして表示*/
        events={events}
      />
    </div>
  );
}

export default Calendar;
