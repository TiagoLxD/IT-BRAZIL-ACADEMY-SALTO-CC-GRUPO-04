export function verificaLogin(vemail:string, vsenha:string)
{
    if(vemail === 'tiagojeankitegroski@gmail.com' && vsenha === 'lindos123'){
        return 'Login efetuado com sucesso!';
    } 
    else if (vemail != 'tiagojeankitegroski@gmail.com' && vsenha != 'lindos123') {
        return 'Login incorreto!';    
    }
    else if(vemail != 'tiagojeankitegroski@gmail.com')
    {
        return 'E-mail incorreto!';   
    } 
    else if(vsenha != 'lindos123')
    {
        return 'Senha incorreta!';   
    } 

}