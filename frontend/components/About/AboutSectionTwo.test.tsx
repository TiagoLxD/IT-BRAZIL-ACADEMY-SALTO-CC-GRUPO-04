import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import AboutSectionTwo from './AboutSectionTwo'

describe('<TextTela>', () => {
    it('Should render text Description in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionTwo></AboutSectionTwo>);

        expect(getByText('Truco: O jogo da astúcia e estratégia')).toBeInTheDocument();
    })

    it('Should render text Description in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionTwo></AboutSectionTwo>);

        expect(getByText('Se você é um aficionado por jogos de cartas, o truco é uma experiência que você não pode perder. É uma competição que combina habilidade, estratégia e aquela pitada de blefe que mantém todos na ponta da cadeira. Desafie seus amigos, jogadores de todo o mundo ou nossos dealers virtuais especializados. Demonstre suas habilidades no Cassino Hamilton!')).toBeInTheDocument();
    })

    it('Should render text Description in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionTwo></AboutSectionTwo>);

        expect(getByText('Faça parte da ação!')).toBeInTheDocument();
    })

    it('Should render text Description in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionTwo></AboutSectionTwo>);

        expect(getByText('Não perca a chance de fazer parte da ação em nosso Cassino online e mergulhar nessa emocionante jornada. A diversão e a estratégia estão a apenas um clique de distância. Junte-se a nós hoje mesmo e demonstre suas habilidades no truco enquanto vivencia a empolgação do nosso cassino de classe mundial!')).toBeInTheDocument();
    })

    it('Should render text Description in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionTwo></AboutSectionTwo>);

        expect(getByText('Prepare-se para um jogo que vai testar sua astúcia e desafiar sua estratégia.')).toBeInTheDocument();
    })

    it('Should render text Description in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionTwo></AboutSectionTwo>);

        expect(getByText('Prepare-se para um jogo que vai testar sua astúcia e desafiar sua estratégia.')).toBeInTheDocument();
    })
    
    it('Should render text Description in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionTwo></AboutSectionTwo>);

        expect(getByText('Venha fazer parte da comunidade do truco em nosso Cassino Online. Estamos ansiosos para recebê-lo e compartilhar o entusiasmo deste jogo empolgante!')).toBeInTheDocument();
    })
    

})