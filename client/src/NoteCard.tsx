import { type Note } from "./types";
import { useState, useEffect } from "react";
import TagsInput from "./TagInput";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiPushpin2Line } from "react-icons/ri"
import { RiPushpin2Fill } from "react-icons/ri";

interface NoteCardProps {
  note: Note;
  updateNotesOrder: (updatedNote: Note) => void;
  deleteNote: (id: number) => void;
}

export default function NoteCard({
  note,
  updateNotesOrder,
  deleteNote,
}: NoteCardProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);
  const [tags, setTags] = useState<string[]>(note.tags);

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

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setTags([...note.tags]);
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
          {note.createdAt.split("T").slice(0, 1)}
        </p>
        <p className="truncate">{note.content}</p>
        <div className="flex items-center gap-x-2 truncate">
          {note.tags.map((tag) => (
            <p className="opacity-70 font-medium">#{tag}</p>
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
        <div>
          <div className="bg-green">
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
              <TagsInput tags={tags} setTags={setTags} />
              <button onSubmit={handleEditNote}>Guardar</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
