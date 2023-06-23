const Create = ({newTitle, newAuthor, newUrl, handleTitleInput, handleAuthorInput, handleUrlInput, handleBlogInput}) => {
  return (
    <form>
      <div>
        title: <input value={newTitle} onChange={handleTitleInput}/>
      </div>
      <div>
        author: <input value={newAuthor} onChange={handleAuthorInput}/>
      </div>
      <div>
        url: <input value={newUrl} onChange={handleUrlInput}/>
      </div>
      <div>
        <button type="submit" onClick={handleBlogInput}>
          create
        </button>
      </div>
    </form>
  )
}

export default Create