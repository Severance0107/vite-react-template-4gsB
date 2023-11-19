import React, { useState } from "react";
import logo from "../assets/images/LogoPlataforma.png";
import { Link } from "react-router-dom";
import Factura from "../components/Factura";
import Pasos from "../components/Pasos";
import useAuth from "../hooks/useAuth";
import DatosPagador from "../components/DatosPagador";
import DatosMetodoPago from "../components/DatosMetodoPago";

export default function Pagos() {

  const {pagoState} = useAuth()
  const [nFactura, setNFactura] = useState("");
  const [factura, setFactura] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(nFactura);
  };



  return (
    <div className="flex h-full">
      <div className="flex flex-col items-center w-3/12 mx-10">
        <img className="logo" src={logo} />
        <form
          action=""
          className="w-full m-10 p-5 bg-stone-700 rounded-md shadow-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <h2
              htmlFor="nFactura"
              className="uppercase text-zinc-50 block text-lg font-bold"
            >
              Número de Factura
            </h2>
            <input
              id="nFactura"
              type="text"
              placeholder="Escribe el número de la factura a pagar"
              className="w-full mt-2 p-2 border rounded-md bg-gray-50"
              value={nFactura}
              onChange={(e) => setNFactura(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="bg-orange-500 text-zinc-50 p-2 text-xl font-semibold rounded-md"
              type="submit"
            >
              Buscar Factura
            </button>
          </div>
        </form>

        <Link
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#F97316"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center bg-stone-700 w-9/12 mx-10 my-20 shadow-lg rounded-md">
        <h1 className="text-4xl text-orange-500">Informacion del Pago</h1>

        {
          factura.item !== null ? (
            <>
              <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5">
                <div className="p-10">
                  <Pasos />
                  {
                    pagoState === 1 ? (
                      <Factura factura={factura}/>
                    ) : (
                      pagoState === 2 ? (
                        <DatosPagador />
                      ) : (
                        pagoState === 3 && (<DatosMetodoPago />)
                      )
                    )
                  }
                </div>
              </main>
            </>
          ) : (
            <h1 className=" my-10 text-3xl text-zinc-50">Ingresa el numero de la factura</h1>
          )
        }


      </div>
    </div>
  );
}
