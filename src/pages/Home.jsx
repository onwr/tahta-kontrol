import React, { useEffect, useState, useRef } from "react";
import logo from "../images/siluet.png";
import gul from "../images/duz/gul.jpg";
import { db } from "../Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import mars from "../videos/istiklalmars.mp4";
import salavat from "../videos/salavat.mp4";
import sinevizyon from "../videos/sinevizyon.mp4";
import yanarim from "../videos/yanarim.mp4";
import kirkyas from "../videos/kirkyas.mp4";

const Home = () => {
  const [videoStatus, setVideoStatus] = useState("giris");
  const [audioLevels, setAudioLevels] = useState({});
  const videoRef = useRef(null);

  useEffect(() => {
    const audioDocRef = doc(db, "video", "battal2");

    const unsubscribeAudio = onSnapshot(audioDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setAudioLevels(docSnapshot.data());
      } else {
        console.log("Ses seviyeleri mevcut değil!");
      }
    });

    return () => unsubscribeAudio();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "video", "battal1");

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setVideoStatus(data.durum);
      } else {
        console.log("Belge mevcut değil!");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (videoRef.current && audioLevels[videoStatus] !== undefined) {
      const volumeLevel = audioLevels[videoStatus] / 100;
      videoRef.current.volume = volumeLevel;
    }
  }, [videoStatus, audioLevels]);

  return (
    <div>
      {videoStatus === "giris" && (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${gul})` }}
          />
          <img src={logo} className="z-50" alt="Logo" />
          <p className="font-semibold z-50 text-9xl mt-5">
            Mevlid-i Nebi Programı
          </p>
          <p className="font-medium z-50 text-6xl mt-2">
            Tuğba Ekin Bilgin & Huri Görgül
          </p>
          <div className="absolute bottom-0 py-2 border-t w-full">
            <p className="text-3xl text-center font-semibold">
              BİLİŞİM TEKNOLOJİLERİ ALANI
            </p>
            <p className="text-xl mt-1 text-center">&copy; Onur Kürkaya</p>
          </div>
        </div>
      )}
      {videoStatus !== "giris" && (
        <div className="min-h-screen">
          <video
            ref={videoRef}
            src={
              videoStatus === "salavat"
                ? salavat
                : videoStatus === "mars"
                ? mars
                : videoStatus === "nebi"
                ? sinevizyon
                : videoStatus === "yanarim"
                ? yanarim
                : videoStatus === "kirk"
                ? kirkyas
                : null
            }
            autoPlay
            className="w-full"
            onError={(e) => console.log("Error loading video:", e)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default Home;
