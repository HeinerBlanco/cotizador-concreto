// src/components/BarraProgreso.jsx
import React from "react";

function BarraProgreso({ progreso }) {
  return (
    <div className="barra-progreso-wrapper">
      <div className="barra-progreso-fondo">
        <div
          className="barra-progreso-relleno"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>
      <div className="etiquetas-pasos">
        <span>Provincia</span>
        <span>Cantón</span>
        <span>Cantidad</span>
        <span>Descarga</span>
        <span>Resistencia</span>
      </div>
    </div>
  );
}

export default BarraProgreso;
