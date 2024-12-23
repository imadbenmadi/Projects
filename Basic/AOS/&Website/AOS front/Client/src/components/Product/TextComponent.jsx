import React, { useState } from "react";

function TextComponent({ text, maxLength }) {
  const [showAllText, setShowAllText] = useState(false);

  const toggleShowText = () => {
    setShowAllText(!showAllText);
  };

  return (
    <div className="w-full text-sm md:text-lg">
      {showAllText ? (
        <div>
          {text}
          <button className="text-red-500" onClick={toggleShowText}>
            Show Less
          </button>
        </div>
      ) : (
        <div>
          {text.slice(0, 10)} {/* Display first 100 characters */}
          {text.length > 10 && (
            <button className="text-red-500" onClick={toggleShowText}>
              Show More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TextComponent;
