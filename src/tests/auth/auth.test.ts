import { verificaLogin } from "@/auth/auth";
import { expect, test, describe } from "vitest";

//Recomendo separar as seções de testes positivos e negativos. Os exemplos abaixo me parecem interessantes
//O que acontece se tanto o email como a senha estiverem em branco ou nulo? E se tiver caracteres especiais?

describe('Verificando login do usuário!', () => {
	test('Devo verificar se o email e a senha são compatíveis com os do usuário.', () => {

		const resultado = verificaLogin('tiagojeankitegroski@gmail.com', 'lindos123');
		expect(resultado).toBe('Login efetuado com sucesso!');
	});

	test('Devo verificar se o email está compatível ao do usuário.', () => {

		const resultado = verificaLogin('favinho@gmail.com', 'lindos123');
		expect(resultado).toBe('E-mail incorreto!');
	});

	test('Devo verificar se a senha está compatível ao do usuário.', () => {

		const resultado = verificaLogin('tiagojeankitegroski@gmail.com', 'senhaerrada');
		expect(resultado).toBe('Senha incorreta!');
	});

	test('Devo verificar se o usuário errou seu login.', () => {

		const resultado = verificaLogin('tainhavinho@gmail.com', 'muitose');
		expect(resultado).toBe('Login incorreto!');
	});
});

