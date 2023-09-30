import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.svg"
                alt="about image"
                fill
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  O Truco: O Jogo da Astúcia e Estratégia
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Se você é um aficionado por jogos de cartas, o truco é uma experiência que você não pode perder. É o jogo que combina habilidade, estratégia e aquela pitada de blefe que mantém todos na ponta da cadeira. Desafie seus amigos, jogadores de todo o mundo ou nossos dealers virtuais especializados e mostre suas habilidades no truco.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Faça Parte da Ação!
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Não perca a chance de fazer parte da ação em nosso cassino online e mergulhar na emocionante jornada do truco. A diversão e a estratégia estão apenas a alguns cliques de distância. Junte-se a nós hoje mesmo e mostre suas habilidades no truco enquanto experimenta a emoção de nosso cassino de classe mundial!
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Prepare-se para um jogo que vai testar sua astúcia e desafiar sua estratégia.
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Venha fazer parte da comunidade do truco em nosso Cassino Online. Estamos ansiosos para recebê-lo e compartilhar o entusiasmo deste jogo empolgante!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
