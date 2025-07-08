import React from 'react'

interface Comment {
    postId: string,
    commentId: string,
    content: string,
    status: string
}

interface Comments {
    comments: Comment[]
}

const CommentList = ({ comments }: Comments) => {

    const renderedComments = comments.map(comment => <li key={comment.commentId}>
        <p>{comment.content}</p>
    </li>)

    return (
        <div>
            <ul>
                {renderedComments}
            </ul>
        </div>
    )
}

export default CommentList