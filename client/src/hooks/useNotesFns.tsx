import { type Note } from "../types";

// This hook is created to handle the logic of notes in the app that may be reused in future components.
export const useNotesFns = ({
    notes,
    setNotes,
    }: {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) => {
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
  };

  return { sortNotes, updateNotesOrder, deleteNote };
};
