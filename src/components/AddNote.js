import React, { useContext, useState, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

function AddNote(props) {

    const context = useContext(NoteContext);
    const { addNote, getNote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "Todo" })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        let jsonError = await addNote(note.title, note.description, note.tag)
        if (jsonError) {
            jsonError.errors.map((err) => {
                if (err.param === 'title') {
                    setErrors((prev) => ({ ...prev, title: err.msg }))
                } else {
                    setErrors((prev) => ({ ...prev, description: err.msg }))
                }
            })
        } else {
            setnote({ title: "", description: "", tag: "" })
            setErrors({})
            props.showAlert("Note added successfully", "success")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote()
        } else {
            navigate('/login')

        }
        // eslint-disable-next-line

    }, [])

    return (
        <div className='form'>
            <div className='mt-5 mb-4'>
                <div className="text-center">
                    <h3>✍🏻 Add A New Note:</h3>
                </div>
                <div className="mb-3 my-4">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <select className="form-select" aria-label="Default select example" id="tag" value={note.tag} onChange={onchange} name="tag">

                        <option value="Todo">Todo</option>
                        <option value="Important">Important</option>
                        <option value="Academic">Academic</option>
                        <option value="Personal">Personal</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="mb-3 input-container">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} onChange={onchange} name="title" />
                    {errors.title && <span className='error'><i className="fa fa-info-circle"></i> {errors.title}</span>}
                </div>
                <div className="mb-3 input-container">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={note.description} onChange={onchange} rows="3"></textarea>
                    {errors.description && <span className='error'><i className="fa fa-info-circle"></i> {errors.description}</span>}
                </div>
                <div className='text-center'>
                    <button className='btn btn-primary' onClick={handleClick}>Add Note</button>
                </div>


            </div>

            <a href="/notes"><p className='text-center'>View your notes &gt;</p></a>

        </div>
    )
}

export default AddNote