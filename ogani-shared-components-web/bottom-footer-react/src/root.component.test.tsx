import { render } from "@testing-library/react";
import Root from "./root.component";

xdescribe("Root component", () => {
  xit("should be in the document", () => {
    const { getByText } = render(<Root name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
