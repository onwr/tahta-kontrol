import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import logo from "../images/siluet.png";
import { db } from "../Firebase";

const Panel = () => {
  const [aktif, setAktif] = useState("giris");

  const handleUpdateDurum = async (durum) => {
    const docRef = doc(db, "video", "battal1");
    try {
      await updateDoc(docRef, { durum });
      setAktif(durum);
    } catch (error) {
      console.error("Durum güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <img src={logo} className="w-40 mx-auto pt-5" alt="Logo" />
      <p className="text-2xl font-semibold mt-1 text-center text-gray-800">
        Bilişim Teknolojileri Alanı
      </p>
      <p className="text-sm font-semibold mt-1 text-center text-gray-800">
        &copy; Onur Kürkaya
      </p>
      <div className="flex flex-col gap-4 mt-5 max-w-md items-center justify-center mx-auto">
        <button
          className={`p-3 border rounded-lg w-80 text-xl font-medium transition-all ${
            aktif === "giris"
              ? "bg-green-400 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleUpdateDurum("giris")}
        >
          Giriş Sayfası
        </button>
        <button
          className={`p-3 border rounded-lg w-full text-xl font-medium transition-all ${
            aktif === "mars"
              ? "bg-green-400 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleUpdateDurum("mars")}
        >
          İSTİKLAL MARŞI
        </button>
        <button
          className={`p-3 border rounded-lg w-full text-xl font-medium transition-all ${
            aktif === "ogretmenlergunu"
              ? "bg-green-400 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleUpdateDurum("ogretmenlergunu")}
        >
          Öğretmenler Günü
        </button>
        <button
          className={`p-3 border rounded-lg w-full text-xl font-medium transition-all ${
            aktif === "fon1"
              ? "bg-green-400 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleUpdateDurum("fon1")}
        >
          Fon 1
        </button>
        <button
          className={`p-3 border rounded-lg w-full text-xl font-medium transition-all ${
            aktif === "fon2"
              ? "bg-green-400 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleUpdateDurum("fon2")}
        >
          Fon 2
        </button>
      </div>
    </div>
  );
};

export default Panel;
