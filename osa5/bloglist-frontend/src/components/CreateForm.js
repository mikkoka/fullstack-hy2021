import React, { useState } from 'react'

const CreateForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const submitBlog = async () => {
    await handleNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitBlog}>
        <input
          id='title'
          type="text"
          name="newTitle"
          placeholder="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br/>
        <input
          id='author'
          type="text"
          name="newAuthor"
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br/>
        <input
          id='url'
          type="text"
          name="newUrl"
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br/>
        <button

          type="submit">create
        </button>
      </form>
    </div>
  )
}

export default CreateForm