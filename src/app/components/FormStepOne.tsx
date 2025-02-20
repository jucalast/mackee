// components/FormStepOne.tsx
"use client";

import { useState, useEffect, useCallback } from "react";

interface Props {
  onCalculate: (result: number) => void;
}

export default function FormStepOne({ onCalculate }: Props) {
  const [material, setMaterial] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [coluna, setColuna] = useState("");
  const [espessura, setEspessura] = useState("");

  const atualizarColunaEspessura = useCallback(() => {
    let opcoes = [];
    let espessuras = [];

    if (material === "B") {
      opcoes = [3.5, 4, 5, 5.5, 6, 7];
      espessuras = [0.225, 0.245, 0.275, 0.295, 0.315];
    } else if (material === "C") {
      opcoes = [3.3, 3.8, 4.8, 5.3, 6, 7.5];
      espessuras = [0.325, 0.345, 0.375, 0.395, 0.415];
    } else if (material === "BC") {
      opcoes = [6.5, 7, 8, 9, 10, 11, 12];
      espessuras = [0.520, 0.540, 0.570, 0.590, 0.620, 0.690];
    } else if (material === "E") {
      opcoes = [4, 4.5];
      espessuras = [0.120, 0.220];
    } else {
      return;
    }

    setColuna(opcoes[0].toString());
    setEspessura(espessuras[0].toString());
  }, [material]);

  useEffect(() => {
    atualizarColunaEspessura();
  }, [material, atualizarColunaEspessura]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calcular();
  };

  const calcular = () => {
    const L = parseFloat(largura);
    const C = parseFloat(comprimento);
    const A = parseFloat(altura);
    const c = parseFloat(coluna);
    const e = parseFloat(espessura);

    let QC, QL, k;
    if (material === "E") {
      QC = 36;
      QL = 16;
      k = 5.6;
    } else if (material === "B") {
      QC = 42;
      QL = 12;
      k = 5.6;
    } else if (material === "C") {
      QC = 46;
      QL = 16;
      k = 5.6;
    } else if (material === "BC") {
      QC = 54;
      QL = 24;
      k = 4.7;
    } else {
      alert("Por favor, selecione um material válido.");
      return;
    }

    const p_mm = 2 * ((C * 2 + L * 2 + QC) + (L / 2 + A + L / 2 + QL));
    const p_cm = p_mm / 10;
    const cargaColapso = k * c * Math.sqrt(e * p_cm);

    const resultadoFinal = cargaColapso; // Mantendo em kgf
    onCalculate(resultadoFinal);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Carga de Colapso Teste de McKee</h1>
      <div className="label-select-container">
        <label htmlFor="material">Material </label>
        <select id="material" value={material} onChange={(e) => setMaterial(e.target.value)} required>
          <option value="">Selecione</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="BC">BC</option>
          <option value="E">E</option>
        </select>
      </div>

      <div className="label-select-container">
        <label htmlFor="coluna">Coluna </label>
        <select id="coluna" value={coluna} onChange={(e) => setColuna(e.target.value)} required>
          {material === "B" && [3.5, 4, 5, 5.5, 6, 7].map((opcao, index) => (
            <option key={index} value={opcao}>{opcao}</option>
          ))}
          <option value="">Selecione</option>
          {material === "C" && [3.3, 3.8, 4.8, 5.3, 6, 7.5].map((opcao, index) => (
            <option key={index} value={opcao}>{opcao}</option>
          ))}
          {material === "BC" && [6.5, 7, 8, 9, 10, 11, 12].map((opcao, index) => (
            <option key={index} value={opcao}>{opcao}</option>
          ))}
          {material === "E" && [4, 4.5].map((opcao, index) => (
            <option key={index} value={opcao}>{opcao}</option>
          ))}
        </select>
      </div>

      <div className="label-select-container">
        <label htmlFor="comprimento">Compr. </label>
        <input type="number" id="comprimento" value={comprimento} onChange={(e) => setComprimento(e.target.value)} required />
      </div>

      <div className="label-select-container">
        <label htmlFor="largura">Largura </label>
        <input type="number" id="largura" value={largura} onChange={(e) => setLargura(e.target.value)} required />
      </div>

      <div className="label-select-container">
        <label htmlFor="altura">Altura </label>
        <input type="number" id="altura" value={altura} onChange={(e) => setAltura(e.target.value)} required />
      </div>

      <input type="hidden" id="espessura" value={espessura} step="0.01" readOnly required />

      <button type="submit">Calcular</button>
    </form>
  );
}
