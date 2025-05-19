// App.js actualizado con ModalAyuda integrado
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  ubicacionData,
  preciosPorCanton,
  lugaresNoDisponibles,
} from "./AppDatosProvinciasYPrecios";
import logo from "./assets/Logo Solo tiras.svg";

function App() {
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descarga, setDescarga] = useState("");
  const [resistencia, setResistencia] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);
  const [mensajeEntrega, setMensajeEntrega] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");

  // Modal de ayuda
  const [ayudaVisible, setAyudaVisible] = useState(false);
  const [ayudaMensaje, setAyudaMensaje] = useState("");

  useEffect(() => {
    if (provincia && canton && cantidad && resistencia && descarga) {
      const cantidadNum = parseFloat(cantidad);
      const precioUnitario =
        preciosPorCanton[provincia]?.[canton]?.[resistencia] || 0;

      let total = 0;

      if (lugaresNoDisponibles.includes(canton)) {
        setMensajeEntrega("⚠️ Actualmente no disponible en este cantón.");
        setPrecioTotal(0);
        return;
      }

      if (descarga !== "Directa" && cantidadNum < 7) {
        setMensajeEntrega(
          "⚠️ Para descargas con equipo de bombeo, el mínimo son 7 m³."
        );
        setPrecioTotal(0);
        return;
      }

      setMensajeEntrega("");

      if (descarga === "Directa" && cantidadNum < 7) {
        const recargo = (7 - cantidadNum) * 25000;
        total = precioUnitario * cantidadNum + recargo;
      } else if (descarga !== "Directa" && cantidadNum <= 17) {
        total = precioUnitario * cantidadNum + 170000;
      } else if (descarga !== "Directa" && cantidadNum > 17) {
        const recargo = cantidadNum * 10000;
        total = precioUnitario * cantidadNum + recargo;
      } else {
        total = precioUnitario * cantidadNum;
      }

      setPrecioTotal(total);
    } else {
      setPrecioTotal(0);
    }
  }, [provincia, canton, cantidad, resistencia, descarga]);

  useEffect(() => {
    if (canton && lugaresNoDisponibles.includes(canton)) {
      setMensajeEntrega("⚠️ Actualmente no disponible en este cantón.");
    } else {
      setMensajeEntrega("");
    }
  }, [canton]);

  return (
    <div className="modern-container">
      <div className="logo-container">
        <img src={logo} alt="Logo de la empresa" className="logo-img" />
      </div>
      <h1 className="title">Cotizador de Concreto</h1>
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
              <select
                value={canton}
                onChange={(e) => setCanton(e.target.value)}
              >
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
                    {[105, 140, 175, 210, 245, 280, 315, 350, 385].map(
                      (val) => (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}
        </div>
      </form>

      {precioTotal > 0 && (
        <div className="summary-card">
          <div className="resumen-total">
            <span>Total estimado</span>
            <h2>₡{precioTotal.toLocaleString()}</h2>
          </div>
          <div className="detalle-resumen">
            <div className="resumen-item">
              <span>Cantidad</span>
              <p>{cantidad} m³</p>
            </div>
            <div className="resumen-item">
              <span>Tipo de descarga</span>
              <p>{descarga}</p>
            </div>
            <div className="resumen-item">
              <span>Resistencia</span>
              <p>{resistencia}</p>
            </div>
          </div>
          <button
            type="button"
            className="boton-reset"
            onClick={() => {
              setProvincia("");
              setCanton("");
              setCantidad("");
              setDescarga("");
              setResistencia("");
              setPrecioTotal(0);
              setMensajeEntrega("");
              setFechaEntrega("");
            }}
          >
            Reiniciar formulario
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
