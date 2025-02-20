"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const FormStepOne = dynamic(() => import("./components/FormStepOne"));
const FormStepTwo = dynamic(() => import("./components/FormStepTwo"));
const Result = dynamic(() => import("./components/Result"));

export default function HomePage() {
  const [step, setStep] = useState(1);
  const [resultOne, setResultOne] = useState<number | null>(null);
  const [resultTwo, setResultTwo] = useState<number | null>(null);
  const [fatorSeguranca, setFatorSeguranca] = useState<number | null>(null);
  const [resistencia, setResistencia] = useState<number | null>(null);

  const getColor = (value: number, compareValue: number) => {
    if (value > compareValue) {
      return { color: "#ff3702", spanColor: "#ff7651" };
    } else {
      return { color: "#4adb7f", spanColor: "#7feba6" };
    }
  };

  const resultOneColor = { color: "#5348e9", spanColor: "#9189ff" };
  const resistenciaColor = resultOne !== null && resistencia !== null ? getColor(resistencia, resultOne) : { color: "", spanColor: "" };

  return (
    <div className="main-container">
      <section className="form-section">
        {/* Formulários */}
        <div className={`form-step ${step >= 2 ? 'inactive' : ''}`}>
          <FormStepOne onCalculate={(result) => {
            setResultOne(result);
            setStep(2);
          }} />
        </div>

        {step >= 2 && (
          <div className="form-step active" style={{ position: 'absolute', left: 0, right: 0 }}>
            <FormStepTwo onCalculate={(fator, resistencia) => {
              setFatorSeguranca(fator);
              setResistencia(resistencia);
              setResultTwo(resistencia);
              setStep(3);
            }} />
          </div>
        )}
      </section>

      {/* Resultados e Comparação Final */}
      <div className="result-container">
        {resultOne !== null && step < 3 && <Result title="Resultado" value={resultOne} isSummary={step === 2}  />}

        {step === 3 && resultOne !== null && resistencia !== null && (
          <div className="comparison">
            <h2 style={{ fontSize: "2.5rem" }}>Compressão atual</h2>
            <h2 style={{ color: resultOneColor.color, fontSize: "5rem", margin: "10px"}}>{Math.round(resultOne)} <span style={{ color: resultOneColor.spanColor }}>kgf</span></h2>
            <h2 style={{ fontSize: "2.5rem" }}>Mínimo de compressão </h2>
            <h2 style={{ color: resistenciaColor.color, fontSize: "5rem",  margin: "10px" }}>{Math.round(resistencia)} <span style={{ color: resistenciaColor.spanColor }}>kgf</span></h2>
          </div>
        )}

        {fatorSeguranca !== null && (
          <div className="fator-seguranca">
            
          </div>
        )}
      </div>
    </div>
  );
}
