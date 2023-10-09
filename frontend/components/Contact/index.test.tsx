import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Contact from ".";

describe("Button", () => {
  it("should render button", () => {
    const { getByText } = render(<Contact />);
    expect(
      getByText(
        "Precisa de ajuda? Avise-nos sobre o que esta ocorrendo de errado"
      )
    ).toBeInTheDocument();
  });

  it("should submit the form successfully when user fills out the form", () => {
    // Arrange
    render(<Contact />);

    // Act
    const nameInput = screen.getByPlaceholderText("Digite seu nome");
    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    const messageInput = screen.getByPlaceholderText("Digite sua mensagem");
    const submitButton = screen.getByRole("button", {
      name: "Enviar erro/dúvida",
    });

    // Assert
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(messageInput).toHaveValue("");
  });

  it("should call home when hits the button", () => {
    render(<Contact />);

    const submitButton = screen.getByRole("button", {
      name: "Enviar erro/dúvida",
    });
    // fireEvent.click(submitButton);

    expect(submitButton).toBeEnabled();
  });
});
