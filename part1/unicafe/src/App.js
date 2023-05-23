import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  if(text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
      )
  }
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Stats = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return (
      <p>
        No Feedback Given
      </p>
    )
  }

  const average = (good + bad * -1) / all;
  const positive = good / all * 100;

  return (
  <table>
    <tbody>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </tbody>
  </table>
  )
}

const Button = ({text, handleClick}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const App = () => {
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
        <Stats good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App