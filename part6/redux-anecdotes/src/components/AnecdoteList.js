import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter})=> {
    if (!filter) {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })


  const dispatch = useDispatch()

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList