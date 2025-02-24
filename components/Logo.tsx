import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src="/_next/static/media/logo Mackee.0f81f6d3.svg"
      alt="Logo Mackee"
      priority // Adiciona a propriedade priority
      // ...outras propriedades da imagem...
    />
  );
};

export default Logo;
