import './styles.css';
import { TextField, Typography } from '@material-ui/core';
import CompanyCard from './components/company-card';
import Message from './components/message';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

const ManageView = ({ deal, currentChat, messages, setCurrentChatCompany }: any) => {
  const renderAccounts = () => {
    return deal.access.map((a: any) => (
      <CompanyCard
        key={a._id}
        account={a.account}
        currentChat={currentChat}
        setCurrentChatCompany={setCurrentChatCompany}
      />
    ));
  };

  const renderMessages = () => {
    const messagesToRender = messages[currentChat._id] ?? [];

    return messagesToRender.map(m => (
      <Message message={m} />
    ));
  };

  return (
    <div className="Manage">
      <div style={{ marginBottom: 30 }}>
        <Typography variant="h4" className="title">
          {deal.title}
        </Typography>
      </div>
      <div className="Manage-chat">
        <div className="Manage-chat-companies">
          {renderAccounts()}
        </div>
        <div className="Manage-chat-content">
          <div className="Manage-chat-content-messages">
            <Typography variant="h6">Chat with {currentChat.name}</Typography>
            <div className="Manage-chat-content-messages-list">
              {renderMessages()}
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
              />
            </div>
            <div className="Manage-chat-content-input-button">
              <button className="no-style-button Manage-chat-content-input-button-send">
                <SendRoundedIcon style={{ fontSize: 30, paddingLeft: 4, paddingTop: 3 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageView;
