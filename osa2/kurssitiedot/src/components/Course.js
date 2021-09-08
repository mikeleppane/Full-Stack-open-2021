import React from "react";

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <div>
      <p style={{ fontWeight: "bold" }}>
        total of {parts.map((part) => part.exercises).reduce((a, b) => a + b)}{" "}
        exercises
      </p>
    </div>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <div>
      <p>
        {part} {exercises}
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
