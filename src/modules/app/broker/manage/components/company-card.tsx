import { Typography } from '@material-ui/core';

const CompanyCard = ({ account, currentChat, setCurrentChatCompany }) => {
  const companyName = account.name.length > 28
    ? account.name.slice(0, 28) + '...'
    : account.name;

  const color = currentChat._id === account._id
    ? 'primary'
    : 'inherit'

  return (
    <div className="Manage-chat-companies-company" onClick={() => setCurrentChatCompany(account)}>
      <Typography color={color} className="Manage-chat-companies-company-name">
        {companyName}
      </Typography>
      <span className="Manage-chat-companies-company-messages" style={{ marginRight: 10 }}>10 Messages</span>
      <span className="Manage-chat-companies-company-messages">2 Unread</span>
    </div>
  )
};

export default CompanyCard;
