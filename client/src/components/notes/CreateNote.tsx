import React, { useState } from "react";
import TagInput from "./TagInput.tsx";
import { IoClose } from "react-icons/io5";
import { Note } from "../../types.ts";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export default function CreateNote({ setIsOpen, setNotes }: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    try {
      const res = await fetch("http://localhost:1235/new-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, tags }),
        credentials: "include",
      });
      const newNote = await res.json();
      setNotes(prevNotes => [...prevNotes, newNote])
      setIsOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed flex inset-0 z-10 bg-black bg-opacity-50 justify-center items-center text-white">
      <div className="rounded-md dark:bg-[#1e1e1e] text-black bg-white p-4">
        <form
          className="flex flex-col gap-7 w-[700px]"
          onSubmit={(e) => {
            handleCreateNote(e)
          }}
        >
          <div className="flex justify-between gap-x-5">
            <input
              type="text"
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
            placeholder="¿Qué deseas anotar?"
            className=" p-2 rounded-lg h-[400px] resize-none bg-slate-200/50 outline-none"
            onChange={(e) => setContent(e.target.value)}
          />
          <TagInput tags={tags} setTags={setTags} />
          <button
            disabled={!title || !content}
            className='disabled:bg-primary/40 disabled:text-black/30 disabled:pointer-events-none bg-primary mx-10 px-4 py-2 rounded-lg hover:bg-primary transition-all durations-300 hover:scale-105 font-medium hover:cursor-pointer'
            type="submit"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

/* className={`${!title || !content ? ' disabled:' : 'bg-primary mx-10 px-4 py-2 rounded-lg hover:bg-primary transition-all durations-300 hover:scale-105 font-medium hover:cursor-pointer'}`} */
