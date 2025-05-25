import React from "react";
import {
  ubicacionData,
  lugaresNoDisponibles,
} from "./AppDatosProvinciasYPrecios";

function CotizadorForm({
  provincia,
  setProvincia,
  canton,
  setCanton,
  cantidad,
  setCantidad,
  descarga,
  setDescarga,
  resistencia,
  setResistencia,
  mensajeEntrega,
  setMensajeEntrega,
  lugaresNoDisponibles,
  setLugaresNoDisponibles,
}) {
  return (
    <form className="form-card">
      <div className="form-grid">
        <div className="form-group">
          <label>Provincia</label>
          <select
            value={provincia}
            onChange={(e) => {
              setProvincia(e.target.value);
              setCanton("");
            }}
          >
            <option value="">Seleccione una provincia</option>
            {Object.keys(ubicacionData).map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>
        {provincia && (
          <div className="form-group">
            <label>Cantón</label>
            <select value={canton} onChange={(e) => setCanton(e.target.value)}>
              <option value="">Seleccione un cantón</option>
              {ubicacionData[provincia].map((cant) => (
                <option key={cant} value={cant}>
                  {cant}
                </option>
              ))}
            </select>
            {mensajeEntrega && (
              <p className="alerta futurista">{mensajeEntrega}</p>
            )}
          </div>
        )}
        {canton &&
          !mensajeEntrega &&
          !lugaresNoDisponibles.includes(canton) && (
            <>
              <div className="form-group">
                <label className="label-con-icono">Cantidad (m³)</label>
                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  placeholder="Ej: 10"
                />
              </div>
              <div className="form-group">
                <label>Tipo de descarga</label>
                <select
                  value={descarga}
                  onChange={(e) => setDescarga(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Directa">Directa</option>
                  <option value="Telescópica">Telescópica</option>
                  <option value="Estacionaria">Estacionaria</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resistencia</label>
                <select
                  value={resistencia}
                  onChange={(e) => setResistencia(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  {[105, 140, 175, 210, 245, 280, 315, 350, 385].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
      </div>
    </form>
  );
}
export default CotizadorForm;
