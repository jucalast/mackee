"use client";

import { useState } from "react";

interface Props {
  onCalculate: (fator: number, resistencia: number) => void;
}

export default function FormStepTwo({ onCalculate }: Props) {
  const [umidade, setUmidade] = useState("");
  const [estocagem, setEstocagem] = useState("");
  const [manuseio, setManuseio] = useState("");
  const [produto, setProduto] = useState("");
  const [empilhamento, setEmpilhamento] = useState("");
  const [peso, setPeso] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calcularFator();
  };

  const calcularFator = () => {
    if (!umidade || !estocagem || !manuseio || !produto || !empilhamento || !peso) {
      onCalculate(NaN, NaN);
      return;
    }

    const umidadeVal = parseFloat(umidade);
    const estocagemVal = parseFloat(estocagem);
    const manuseioVal = parseFloat(manuseio);
    const produtoVal = parseFloat(produto);
    const empilhamentoVal = parseFloat(empilhamento);
    const pesoVal = parseFloat(peso);

    const fatorSeguranca = umidadeVal * estocagemVal * manuseioVal * produtoVal * empilhamentoVal;

    let resistenciaCaixa;
    if (!isNaN(pesoVal) && pesoVal > 0) {
      resistenciaCaixa = pesoVal / fatorSeguranca;
    } else {
      resistenciaCaixa = NaN;
    }

    onCalculate(fatorSeguranca, resistenciaCaixa);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Fator de Segurança</h1>

      <div className="label-select-container">
        <label htmlFor="umidade">Umidade</label>
        <select id="umidade" value={umidade} onChange={(e) => setUmidade(e.target.value)}>
          <option value="">Selecione</option>
          <option value="1.00">50%</option>
          <option value="0.90">60%</option>
          <option value="0.80">70%</option>
          <option value="0.68">80%</option>
          <option value="0.48">90%</option>
          <option value="0.15">100%</option>
        </select>
      </div>

      <div className="label-select-container">
        <label htmlFor="estocagem">Estocagem</label>
        <select id="estocagem" value={estocagem} onChange={(e) => setEstocagem(e.target.value)}>
          <option value="">Selecione</option>
          <option value="0.63">10 dias</option>
          <option value="0.60">1 mês</option>
          <option value="0.55">3 meses</option>
          <option value="0.50">1 ano</option>
        </select>
      </div>

      <div className="label-select-container">
        <label htmlFor="manuseio">Manuseio</label>
        <select id="manuseio" value={manuseio} onChange={(e) => setManuseio(e.target.value)}>
          <option value="">Selecione</option>
          <option value="0.80">Normal</option>
          <option value="0.60">Severo</option>
        </select>
      </div>

      <div className="label-select-container">
        <label htmlFor="produto">Sustentável</label>
        <select id="produto" value={produto} onChange={(e) => setProduto(e.target.value)}>
          <option value="">Selecione</option>
          <option value="1.30">Sustentável</option>
          <option value="1.00">Não sustentável</option>
        </select>
      </div>

      <div className="label-select-container">
        <label htmlFor="empilhamento">Empilhamento</label>
        <select id="empilhamento" value={empilhamento} onChange={(e) => setEmpilhamento(e.target.value)}>
          <option value="">Selecione</option>
          <option value="1.00">Colunar</option>
          <option value="0.50">Cruzado</option>
        </select>
      </div>

      <div className="label-select-container">
        <label htmlFor="peso">Peso</label>
        <input type="number" id="peso" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Digite o peso em kg" />
      </div>

      <button type="submit">Calcular</button>
    </form>
  );
}
