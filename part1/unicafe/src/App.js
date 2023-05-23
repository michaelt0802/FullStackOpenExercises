import { useState } from 'react'

const Stats = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = (good + bad * -1) / all;
  const positive = good / all * 100;
  return (
  <>
    all {all} <br />
    average {average} <br />
    positive {positive}% <br />
  </>
  )
}

const Button = ({text, handleClick}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>

      <h1>Statistics</h1>
      <div>

        <p>
          good {good} <br />
          neutral {neutral} <br />
          bad {bad} <br />
          <Stats good={good} neutral={neutral} bad={bad}/>
        </p>


      </div>

    </div>
  )
}

export default App