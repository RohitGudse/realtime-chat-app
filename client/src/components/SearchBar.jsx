
import React, { useMemo, useState } from "react";
import "./SearchBar.css";

const SearchBar = ({
  users = [],
  chats = [],
  onSelectUser,
  onSelectChat,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return [];

    return users.filter((user) =>
      (user.name || user.username || "")
        .toLowerCase()
        .includes(query)
    );
  }, [users, searchTerm]);

  const filteredChats = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return [];

    return chats.filter((chat) => {
      const name = chat.name || chat.username || "";
      const message =
        typeof chat.lastMessage === "string"
          ? chat.lastMessage
          : chat.lastMessage?.text || "";

      return (
        name.toLowerCase().includes(query) ||
        message.toLowerCase().includes(query)
      );
    });
  }, [chats, searchTerm]);

  const getInitials = (name = "User") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <div className="wa-search">
      <div className="wa-search__input-wrap">
        <span className="wa-search__icon" aria-hidden="true">
          ⌕
        </span>

        <input
          type="search"
          className="wa-search__input"
          placeholder="Search users or chats..."
          aria-label="Search users or chats"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        {searchTerm && (
          <button
            type="button"
            className="wa-search__clear"
            aria-label="Clear search"
            onClick={() => setSearchTerm("")}
          >
            ×
          </button>
        )}
      </div>

      {searchTerm.trim() && (
        <div className="wa-search__results">
          {filteredUsers.length > 0 && (
            <section className="wa-search__section">
              <h4>Users</h4>

              {filteredUsers.map((user) => {
                const name = user.name || user.username || "Unknown user";

                return (
                  <button
                    type="button"
                    className="wa-search__item"
                    key={user.id ?? user._id ?? user.username ?? name}
                    onClick={() => onSelectUser?.(user)}
                  >
                    <span className="wa-search__avatar">
                      {user.avatar || user.profilePic ? (
                        <img
                          src={user.avatar || user.profilePic}
                          alt=""
                        />
                      ) : (
                        getInitials(name)
                      )}
                    </span>

                    <span className="wa-search__details">
                      <strong>{name}</strong>
                      <small>{user.about || user.status || "User"}</small>
                    </span>
                  </button>
                );
              })}
            </section>
          )}

          {filteredChats.length > 0 && (
            <section className="wa-search__section">
              <h4>Chats</h4>

              {filteredChats.map((chat) => {
                const name = chat.name || chat.username || "Unknown chat";
                const message =
                  typeof chat.lastMessage === "string"
                    ? chat.lastMessage
                    : chat.lastMessage?.text || "No messages yet";

                return (
                  <button
                    type="button"
                    className="wa-search__item"
                    key={chat.id ?? chat._id ?? name}
                    onClick={() => onSelectChat?.(chat)}
                  >
                    <span className="wa-search__avatar">
                      {chat.avatar || chat.profilePic ? (
                        <img
                          src={chat.avatar || chat.profilePic}
                          alt=""
                        />
                      ) : (
                        getInitials(name)
                      )}
                    </span>

                    <span className="wa-search__details">
                      <strong>{name}</strong>
                      <small>{message}</small>
                    </span>
                  </button>
                );
              })}
            </section>
          )}

          {filteredUsers.length === 0 &&
            filteredChats.length === 0 && (
              <p className="wa-search__empty">
                No users or chats found.
              </p>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
