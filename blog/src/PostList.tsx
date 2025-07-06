import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"

export default () => {

    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:8000/posts');
        setPosts(res.data.data.posts);
    }

    useEffect(() => {
        fetchPosts();
    }, [])



    const renderedPosts = Object.values(posts).map(post => (
        <div className="card" style={{
            width: '30%',
            marginBottom: '20px'
        }} key={post.id}>
            <div className="card-body">
                <h3>{post.title}</h3>
            </div>
        </div>
    ))

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}