
import React from "react";
import "./UserProfile.css";

const UserProfile = ({
  user = {},
  onClose,
  onMessage,
}) => {
  const name = user.name || user.username || "Unknown User";
  const about = user.about || user.status || "Available on WhatsApp";
  const phone = user.phone || user.phoneNumber || "Not provided";
  const avatar = user.avatar || user.profilePic || user.profileImage;
  const isOnline = Boolean(user.isOnline ?? user.online);

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <section className="wa-profile">
      <header className="wa-profile__header">
        <h2>Contact Info</h2>

        {onClose && (
          <button
            type="button"
            className="wa-profile__close"
            aria-label="Close profile"
            onClick={onClose}
          >
            ×
          </button>
        )}
      </header>

      <div className="wa-profile__identity">
        <div className="wa-profile__avatar">
          {avatar ? (
            <img src={avatar} alt={`${name}'s profile`} />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <h3>{name}</h3>

        <p className="wa-profile__phone">{phone}</p>

        <span
          className={`wa-profile__status ${
            isOnline ? "is-online" : "is-offline"
          }`}
        >
          <span className="wa-profile__status-dot" />
          {isOnline ? "Online" : "Offline"}
        </span>

        {onMessage && (
          <button
            type="button"
            className="wa-profile__message-btn"
            onClick={() => onMessage(user)}
          >
            <span aria-hidden="true">↗</span> Message
          </button>
        )}
      </div>

      <div className="wa-profile__info">
        <div className="wa-profile__info-item">
          <span className="wa-profile__label">About</span>
          <p>{about}</p>
        </div>

        <div className="wa-profile__info-item">
          <span className="wa-profile__label">Phone number</span>
          <p>{phone}</p>
        </div>

        {user.email && (
          <div className="wa-profile__info-item">
            <span className="wa-profile__label">Email</span>
            <p>{user.email}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
