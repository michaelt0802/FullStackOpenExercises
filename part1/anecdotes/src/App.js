import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

// returns tuple
function getMaxValueAndIndex (array) {
  let maxIndex = 0;
  let max = 0;

  for(var i = 0; i < array.length; i++) {
    if(array[i] > max) {
      maxIndex = i
      max = array[i];
    }
  }

  return [maxIndex, max];
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const max = getMaxValueAndIndex(votes);

  const handleNextClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  const handleVoteClick = () => {
    const updateVotes = [...votes];
    updateVotes[selected] += 1;
    setVotes(updateVotes);
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the Day</h1>
        <p>
          {anecdotes[selected]}<br />
          has {votes[selected]} votes
        </p>

        <Button text='vote' onClick={handleVoteClick} />
        <Button text='next anecdote' onClick={handleNextClick} />
      </div>
      <div>
        <h1>Anecdote With Most Votes</h1>
        <p>
          {anecdotes[max[0]]}<br />
          has {max[1]} votes
        </p>
      </div>
    </div>
  )
}

export default App