const Form = ({addNote, newNote, handleNoteChange, user, handleLogOut}) => {

  const noteForm = () => (
    <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
  )

  const logOut = () => (
      <button onClick={handleLogOut}>log out</button>
  )

return (
  <>
  {user && <div>
    <p>{user.name} logged in</p>
    {logOut()}
    {noteForm()}
    </div>
  }
  </>
)
}

export default Form