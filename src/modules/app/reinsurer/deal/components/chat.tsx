import { useRef, useEffect } from 'react';
import { TextField, Typography } from '@material-ui/core';
import useStyles from '../styles';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Message from '../../../broker/chat/components/message';

const Chat = ({ message, messages, onTypeMessage, sendMessage, updateUnread, userId }) => {
  console.log('HI');
  const classes = useStyles();

  const messagesEnd = useRef();

  const scrollToBottom = () => {
    //@ts-ignore
    messagesEnd.current.scrollIntoView({  });
  };

  const unread = messages.reduce((acc, curr) => {
    if (!curr.read.includes(userId)) return acc + 1;
    return acc;
  }, 0);

  if (unread > 0) {
    const unread = messages.filter(m => {
      return !m.read.includes(userId);
    });

    setTimeout(() => {
      updateUnread(unread);
    }, 2000);
  }

  const renderMessages = () => {
    return messages.map(m => {
      return (
        <Message
          key={m._id}
          message={m}
          userId={userId}
        />
      );
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="re-chat">
      <Typography variant="h6" className={classes.detailsSectionTitle}>
        Chat
      </Typography>
      <div className="re-chat-main">
        <div className="re-chat-messages">
          {renderMessages()}
          <div
            style={{ float:"left", clear: "both" }}
            ref={messagesEnd}>
          </div>
        </div>
        <div className="re-chat-input">
          <div className="re-chat-input-field">
            <TextField
              multiline
              style={{ width: '100%' }}
              rows={3}
              placeholder="Type your message"
              InputProps={{ disableUnderline: true }}
              value={message}
              onChange={onTypeMessage}
            />
          </div>
          <div className="re-chat-input-button">
            <button
              className="no-style-button re-chat-input-button-send"
              onClick={sendMessage}
            >
              <SendRoundedIcon
                style={{ fontSize: 26, paddingLeft: 4, paddingTop: 3 }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
