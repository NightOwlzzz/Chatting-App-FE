import "./App.css";
import { ChatEngine, sendMessage } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";

function App() {
  const renderChatForm = (creds) => {
    return (
      <div style={{ borderRight: "1px solid", borderColor: "rgb(175, 175, 175)", height: "100%", backgroundColor: "rgb(240, 240, 240)" }}>
        <button
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            padding: "5px 8px",
            backgroundColor: "#1890FF",
            borderRadius: "5px",
            cursor: "pointer",
            color: "white",
            borderWidth: "0px",
          }}
          onClick={() => {sendMessage(
                creds, 
                creds.activeChat, 
                { 
                  attachments:[],
                  files:[],
                  text: "text"}
          )
        }}
        >
          Create
        </button>
      </div>
    );
  };
  return (
    <div className="App">
      <div style={{opacity:0}}>
      <ChatEngine
        height="0vh"
        width="0"
        projectID="a9a4416e-994a-4bf8-91f2-0d4ace500fdc"
        userName={"Receiver"}
        userSecret={"Receiver"}
        renderChatList={() => { return(<div></div>)}}
        renderChatFeed={(chat) => ChatFeed(chat)}
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
        renderChatList={() => { return(<div></div>)}}
        renderChatFeed={(chat) => ChatFeed(chat)}
        renderChatSettingsTop={() => { }}
        renderPeopleSettings={() => { }}
        renderPhotosSettings={() => { }}
        renderOptionsSettings={() => { }}
        onNewMessage={(chat,msg) =>{
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
