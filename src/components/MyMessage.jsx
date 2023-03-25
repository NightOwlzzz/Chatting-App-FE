import React, { useEffect, useState } from "react";

function MyMessage({ message }) {
  const [newMessage, setNewMessage] = useState()
  useEffect(() => {
    const oneMessage = message.text.replace('<p>', '');
    const twoMessage = oneMessage.replace('</p>', '');
    setNewMessage(twoMessage)
  }, [message])
  if (message.attachments && message.attachments.length > 0) {
    return (
      <img
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: "right" }}
      />
    );
  }

  return (
    <div
      className="message"
      style={{
        float: "right",
        marginRight: "18px",
        color: "white",

        backgroundColor: "#3B2A50",
      }}
    >
      {newMessage}
    </div>
  );
}

export default MyMessage;
