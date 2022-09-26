import { useState } from 'react'

const Button =({clickHandler,value})=>{
  return(
    <button onClick={clickHandler}>{value}</button>
  )
}
const StatisticLine=({text,value})=>{
  return(
    <><td>{text}</td><td>{value}</td></>
  )
}
const Statistics=({good,bad,neutral,all})=>{
  if (all){
    return(
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <tr><StatisticLine text='good'value={good}/></tr>
            <tr><StatisticLine text='neutral'value={neutral}/></tr>
            <tr><StatisticLine text='bad'value={bad}/></tr>
            <tr><StatisticLine text='all'value={all}/></tr>
            <tr><StatisticLine text='average'value={(good*1+bad*-1)/all}/></tr>
            <tr><StatisticLine text='positive'value={(good/all*100)+' %'}/></tr>
         </tbody>
        </table>
      </>
    )
  }
  return(
    <>
    <p>No feedback given</p>
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] = useState(0)
  const increaseAll=()=>{
    setAll(all+1);
  }
  const goodHandler =()=>{
    setGood(good+1);
    increaseAll()
  }
  const badHandler=()=>{
    setBad(bad+1);
    increaseAll()
  }
  const neutralHandler=()=>{
    setNeutral(neutral+1)
    increaseAll()
  }
  
  return (
    <div>
      <h1>give feedback</h1><br/>
      <Button clickHandler={goodHandler} value='good'></Button>
      <Button clickHandler={neutralHandler} value='neutral'></Button>
      <Button clickHandler={badHandler} value='bad'></Button>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
    </div> 
  )
}

export default App