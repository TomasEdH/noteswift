import { useEffect, useState } from "react";
import { type Note } from "./types";
import NoteCard from "./NoteCard";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import NoteComponent from "./Note";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchNotes = () => {
      fetch("http://localhost:1235/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setNotes(data.notes);
          console.log(data.notes);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    fetchNotes();
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  console.log(document?.cookie);

  return (
    <div>
      <h1>Notes</h1>
      <p>Here you can see your notes</p>
      {notes?.length > 0 ? (
        <ul className="flex gap-x-10 items-center justify-center mt-10">
          {notes.map((note, index) => (
            <NoteCard key={index} note={note} />
          ))}
        </ul>
      ) : (
        <p>No notes</p>
      )}

      <button onClick={() => setIsOpen(!isOpen)}>+</button>
      {isOpen && <NoteComponent />}
    </div>
  );
}
