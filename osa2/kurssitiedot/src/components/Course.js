import React from 'react'

const Course = ({course}) => {

  return (
    <div>
      <Header course_name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total number={course.parts.reduce((sum, part) => sum+=part.exercises, 0)}></Total>
    </div>
  )

}

const Header = ({course_name}) =>

      <h2>{course_name}</h2>

const Content= ({parts}) => 
      
      <>{parts.map(p => <Part key={p.id} part={p}></Part>)}</>

const Total = ({number}) => 

      <h4>Number of exercises {number}</h4>
    
const Part = ({part}) => 

      <p>{part.name} {part.exercises}</p>

export default Course