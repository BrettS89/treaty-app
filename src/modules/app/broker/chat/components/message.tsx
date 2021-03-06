import { Typography } from '@material-ui/core';
import useStyles from '../styles';
import { formatDateTime } from '../../../../../utilities/helpers';

const Message = ({ message, userId }) => {
  const classes = useStyles();

  const colorStyle = userId === message.user_id
    ? { color: '#F44436' }
    : {};

  return (
    <div className="Manage-chat-content-messages-message">
      <Typography
        className={classes.messageUsername}
        color="primary"
        style={colorStyle}
      >
        {message.user.firstname} {message.user.lastname} {formatDateTime(message.createdAt)}:
      </Typography>
      <Typography>
        {message.message}
      </Typography>
    </div>
  );
};

export default Message;
