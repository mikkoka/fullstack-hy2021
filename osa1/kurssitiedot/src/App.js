import React from 'react'

const Header = (props) => {

  return (
    <>
      <h1>{props.course_name}</h1>
    </>
  )

}

const Content= ({parts}) => {
  //parts.forEach(p => console.log(p))
  return (
    <>
      <Part part={parts[0]}></Part>
      <Part part={parts[1]}></Part>
      <Part part={parts[2]}></Part>
    </>
  )
  
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.number}</p>
    </>
  )  
}

const Part = ({part}) => {
  console.log(part)
  return (
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )  
}

const App = () => {
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
      <Header course_name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total number={course.parts.reduce((sum, part) => sum+=part.exercises, 0)}></Total>
    </div>
  )
}

export default App
