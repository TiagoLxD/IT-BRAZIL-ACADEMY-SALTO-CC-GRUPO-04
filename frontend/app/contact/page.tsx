import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Suporte"
        description="Nossa equipe de suporte dedicada trabalhará incansavelmente para resolver qualquer problema que você relatar. Assim que recebermos seu relato, 
        você receberá uma confirmação por e-mail e acompanharemos o progresso até que o problema seja resolvido satisfatoriamente.
        Agradecemos por escolher Cassino Hamilton e por nos ajudar a melhorar nossos produtos/serviços. Seu feedback é fundamental para nosso sucesso contínuo."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
