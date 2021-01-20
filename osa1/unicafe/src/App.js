import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setButton = (value, setter) => () => setter(value + 1)
  

  return (
    <div>
      <h2>give feedback</h2>
      <Button text='good' handleClick={setButton(good, setGood)}></Button>
      <Button text='neutral' handleClick={setButton(neutral, setNeutral)}></Button>
      <Button text='bad' handleClick={setButton(bad, setBad)}></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  let newVal = ''
  if (text === 'positive') {
    newVal = newVal.concat(value, '%')
    return (
      <tr><td>{text}</td><td>{newVal}</td></tr>
    )
  }
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const countAll = () => good + neutral + bad

  if (countAll() === 0) return <><h2>statistics</h2><h4>No feedback given</h4></>

  return (
    <>
      <h2>statistics</h2>
      <table>
      <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={countAll()} />
        <StatisticLine text="average" value ={(good - bad)/countAll()} />
        <StatisticLine text="positive" value ={good *100 / countAll()} />
      </tbody>
      </table>
    </>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export default App
