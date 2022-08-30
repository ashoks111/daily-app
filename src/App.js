import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import DailyIframe from "@daily-co/daily-js";
import { DailyProvider } from "@daily-co/daily-react-hooks";
import DailyComponent from "./dailyComponent";

const DAILY_URL = "https://diagnal.daily.co/OUmtRql4BUX983BHRHyh";

function App() {
  const [callObject, setCallObject] = useState(null);
  const [token, setToken] = useState("");
  const getToken = async () => {
    const response = await fetch("https://api.daily.co/v1/meeting-tokens", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${"04907743c1542a839642e8b02dd4f7ab9d7db0edb850b85ca94a09d0bfd6d28a"}`,
      },
      body: JSON.stringify({
        properties: {
          room_name: "textdemo",
          is_owner: true,
          user_name: "Ashok",
        },
      }),
    });
    return response.json();
  };

  useEffect(() => {
    if (!DailyIframe) return;
    //getToken().then((response) => {
    //   console.log("token", response);
    //setToken(response.token);
    const newCallObject = DailyIframe.createCallObject();

    setCallObject(newCallObject);
    //newCallObject.startCamera();
    // });
  }, []);
  return (
    <div className="App">
      {callObject && (
        <DailyProvider callObject={callObject}>
          <DailyComponent token={token} />
        </DailyProvider>
      )}
    </div>
  );
}

export default App;
