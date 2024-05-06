import { type Note } from "./types";
import { useState, useEffect } from "react";
import TagInput from "./TagInput";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiPushpin2Line } from "react-icons/ri"
import { RiPushpin2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

interface NoteCardProps {
  note: Note;
  updateNotesOrder: (updatedNote: Note) => void;
  deleteNote: (id: number) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function NoteCard({
  note,
  updateNotesOrder,
  deleteNote,
  setIsOpen
}: NoteCardProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);
  const [tags, setTags] = useState<string[]>(note.tags) ;

  const handleUpdatePin = async () => {
    try {
      const res = await fetch(`http://localhost:1235/pin/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPinned: !note.isPinned }),
        credentials: "include",
      });
      const data = await res.json();
      updateNotesOrder(data.note);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteNote = async () => {
    try {
      const res = await fetch(`http://localhost:1235/delete/${note._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      deleteNote(note._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditNote = async () => {
    try {
      const res = await fetch(`http://localhost:1235/edit/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, tags }),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log([note.tags]);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags);
  }, [note]);

  return (
    <section>
      <div className="border-2 border-primary py-10 px-4 text-start w-[500px]">
        <div className="flex justify-between flex-row-reverse mb-4">
          <button onClick={handleUpdatePin}>
            {note.isPinned ? 
            <RiPushpin2Fill size={27} /> : <RiPushpin2Line size={27}/>}
          </button>
          <h1 className="text-2xl font-medium truncate w-[90%]">
            {note.title}
          </h1>
        </div>
        <p className="opacity-70 font-medium">
          {note.createdAt?.split("T").slice(0, 1)}
        </p>
        <p className="truncate">{note.content}</p>
        <div className="flex items-center gap-x-2 truncate">
          {note.tags && note.tags.map((tag, index) => (
            <p key={index} className="font-medium opacity-65">
              #{tag}
            </p>
          ))}
        </div>
        <div className="flex justify-end gap-x-2">
          <button onClick={() => setIsOpened(!isOpened)}>
          <RiEditLine size={27}/>
          </button>
          <button onClick={handleDeleteNote}>
            <RiDeleteBin6Line size={27} />
          </button>
        </div>
      </div>
      {isOpened && (
        <div className="fixed flex inset-0 z-10 bg-black bg-opacity-50 justify-center items-center text-white">
        <div className="rounded-md dark:bg-[#1e1e1e] text-black bg-white p-4">
          <form
            className="flex flex-col gap-7 w-[700px]"
            onSubmit={handleEditNote}
          >
            <div className="flex justify-between gap-x-5">
              <input
                type="text"
                value={title}
                spellCheck="false"
                placeholder="Estudiar para mi próximo examen"
                className="py-3 px-2 text-3xl rounded-lg bg-transparent outline-none flex-1 h-12"
                onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={() => setIsOpen(false)} className="mr-3">
                <IoClose size={23} />
              </button>
            </div>
            <textarea
              value={content}
              placeholder="¿Qué deseas anotar?"
              className=" p-2 rounded-lg h-[400px] resize-none bg-slate-200/50 outline-none"
              onChange={(e) => setContent(e.target.value)}
            />
            <TagInput tags={tags} setTags={setTags} />
            <button
              disabled={!title || !content}
              className='disabled:bg-primary/40 disabled:text-black/30 disabled:pointer-events-none bg-primary mx-10 px-4 py-2 rounded-lg hover:bg-primary transition-all durations-300 hover:scale-105 font-medium hover:cursor-pointer'
              type="submit"
              onClick={() => setIsOpen(false)}
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
      )}
    </section>
  );
}
