import { fireEvent, queryByTestId, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import SectionTitle from "./SectionTitle";

describe("<Breadcrumb/>", () => {

  beforeAll(() => {

    render(<SectionTitle paragraph="teste paragrafo" title="Titulo"/>)
  })

  it("Deve renderizar corretamente", () => {
    expect(screen.getByText('teste paragrafo')).toBeInTheDocument()
  })

  it("Deve ter a title", () => {
    expect(screen.getByText(/Titulo/i)).toBeInTheDocument()
  })

  it('renders homepage unchanged', () => {
    const { container } = render(<SectionTitle paragraph="teste paragrafo" title="Titulo" />)
    expect(container).toMatchSnapshot()
  })


})