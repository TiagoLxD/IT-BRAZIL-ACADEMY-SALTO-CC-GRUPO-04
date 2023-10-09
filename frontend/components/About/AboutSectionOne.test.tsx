import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import AboutSectionOne from './AboutSectionOne'

describe('<TextTela>', () => {
    it('Should render text Description in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionOne></AboutSectionOne>);

        expect(getByText('Bem-vindo! Ao universo de entretenimento mais emocionante que você já viu em nosso Cassino Online. Estamos redefinindo a maneira como se experimenta a diversão e adrenalina dos jogos de cartas. O destaque da nossa plataforma é, sem dúvida, o aclamado jogo de truco!')).toBeInTheDocument();
    })


    it('Should render text Title in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionOne></AboutSectionOne>);

        expect(getByText('Explore um universo repleto de emoção e estratégia no nosso Cassino Online!')).toBeInTheDocument();
    })


    it('Should render text List in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionOne></AboutSectionOne>);

        expect(getByText('Variedade de Jogos')).toBeInTheDocument();
    })

    it('Should render text List in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionOne></AboutSectionOne>);

        expect(getByText('Segurança Garantida')).toBeInTheDocument();
    })

    it('Should render text List in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionOne></AboutSectionOne>);

        expect(getByText('Atendimento ao Cliente 24/7')).toBeInTheDocument();
    })

    it('Should render text List in the landing page.', () => {
        const {getByText} =
        render(<AboutSectionOne></AboutSectionOne>);

        expect(getByText('Faça novos amigos ou inimigos')).toBeInTheDocument();
    })




})