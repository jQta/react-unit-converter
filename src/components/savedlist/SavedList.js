import { useEffect } from "react";

export default function SavedList({ saved, setSaved }) {
  const onDelete = index => {
    const newSaved = [...saved];
    newSaved.splice(index, 1);
    setSaved(newSaved);
  };

  useEffect(() => {
    localStorage.setItem("Saved_Converts", JSON.stringify(saved));
  }, [saved]);

  const savedList = JSON.parse(localStorage.getItem("Saved_Converts"));

  useEffect(() => {
    if (savedList) setSaved(savedList);
    // eslint-disable-next-line
  }, []);

  return (
    <ul className="saved-box__info">
      {saved.map((item, index) => (
        <li className="saved-box__info--item" key={index}>
          {item}
          <span className="saved-box__delete" onClick={() => onDelete(index)}>
            x
          </span>
        </li>
      ))}
    </ul>
  );
}
