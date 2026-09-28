import { useState } from "react";
import "./App.css";

function App() {
  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");

  const maxLength = platform === "Twitter" ? 280 : 3000;

  const characterCount = post.length;
  const isExceeded = characterCount > maxLength;

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
    setMessage("");
  };

  const handlePostChange = (event) => {
    setPost(event.target.value);
    setMessage("");
  };

  const handlePost = () => {
    if (post.trim() === "") {
      setMessage("Please write something before posting.");
      return;
    }

    if (isExceeded) {
      setMessage(
        `Post exceeds the ${maxLength} character limit for ${platform}.`
      );
      return;
    }

    setMessage(`Post successfully prepared for ${platform}!`);
  };

  return (
    <div className="container">
      <div className="composer">
        <h1>Post Composer</h1>

        <div className="platform-section">
          <label>Select Platform:</label>

          <select value={platform} onChange={handlePlatformChange}>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>

        <div className="textarea-section">
          <label>Write your post:</label>

          <textarea
            value={post}
            onChange={handlePostChange}
            placeholder={`Write your ${platform} post here...`}
          />
        </div>

        <div className={`character-count ${isExceeded ? "error" : ""}`}>
          {characterCount} / {maxLength} characters
        </div>

        {isExceeded && (
          <p className="error-message">
            Your post exceeds the {maxLength}-character limit for {platform}.
          </p>
        )}

        <button
          onClick={handlePost}
          disabled={isExceeded || post.trim() === ""}
        >
          Post to {platform}
        </button>

        {message && (
          <p
            className={
              message.includes("successfully")
                ? "success-message"
                : "error-message"
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
