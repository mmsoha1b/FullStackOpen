import { useState } from "react"
const Display = ({counter})=>
    <div>{counter}</div>
const Button=({onClick,text})=>
    <button onClick={onClick}>{text}</button>
const Header= (props) =>{
  return(
    <>
    <h1>{props.course.name}</h1>
    </>
  )

}
const Part=(props) => {
  return(
      <>
    <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}
const Content = (props) => {
  return(
    <>
    <Part part={props.course.parts[0]} />
    <Part part={props.course.parts[1]} />
    <Part part={props.course.parts[2]} />
    </>
  )
}
const Total = (props) =>{
  return(
  <p>Number of exercises {props.course.parts.reduce((a,b)=>a+b.exercises,0) } </p>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const increaseByOne=()=>{setCounter(()=>counter+1)};
  const decreaseByOne=()=>{setCounter(()=>counter-1)};
  const setToZero=()=>{setCounter(0)};
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
      {/* <Display counter={counter}/>
      <Button onClick={increaseByOne} text={'Plus'}/>
      <Button onClick={setToZero} text='Reset'/>
      <Button onClick={decreaseByOne} text='Minus'/> */}
    </div>
  )
}

export default App