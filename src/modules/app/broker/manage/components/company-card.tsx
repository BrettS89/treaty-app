import { Typography } from '@material-ui/core';

const CompanyCard = ({ account, currentChat, messages, setCurrentChatCompany, updateUnread, userId, }) => {
  const companyName = account.name.length > 28
    ? account.name.slice(0, 28) + '...'
    : account.name;

  const unread = messages[account._id].reduce((acc, curr) => {
    if (!curr.read.includes(userId)) return acc + 1;
    return acc;
  }, 0);

  if (unread > 0) {
    const unread = messages[account._id].filter(m => {
      return !m.read.includes(userId);
    });

    setTimeout(() => {
      updateUnread(unread);
    }, 10000);
  }

  const renderUnread = () => {
    if (unread !== 0) {
      return (
        <span
          className="Manage-chat-companies-company-messages"
          style={{ fontWeight: 600, color: '#F44436' }}
        >
          {unread} Unread
        </span>
      ); 
    }
    return <span className="Manage-chat-companies-company-messages">{unread} Unread</span>
  }

  const color = currentChat._id === account._id
    ? 'primary'
    : 'inherit'

  return (
    <div className="Manage-chat-companies-company" onClick={() => setCurrentChatCompany(account)}>
      <Typography color={color} className="Manage-chat-companies-company-name">
        {companyName}
      </Typography>
      <span className="Manage-chat-companies-company-messages" style={{ marginRight: 10 }}>{messages[account._id]?.length} Messages</span>
      {renderUnread()}
    </div>
  )
};

export default CompanyCard;
