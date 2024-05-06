import { useEffect, useState } from "react";
import { type Note } from "./types";
import NoteCard from "./NoteCard";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import NoteComponent from "./Note";
import { MdAddCircleOutline } from "react-icons/md";
import EmptyNotes from "./EmptyNotes";


export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const token = Cookies.get("token");

  const searchNotes = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `http://localhost:1235/notes/search?searchTerm=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      return data.notes;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await searchNotes(searchValue);
      setNotes(notes);
    };

    fetchNotes();
  }, [searchValue]);

  function sortNotes(notes: Note[]) {
    return [...notes].sort((a, b) => {
      if (a.isPinned && !b.isPinned) {
        return -1;
      }
      if (!a.isPinned && b.isPinned) {
        return 1;
      }

      return 0;
    });
  }

  const updateNotesOrder = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note._id === updatedNote._id ? updatedNote : note
    );
    const sortedNotes = sortNotes(updatedNotes);
    setNotes(sortedNotes);
  };

  const deleteNote = async (noteId: number) => {
    setNotes(notes.filter((note) => note._id !== noteId));
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className=" relative flex flex-col items-center mt-10">
      <input
        type="text" 
        placeholder="Search notes..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="border-[2px] border-black/60 dark:border-white p-2 rounded-lg w-96 bg-transparent font-medium text-lg mt-10 outline-none focus:border-primary focus:border-2 "
      />
      {notes?.length > 0 ? (
        <ul className="grid grid-cols-3 gap-10 items-center justify-center mt-10">
          {sortNotes(notes).map((note, index) => (
            <NoteCard
              key={index}
              note={note}
              updateNotesOrder={updateNotesOrder}
              deleteNote={deleteNote}
              setIsOpen={setIsOpen}
            />
          ))}
        </ul>
      ) : (
        <EmptyNotes/>
      )}

      <button
        className="fixed flex justify-center items-center gap-x-1 transition-all durations-300 hover:scale-110 bottom-10 right-20 rounded-lg bg-primary p-4 font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        Crear nota<MdAddCircleOutline size={23}/>
      </button>
      {isOpen && <NoteComponent setNotes={setNotes} setIsOpen={setIsOpen} />}
    </div>
  );
}
