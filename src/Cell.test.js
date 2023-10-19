import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";
// had to render this way because, testing gave warning about just td tag being rendered
test('renders without crashing', () => {
  render(
    <table>
      <tbody>
        <tr>
          <Cell />
        </tr>
      </tbody>
    </table>
  );
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <table>
      <tbody>
        <tr>
          <Cell />
        </tr>
      </tbody>
    </table>
  );
  expect(asFragment()).toMatchSnapshot();
});
