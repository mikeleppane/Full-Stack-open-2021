import React from "react";
import { CourseParts } from "../types";
import Part from "./Part";

const Content = ({ parts }: CourseParts) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.name} part={part} />;
      })}
      <br />
    </div>
  );
};

export default Content;
