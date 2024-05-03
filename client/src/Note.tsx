import React, { useState } from "react";
import TagInput from "./TagInput.tsx";

export default function NoteComponent() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPinned, setIsPinned] = useState<boolean>(false);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1235/new-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, tags, isPinned }),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div>
      <form onSubmit={handleCreateNote}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <TagInput 
          tags={tags} 
          setTags={setTags}
        />
        <input
          type="checkbox"
          onChange={(e) => setIsPinned(e.target.checked)}
        />
        <button type="submit">Crear</button>
      </form>

      {JSON.stringify({ title, content, tags, isPinned})}
    </div>
  );
}
