import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function NoteItems(props) {
  const { note, updateNote } = props;

  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const handleDelete = () => {
    deleteNote(note._id);
    props.showAlert("Note is deleted successfully", "success");
  };

  let date = note.date;
  date = date.slice(0, -14).split("-").reverse().join("-");

  const formatDescription = (description) => {
    // Regex to find URLs and convert them to clickable links
    const urlRegex = /((http|https):\/\/[^\s]+)/g;
    const textWithLinks = description.replace(
      urlRegex,
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );

    // Convert new lines to <br> tags and return the formatted HTML
    return textWithLinks.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        <span dangerouslySetInnerHTML={{ __html: line }} />
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="col-md-4 my-2">
      <div className="card ">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title} </h5>
            <p>
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={handleDelete}
              />
              <i
                className="fa-regular fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              />
            </p>
          </div>
          <p>
            <b>{note.tag}</b>
          </p>
          <p className="card-text">{formatDescription(note.description)}</p>
          <p className="text-secondary small text-end ">
            <small>{date} </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoteItems;
