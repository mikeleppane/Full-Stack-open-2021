import React from "react";

interface IContent {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: IContent[];
}

const Total = ({ parts }: ContentProps) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
