const Form = ({handleLogin, username, setUsername, password, setPassword,
  addNote, newNote, handleNoteChange, user}) => {
  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({target}) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
  )

return (
  <>
  {!user && loginForm()}
  {user && <div>
    <p>{user.name} logged in</p>
    {noteForm}
    </div>
  }
  </>
)
}

export default Form