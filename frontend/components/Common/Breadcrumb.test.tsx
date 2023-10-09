import { fireEvent, queryByTestId, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Breadcrumb from "./Breadcrumb";

describe("<Breadcrumb/>", () => {

  beforeAll(() => {

    render(<Breadcrumb pageName="Sobre nós"
      description="Explore a Emoção do Truco em Nosso Cassino Online." />)
  })

  it("Deve renderizar corretamente", () => {
    expect(screen.getByTestId('pageName1')).toBeInTheDocument()
  })

  it("Deve ter a description", () => {
    expect(screen.getByText(/Explore a Emoção do Truco em Nosso Cassino Online./i)).toBeInTheDocument()
  })

  it('renders homepage unchanged', () => {
    const { container } = render(<Breadcrumb pageName="Sobre nós"
      description="Explore a Emoção do Truco em Nosso Cassino Online." />)
    expect(container).toMatchSnapshot()
  })


  // it('Deve ter logo no footer', () => {

  //   const { getByTestId } = render(<Footer />)
  //   expect(getByTestId('logo')).toBeInTheDocument()

  // })

})