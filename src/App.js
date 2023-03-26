import "./App.css";
import { ChatEngine, sendMessage } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [receiverCreds, setReceiverCreds] = useState()
  const [counter, setCounter] = useState(false)
  const renderChatForm = (creds, response) => {
    sendMessage(
      creds,
      creds.activeChat,
      {
        attachments: [],
        files: [],
        text: response
      }
    )
  };
  useEffect(()=>{
    if(receiverCreds){
      renderChatForm(receiverCreds, "Hey Buddy,\n how are you feeling today \n 1. Happy😃 2. Neutral😐 3. Sad😥")
    }
  },[receiverCreds])
  
  const sendMessageRequest = (msg) => {
    if (msg === "sad") {
     let newText = "Hey buddy why are you sad today?"
      renderChatForm(receiverCreds, newText)
      return
    }
    axios.post("http://127.0.0.1:5000/movies/"+(msg==="happy"||msg==="neutral" ? "basedOnUserEmotion":"basedOnUserText"), { "user_response": msg }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (receiverCreds) {
        renderChatForm(receiverCreds, response.data.movies)
      }
    })["catch"](function (error) {
      if (receiverCreds) {
        renderChatForm(receiverCreds, "Sorry! we didn't get you")
      }
    });

  }
  return (
    <div className="App">
      <div style={{ opacity: 0 }}>
        <ChatEngine
          height="0vh"
          width="0"
          projectID="a9a4416e-994a-4bf8-91f2-0d4ace500fdc"
          userName={"Receiver"}
          userSecret={"Receiver"}
          renderChatList={() => { return (<div></div>) }}
          renderChatFeed={(chat) => ChatFeed(chat, setReceiverCreds)}
          renderChatSettingsTop={() => { }}
          renderPeopleSettings={() => { }}
          renderPhotosSettings={() => { }}
          renderOptionsSettings={() => { }}
        />
      </div>
      <ChatEngine
        height="100vh"
        projectID="a9a4416e-994a-4bf8-91f2-0d4ace500fdc"
        userName={"Admin"}
        userSecret={"Admin"}
        renderChatList={() => { return (<div style={{ borderRight: "1px solid", borderColor: "rgb(175, 175, 175)", height: "100%", backgroundColor: "rgb(240, 240, 240)" }}></div>) }}
        renderChatFeed={(chat) => ChatFeed(chat)}
        renderChatSettingsTop={() => { }}
        renderPeopleSettings={() => { }}
        renderPhotosSettings={() => { }}
        renderOptionsSettings={() => { }}
        onNewMessage={(chat, msg) => {
          if (counter) {
            setCounter(counter => !counter)
            const oneMessage = msg.text.replace('<p>', '');
            const twoMessage = oneMessage.replace('</p>', '');
            sendMessageRequest(twoMessage.trim().toLowerCase())
            new Audio(
              "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
            ).play()
          }
          else {
            setCounter(counter => !counter)
          }
        }
        }
      />


    </div>
  );
}

export default App;
