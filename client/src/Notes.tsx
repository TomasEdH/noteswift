import { useEffect, useState } from "react";
import { type Note } from "./types"
import NoteCard from "./NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:1235/notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        setNotes(data.notes);
        console.log(data.notes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, []);
  
  return (
    <div>
      <h1>Notes</h1>
      <p>Here you can see your notes</p>
      {notes.length > 0 ? (
        <ul className="flex gap-x-10 items-center justify-center mt-10">
            {notes.map((note, index) => (
                <NoteCard
                    key={index}
                    note={note}
                />
            ))}
        </ul>
      ) : <p>No notes</p>}
    </div>
  );
}
