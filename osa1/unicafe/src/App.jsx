import { useState } from 'react'


const Head = ({text}) => {
  return (
    <div>
      <h1>
        {text}
      </h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

const Statistic = ({good, bad, neutral}) => {
  if ((good+bad+neutral) === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
  <table>
      <StatisticLine  text="good" count={good} />
      <StatisticLine  text="neutral" count={neutral} />
      <StatisticLine  text="bad" count={bad} />
      <StatisticLine  text="all" count={bad + good + neutral} />
      <StatisticLine  text="avarage" count={(good + 0.5*neutral - bad)/(bad + good + neutral)} />
      <StatisticLine  text="positive" count={(good)/(bad + good + neutral)} />
  </table>
  )
}

const StatisticLine = ({text, count}) => {
  return(
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{count}</td>
      </tr>
    </tbody>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleclickGood = () => {
    setGood(good+1)
  }

  const handleclickNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleclickBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <Head text="give feeedback"/>
      <Button handleClick={handleclickGood} text='good'/>
      <Button handleClick={handleclickNeutral} text='neutral'/>
      <Button handleClick={handleclickBad} text='bad'/>
      <Head text="statistic"/>
      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App