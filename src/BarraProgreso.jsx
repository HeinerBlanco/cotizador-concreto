import React from "react";

function BarraProgreso({ progreso }) {
  let colorBarra = "#ff4d4d"; // Rojo (0–25%)

  if (progreso > 75) {
    colorBarra = "#28a745"; // Verde
  } else if (progreso > 50) {
    colorBarra = "#9cfe09"; // Verde limón (progreso alto)
  } else if (progreso > 25) {
    colorBarra = "#ff9800"; // Naranja
  } else {
    colorBarra = "#ff4d4d"; // Rojo
  }

  return (
    <div className="barra-progreso-vertical">
      <div className="progreso-porcentaje">
        <span>{progreso}%</span>
      </div>
      <div className="barra-vertical-fondo">
        <div
          className="barra-vertical-relleno"
          style={{
            height: `${progreso}%`,
            backgroundColor: colorBarra,
          }}
        ></div>
      </div>
    </div>
  );
}

export default BarraProgreso;
