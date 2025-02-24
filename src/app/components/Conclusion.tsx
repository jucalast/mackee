import React from 'react';
import './Conclusion.css';

interface Props {
  fatorSeguranca: number | null;
  compressaoAtual: number | null;
  minimoCompressao: number | null;
}

const Conclusion: React.FC<Props> = ({ fatorSeguranca, compressaoAtual, minimoCompressao }) => {
  if (fatorSeguranca === null || compressaoAtual === null || minimoCompressao === null) {
    return null;
  }

  const isBelowRequired = compressaoAtual < minimoCompressao;
  const containerClass = isBelowRequired ? 'conclusao-container below-required' : 'conclusao-container above-required';
  const titleClass = isBelowRequired ? 'title below-required' : 'title above-required';
  const buttonClass = isBelowRequired ? 'button below-required' : 'button above-required';
  const textClass = isBelowRequired ? 'conclusao-text below-required' : 'conclusao-text above-required';

  return (
    <div className={containerClass}>
      <h2 className={titleClass}>Conclusão</h2>
      {isBelowRequired ? (
        <>
          <p className={textClass}>
            A sua embalagem atual está abaixo do que você precisa, vamos calcular qual seria o material ideal para você.
          </p>
          <button className={buttonClass}>Calcular material</button>
        </>
      ) : (
        <>
          <p className={textClass}>
            O fator de segurança calculado é: {fatorSeguranca.toFixed(2)}
          </p>
          <div className="info-bubbles">
            <div className="bubble">✅ Sua embalagem está ótima</div>
            <div className="bubble">💲 Diminuir o custo da embalagem</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Conclusion;
