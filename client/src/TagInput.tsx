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

  const addNewTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };


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
      {/* creamos un nuevo formulario para evitar que envie automaticamente el formulario del componente NoteComponent al agregar una nueva nota */}
      <form onSubmit={addNewTag}>
        <input
          type="text"
          value={inputValue}
          placeholder="Tags"
          onChange={handleInputChange}
        />
        <button onClick={addNewTag}>Add tag</button>
      </form>
    </section>
  );
};

export default TagInput;
