import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";


const comments = [
    {
        postId: '123',
        commentId: '123',
        content: '123',
        status: '123'
    },
    {
        postId: '124',
        commentId: '124',
        content: '124',
        status: '124'
    }
]

const PostList = () => {

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


            <CommentList comments={comments} />
            <CommentCreate postId={post.id} />

        </div>
    ))

    return (
        <>
            <h1>Posts</h1>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                {renderedPosts}
            </div>
        </>
    )
}

export default PostList;