const Header = ({course}) => {
  return (
      <h2>{course}</h2>
  )
}

const Parts = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((parts, index) =>
        <Parts key={parts.id} part={parts.name} exercises={parts.exercises} />)}
    </div>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.parts.reduce((accum, curr) => accum + curr.exercises, 0)}</p>;
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course