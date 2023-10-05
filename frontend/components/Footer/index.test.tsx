import { fireEvent, queryByTestId, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Footer from ".";

describe("<Footer/>", () => {

  it("Deve renderizar corretamente", () => {

    const { getByText } = render(<Footer />)
    const textEsperado = 'Bem-vindo!'
    expect(getByText(textEsperado)).toBeInTheDocument()
  })
  it("Deve conter os textos corretos", () => {

    const { getByText } = render(<Footer />)
    expect(getByText("Cassino Hamilton by Favian Group 2023")).toBeInTheDocument()
    expect(getByText("Termo de uso")).toBeInTheDocument()
    expect(getByText("Abrir um chamado")).toBeInTheDocument()
    expect(getByText("Suporte e ajuda")).toBeInTheDocument()
    expect(getByText("Termos de privacidade")).toBeInTheDocument()
  })

  it('renders homepage unchanged', () => {
    const { container } = render(<Footer />)
    expect(container).toMatchSnapshot()
  })


  it('Deve ter logo no footer', () => {

    const { getByTestId } = render(<Footer />)
    expect(getByTestId('logo')).toBeInTheDocument()

  })

})