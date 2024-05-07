
import NoteImg from "./assets/notes-note-svgrepo-com.svg";
import NoteImgLight from './assets/notes-note-svgrepo-white.svg';
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function EmptyNotes() {

  const { theme } = useContext(ThemeContext);

  return (
    <section className="flex flex-col justify-center items-center mt-12">
      {theme === "dark" ? (
        <img src={NoteImgLight} className="w-[310px] opacity-85" />
      ) : (
        <img src={NoteImg} className="w-[310px]" />
      )}
      <h3 className="mt-2 text-xl font-semibold">No se han encontrado notas.</h3>
      <p className="text-md font-medium">
        Haz clic en el boton "Crear Nota" para crear y plasmar tus nuevas ideas
        y pensamientos.
      </p>
    </section>
  );
}
