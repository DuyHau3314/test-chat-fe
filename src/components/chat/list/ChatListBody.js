import PropTypes from 'prop-types';

const ChatListBody = ({ data, profile }) => {
  return (
    <div className="conversation-message">
      <span>{data.lastMessage}</span>
    </div>
  );
};

ChatListBody.propTypes = {
  data: PropTypes.object,
  profile: PropTypes.object
};

export default ChatListBody;
