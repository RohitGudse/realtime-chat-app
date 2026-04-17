function Message({ message }) {
  return (
    <div>
      <strong>{message.username}</strong>: {message.message}
    </div>
  );
}

export default Message;