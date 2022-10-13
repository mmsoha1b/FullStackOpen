const CourseHeader = ({ name }) => 
  <h2>{name}</h2>

const Total = ({ exercises_in_part }) => {
  const sum=exercises_in_part.reduce((a,b)=>a+b)
  return(
    <p>
      <b>total of  {sum} exercises</b>
    </p>
  )
}
const Part = ({ part }) => {
  return(
    <p>
      {part.name} {part.exercises}
    </p>
  )
}
const Content = ({ parts }) => 
  <>
    {parts.map( part =>
        <Part part={part} key={part.id}/>
      )}
  </>

const Course=({course})=>{
  const exercises_in_part=course.parts.map(part=>part.exercises)
  return(
    <>
    <CourseHeader name={course.name}/>
    <Content parts= {course.parts}/>
    <Total exercises_in_part={exercises_in_part}/>
    </>
  )
}
export default Course