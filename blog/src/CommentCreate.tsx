import axios from "axios";
import React, { useState } from "react";

interface Prop {
    postId: string;
}

const CommentCreate = ({ postId }: Prop) => {
    const [comment, setComment] = useState("")


    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:8001/posts/${postId}/comments`, { content: comment })
        setComment("")
    }

    return <div>
        <p>Comments</p>

        <form onSubmit={onSubmit} className="form-group">
            <div>
                <label>New comment</label>
                <input type="text" className="form-input" value={comment} onChange={e => setComment(e.target.value)} />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default CommentCreate;