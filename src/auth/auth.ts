export function verificaLogin(email: string, password: string) {
	if (email === 'tiagojeankitegroski@gmail.com' && password === 'lindos123') {
		return 'Login efetuado com sucesso!';
	} else {
		if (email !== 'tiagojeankitegroski@gmail.com' && password !== 'lindos123') {
			return 'Login incorreto!';
		}
		if (email !== 'tiagojeankitegroski@gmail.com') {
			return 'E-mail incorreto!';
		}
		if (password !== 'lindos123') {
			return 'Senha incorreta!';
		}
	}
}
