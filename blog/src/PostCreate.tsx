import React, { useState } from "react";
import axios from "axios";

export default () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:8000/posts', { title })
        setTitle('');
    }
    return <>
        <div>
            <h1>Create Post</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
}