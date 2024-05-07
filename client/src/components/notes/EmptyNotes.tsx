import { useContext } from 'react';
import NoteImg from '../../assets/emptynotes.svg';
import NoteImgLight from '../../assets/emptynotes-white.svg';
import { ThemeContext } from "../../ThemeContext";

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
