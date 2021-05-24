import './styles.css';
import { useEffect, useRef } from 'react';
import { TextField, Typography } from '@material-ui/core';
import CompanyCard from './components/company-card';
import Message from './components/message';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

const ManageView = ({ deal, currentChat, message, messages, onTypeMessage, sendMessage, setCurrentChatCompany, updateUnread, userId }: any) => {
  let messagesEnd = useRef();

  const scrollToBottom = () => {
    if (!deal.access || !deal.access.length) return;
    //@ts-ignore
    messagesEnd.current.scrollIntoView({  });
  };

  const renderAccounts = () => {
    return deal.access.map((a: any) => (
      <CompanyCard
        key={a._id}
        account={a.account}
        currentChat={currentChat}
        messages={messages}
        setCurrentChatCompany={setCurrentChatCompany}
        updateUnread={updateUnread}
        userId={userId}
      />
    ));
  };

  const renderMessages = () => {
    const messagesToRender = messages[currentChat._id] ?? [];

    return messagesToRender.map(m => (
      <Message key={m._id} message={m} userId={userId} />
    ));
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentChat])

  return deal.access && deal.access.length ? (
    <div className="Manage">
      <div style={{ marginBottom: 15 }}>
        <Typography variant="h5" className="title">
          {deal.title}
        </Typography>
      </div>
      <div className="Manage-chat">
        <div className="Manage-chat-companies">
          {renderAccounts()}
        </div>
        <div className="Manage-chat-content">
          <div className="Manage-chat-content-messages">
            <div className="Manage-chat-content-messages-list">
              {renderMessages()}
              <div
                style={{ float:"left", clear: "both" }}
                ref={messagesEnd}>
              </div>
            </div>
          </div>
          <div className="Manage-chat-content-input">
            <div className="Manage-chat-content-input-field">
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
            <div className="Manage-chat-content-input-button">
              <button
                className="no-style-button Manage-chat-content-input-button-send"
                onClick={sendMessage}
              >
                <SendRoundedIcon style={{ fontSize: 30, paddingLeft: 4, paddingTop: 3 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  : (
    <div className="Manage">
      <div style={{ marginBottom: 15 }}>
        <Typography variant="h5" className="title">
          {deal.title}
        </Typography>
      </div>
      <div>
        Add markets to this deal to begin chatting with reinsurers
      </div>
    </div>
  );
};

export default ManageView;
