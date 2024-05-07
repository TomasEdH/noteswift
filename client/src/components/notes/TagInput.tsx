import React, { useState } from "react";
import { IoClose } from "react-icons/io5"
import { IoAdd } from "react-icons/io5";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
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
      <div className="mb-4">
        {tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex gap-x-2 items-center p-2 bg-primary rounded-sm dark:bg-[#181717]">
                # {tag}
                <button
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* creamos un nuevo formulario para evitar que envie automaticamente el formulario del componente NoteComponent al agregar una nueva nota */}
      <form onSubmit={addNewTag} className="flex items-center gap-x-2">
        <input
        className="outline-none rounded-md p-2 bg-slate-200/50"
          type="text"
          value={inputValue}
          placeholder="Nuevo tag"
          onChange={handleInputChange}
        />
        <button onClick={addNewTag}>
          <IoAdd size={20} className="transition-all hover:scale-125" />
        </button>
      </form>
    </section>
  );
};

export default TagInput;
