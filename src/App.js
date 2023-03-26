import "./App.css";
import { ChatEngine, sendMessage } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import axios from "axios";
import { useState } from "react";

function App() {
  const [receiverCreds, setReceiverCreds] = useState()
  const renderChatForm = (creds, response) => {
    console.log(creds)
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
  const sendMessageRequest = (msg) => {
    axios.post("http://127.0.0.1:5000/movies/basedOnUserText", { "user_response": msg }).then(function (response) {
      if (receiverCreds) {
        renderChatForm(receiverCreds, response.movies)
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
        renderChatList={() => { return (<div></div>) }}
        renderChatFeed={(chat) => ChatFeed(chat)}
        renderChatSettingsTop={() => { }}
        renderPeopleSettings={() => { }}
        renderPhotosSettings={() => { }}
        renderOptionsSettings={() => { }}
        onNewMessage={(chat, msg) => {
          const oneMessage = msg.text.replace('<p>', '');
          const twoMessage = oneMessage.replace('</p>', '');
          if (twoMessage.toLowerCase() === "happy") {
            sendMessageRequest(twoMessage.toLowerCase())
          }
          new Audio(
            "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
          ).play()
        }
        }
      />


    </div>
  );
}

export default App;
