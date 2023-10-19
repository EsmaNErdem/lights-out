import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

beforeEach(() => {
  // Mock Math.random to return a value less than 0.25
  jest.spyOn(Math, "random").mockReturnValue(0.10); 
});

afterEach(() => {
  jest.restoreAllMocks(); // Restore Math.random after each test. if it was in the end, it will restore after all tests are rendered
});

test("renders without crashing", () => {
  render(<Board />);
});

test("it renders with all cells lit", () => {
  const { asFragment } = render(<Board />);
  expect(asFragment()).toMatchSnapshot();
});

test("it renders with all cells unlit so the game is won", () => {
    // Mock Math.random to return a value more than 0.25
    jest.spyOn(Math, "random").mockReturnValue(0.8);

    const { asFragment } = render(<Board />);
    expect(asFragment()).toMatchSnapshot();

    // Restore the original Math.random after the test
    jest.spyOn(Math, "random").mockRestore();
});

test("it renders with all cells unlit so the game is won, check if the game show h1", () => {
    // Mock Math.random to return a value more than 0.25
    jest.spyOn(Math, "random").mockReturnValue(0.8);

    const { getByText } = render(<Board />);
    expect(getByText("You won the game!")).toBeInTheDocument();

    // Restore the original Math.random after the test
    jest.spyOn(Math, "random").mockRestore();
});

test("test clicking a cell will turn the lights on or off", () => {
    const { queryByTestId } = render(<Board />);

    const cell22 = queryByTestId("2-2")
   
    const cell21 = queryByTestId("2-1") // left
    const cell12 = queryByTestId("1-2") // top
    const cell23 = queryByTestId("2-3") // right
    const cell32 = queryByTestId("3-2") // bottom

    expect(cell22).toHaveClass("Cell-lit")
    expect(cell21).toHaveClass("Cell-lit")
    expect(cell12).toHaveClass("Cell-lit")
    expect(cell23).toHaveClass("Cell-lit")
    expect(cell32).toHaveClass("Cell-lit")

    // Click cells to simulate the game
    fireEvent.click(cell22)
    
    expect(cell22).not.toHaveClass("Cell-lit")
    expect(cell21).not.toHaveClass("Cell-lit")
    expect(cell12).not.toHaveClass("Cell-lit")
    expect(cell23).not.toHaveClass("Cell-lit")
    expect(cell32).not.toHaveClass("Cell-lit")
})

test("test clicking a cell will turn the lights on or off only on the neighboring cells", () => {
    const { queryByTestId } = render(<Board />);

    const cell22 = queryByTestId("2-2")
   
    const cell01 = queryByTestId("0-1") // random cell

    expect(cell22).toHaveClass("Cell-lit")
    expect(cell01).toHaveClass("Cell-lit")
    
    // Click cells to simulate the game
    fireEvent.click(cell22)
    
    expect(cell22).not.toHaveClass("Cell-lit")
    expect(cell01).toHaveClass("Cell-lit")
})

test("it renders a win when the winning condition is met", () => {

    // HOW CAN I MOCK BOARD'S STATE???????

    //custom board with a known winning condition
    const customBoard = [
        [false, true, false],
        [true, true, true],
        [false, true, false],
        ];

    const { container } = render(
        <Board nrows={3} ncols={3} chanceLightStartsOn={0} /> // Ensure lights won't start on
    );
  

    // SO I CAN TEST THIS:
  
    // //winning message is not displayed initially
    // expect(queryByText("You won the game!")).toBeNull();
  
    // // Click cells to simulate the game
    // fireEvent.click(queryByTestId("1-1")); 
  
    // // Assert that the game declares a win
    // expect(getByText("You won the game!")).toBeInTheDocument();
  });


