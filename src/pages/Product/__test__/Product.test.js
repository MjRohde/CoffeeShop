import React from "react";
import Product from "../Product";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header to be displayed in doc", () => {
  const component = render(<Product />);
  const element = component.getByTestId("headerh1");
  expect(element).toBeInTheDocument();
});

test("click triggers shopping cart being visible", () => {
  const { getByTestId } = render(<Product />);
  const buttonEl = getByTestId("sCart");
  const shoppingCart = getByTestId("shoppingCart");

  fireEvent.click(buttonEl);

  expect(shoppingCart).toBeInTheDocument();
});

test("change value of select fields", () => {
  const { getByTestId, getAllByTestId } = render(<Product />);
  const selectSizeEl = getByTestId("size");
  const options = getAllByTestId("sizeOption");

  fireEvent.change(selectSizeEl, {
    target: {
      value: "Medium",
    },
  });
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
});
