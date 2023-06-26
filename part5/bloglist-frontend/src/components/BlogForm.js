import { useState } from "react"

const Create = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = { title: newTitle, author: newAuthor, url: newUrl }

    createBlog(newBlog)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form>
      <div>
        title: <input value={newTitle} onChange={event => setNewTitle(event.target.value)}/>
      </div>
      <div>
        author: <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)}/>
      </div>
      <div>
        url: <input value={newUrl} onChange={event => setNewUrl(event.target.value)}/>
      </div>
      <div>
        <button type="submit" onClick={addBlog}>
          create
        </button>
      </div>
    </form>
  )
}

export default Create