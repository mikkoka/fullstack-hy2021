import React, { useState } from 'react'

const NewComment = ({ createComment }) => {
  const [comment, setComment] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()
    createComment({ comment })
    setComment('')

  }

  return (
    <div>
      <form onSubmit={handleNewComment}>
        <div>
          <input
            id='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          /><button id="create">add comment</button>
        </div>
      </form>
    </div>
  )
}

export default NewComment