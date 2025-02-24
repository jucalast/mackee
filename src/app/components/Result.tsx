import { memo } from "react";

// components/Result.tsx
interface Props {
  title: string;
  value: number;
  isSummary?: boolean;
  fatorSeguranca?: number | null;
  resistencia?: number | null;
  step?: number;
}

function Result({ title, value, isSummary = false, fatorSeguranca, resistencia, step }: Props) {
  return (
    <div className="result-box">
      <h2>{title} {isSummary ? "" : ""}</h2>
      <p>
        O cálculo correto da resistência da embalagem
        evita prejuízos com produtos danificados,
        devoluções e falhas logísticas, <strong>garantindo mais
        eficiência e segurança</strong> para sua empresa.
      </p>
      <div className="value-container">
        <p className="value">
          {Math.round(value)} <span>kgf</span>
        </p> {/* Arredondar para o inteiro mais próximo */}
        <div className="tooltip fixed">
          <p>
            Isso significa que a sua embalagem aguenta até no máximo {Math.round(value)} kgf até estourar. O <strong>fator de segurança</strong> dirá, quanto Kgf no mínimo, sua embalagem deve ter.
          </p>
        </div>
      </div>
      
      {step === 3 && (
        <div className="comparison">
          <h2>Comparação Final</h2>
          <p className="value"><strong>Carga de Colapso:</strong> {Math.round(value)} kgf</p> {/* Arredondar para o inteiro mais próximo */}
          <p><strong>Fator de Segurança:</strong> {fatorSeguranca}</p>
          <p><strong>Resistência da Caixa:</strong> {resistencia} kgf</p>
        </div>
      )}
    </div>
  );
}

export default memo(Result);
