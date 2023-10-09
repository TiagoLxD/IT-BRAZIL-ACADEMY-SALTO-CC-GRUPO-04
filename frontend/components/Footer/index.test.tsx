import {render} from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from "."

describe('<Logo>', () => {
    it('Should render the logo.', () => {
        const {getByTestId} = 
        render(<Footer></Footer>);  
        
        expect(getByTestId('logoTeste')).toBeInTheDocument();
    })  
})
