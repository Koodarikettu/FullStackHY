import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.onclick}>
      {props.text}
    </button>
  )
}

const Text = ({place, taulukko}) => (
  <div>has {taulukko[place]} votes</div>
)


const Heading = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Most = ({list, anekdootit}) => {
  let x = list.indexOf(Math.max(...list))
  console.log(list)
  return (
    <p>{anekdootit[x]}</p>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] =useState(Array(anecdotes.length).fill(0))
  const copy = [...points]


  const handleClick = () => {
    let x = Math.floor(Math.random() * anecdotes.length)
    setSelected(x)
  }

  
  const voteClick = () => {
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      {anecdotes[selected]}
      <div></div>
      <Text place={selected} taulukko={copy} />
      <Button onclick={voteClick} text="vote"/>
      <Button onclick={handleClick} text="next anecdote"/>
      <Heading text="Anecdote with the most votes" />
      <Most list={copy} anekdootit={anecdotes}/>
    </div>
  )
}

export default App