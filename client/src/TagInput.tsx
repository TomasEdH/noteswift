import React, { useState } from "react";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags] + inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  }

  return (
    <section>
      <div>
        {tags?.length > 0 && (
          <div>
            {tags.map((tag, index) => (
              <div key={index}>
                #{tag}
                <button
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => addNewTag()}>Add tag</button>
      </div>
    </section>
  );
};

export default TagInput;
