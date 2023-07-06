import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (err) => {
      console.log('err', err)
      dispatch({type: 'SHOW', payload: `Error: ${err.message}. Anecdote must be atleast 5 chars long.`})
      setTimeout(() => {
      dispatch({type: 'HIDE'})
    }, 5000)
    }
  })




  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    dispatch({type: 'SHOW', payload: `Anecdote ${content} created`})
    setTimeout(() => {
      dispatch({type: 'HIDE'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
