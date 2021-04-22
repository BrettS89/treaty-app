import { Typography } from '@material-ui/core';
import useStyles from '../styles';

const Message = ({ message }) => {
  const classes = useStyles();

  return (
    <div className="Manage-chat-content-messages-message">
      <Typography className={classes.messageUsername} color="primary">
        {message.user.firstname} {message.user.lastname} {message.createdAt}:
      </Typography>
      <Typography>
        {message.message}
      </Typography>
    </div>
  );
};

export default Message;
