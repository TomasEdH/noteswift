import { type Note } from "./types";
import { useState, useEffect } from "react";
interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(note.title); // Inicializar con el valor de la nota
  const [content, setContent] = useState<string>(note.content); // Inicializar con el valor de la nota
  const [tags, setTags] = useState<string>(note.tags); // Inicializar con el valor de la nota
  const [isPinned, setIsPinned] = useState<boolean>(note.isPinned);

  const handleEditNote = async () => {
    try {
      const res = await fetch(`http://localhost:1235/edit/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, tags, isPinned }),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags);
    setIsPinned(note.isPinned);
  }, [note]);

  return (
    <section>
      <div className="border-2 border-blue-400">
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        <p>{note.tags}</p>
        <p>{note.isPinned}</p>
      </div>
      {!isOpened && <button onClick={() => setIsOpened(true)}>Edit</button>}
      {isOpened && (
        <div className="bg-green">
          <button onClick={() => setIsOpened(false)}>Close</button>
          <form onSubmit={handleEditNote}>
            <input
              value={title}
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={content}
              placeholder="Content"
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              value={tags}
              type="text"
              placeholder="Tags"
              onChange={(e) => setTags(e.target.value)}
            />
            <button onSubmit={handleEditNote}>Guardar</button>
          </form>
        </div>
      )}
    </section>
  );
}
