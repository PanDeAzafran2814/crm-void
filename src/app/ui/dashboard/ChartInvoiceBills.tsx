"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  tension: 0.3,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];

export const data = {
  labels,
  datasets: [
    {
      label: "Facturas",
      data: [37, 43, 34, 32, 23, 33, 22],
      borderColor: "#d8b970",
      backgroundColor: "#fff5e1",
    },
    {
      label: "Gastos",
      data: [44, 53, 24, 12, 43, 32, 33],
      borderColor: "#a68bbb",
      backgroundColor: "#efe6f7",
    },
  ],
};

export default function ChartInvoiceBills() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-semibold">Actividad</p>
        </div>
        <div>
          <div>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>Selecciona el Año</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>
      </div>
      <Line
        width={100}
        height={50}
        className="w-full h-full"
        options={options}
        data={data}
      />
    </div>
  );
}