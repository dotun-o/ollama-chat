import ollamaChatLogo from "../../assets/ollama-chat-logo.svg";

import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <h1>
        <img src={ollamaChatLogo} />
        <span>OLLAMA CHAT</span>
      </h1>
    </header>
  );
}

export default Header;
