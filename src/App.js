// App.js corregido con cálculo actualizado
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  ubicacionData,
  preciosPorCanton,
  lugaresNoDisponibles,
} from "./AppDatosProvinciasYPrecios";
import logo from "./assets/Logo Solo tiras.svg";
import BarraProgreso from "./BarraProgreso";
import CotizadorForm from "./CotizadorForm";

function App() {
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descarga, setDescarga] = useState("");
  const [resistencia, setResistencia] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);
  const [mensajeEntrega, setMensajeEntrega] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");

  const calcularProgreso = () => {
    let progreso = 0;
    if (provincia) progreso += 20;
    if (canton) progreso += 20;
    if (cantidad) progreso += 20;
    if (descarga) progreso += 20;
    if (resistencia) progreso += 20;
    return progreso;
  };

  const compartirPorWhatsApp = () => {
    if (!nombreCliente.trim() || !telefonoCliente.trim()) {
      alert(
        "Por favor ingresá tu nombre y número de teléfono antes de compartir."
      );
      return;
    }

    const mensaje = `
📋 *Cotización de Concreto Premezclado*

👤 *Datos del cliente:*
Nombre: *${nombreCliente}*
Teléfono: *${telefonoCliente}*

📍 *Ubicación:*
Provincia: ${provincia}
Cantón: ${canton}

📦 *Detalles del pedido:*
- Cantidad: *${cantidad} m³*
- Tipo de descarga: *${descarga}*
- Resistencia: *${resistencia} kg/cm²*
${
  fechaEntrega
    ? `- Fecha tentativa de entrega: *${new Date(
        fechaEntrega
      ).toLocaleDateString()}*`
    : ""
}

💰 *Total estimado:* *₡${precioTotal.toLocaleString()}*

🖥️ Realizado desde el cotizador online:
${window.location.href}
`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;
    window.open(urlWhatsApp, "_blank");
  };

  useEffect(() => {
    const cantidadNum = parseFloat(cantidad);
    const resistenciaNum = parseInt(resistencia);

    const inputsValidos =
      provincia &&
      canton &&
      !isNaN(cantidadNum) &&
      cantidadNum > 0 &&
      !isNaN(resistenciaNum) &&
      descarga;

    if (!inputsValidos) {
      setPrecioTotal(0);
      return;
    }

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

    const precioUnitario =
      preciosPorCanton[provincia]?.[canton]?.[resistenciaNum] || 0;

    let total = 0;

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
      <h1 className="title">COTIZADOR DE CONCRETO</h1>
      <BarraProgreso progreso={calcularProgreso()} />

      {precioTotal > 0 && (
        <div className="summary-card">
          <div className="form-group">
            <label>Nombre del cliente</label>
            <input
              type="text"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              value={telefonoCliente}
              onChange={(e) => setTelefonoCliente(e.target.value)}
              placeholder="Ej: 8888-8888"
              required
            />
          </div>

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
          <button
            type="button"
            className="boton-share"
            onClick={compartirPorWhatsApp}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "8px",
                verticalAlign: "middle",
              }}
            />
            Enviar por WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
