import { render } from '@testing-library/react';
import Header from "."
import '@testing-library/jest-dom'

describe('<Logo>', () => {
    it('Should render logo', () => {
        const {getByTestId} =
        render(<Header></Header>);

        expect(getByTestId('logoTeste')).toBeInTheDocument();
    })
})

