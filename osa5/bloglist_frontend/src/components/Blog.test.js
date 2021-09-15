import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    likes: 12,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: {
      username: "mleppane",
      name: "Mikko Leppänen",
      id: "613f3645a0f5a87c7fdab91d",
    },
    id: "61403f948394a0c4e61198e9",
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("React patterns");
  expect(component.container).not.toHaveTextContent("Michael Chan");
  expect(component.container).not.toHaveTextContent(
    "https://reactpatterns.com/"
  );
  expect(component.container).not.toHaveTextContent("12");
});

test("clicking view button should show all the blog info", () => {
  const blog = {
    likes: 12,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: {
      username: "mleppane",
      name: "Mikko Leppänen",
      id: "613f3645a0f5a87c7fdab91d",
    },
    id: "61403f948394a0c4e61198e9",
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByText("view");
  console.log(button.onClick);
  fireEvent.click(button);
  expect(component.container).toHaveTextContent("React patterns");
  expect(component.container).toHaveTextContent("https://reactpatterns.com/");
  expect(component.container).toHaveTextContent("12");
});
