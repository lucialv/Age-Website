import React, { useState, useEffect } from "react";

const AgeCounter = () => {
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateAge = () => {
      const birthday = new Date("2007-11-13"); // Tu fecha de nacimiento
      const now = new Date();

      const diff = now - birthday;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.436875)
      ); // 30.436875 días promedio por mes
      const days = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 30.436875)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setAge({ years, months, days, hours, minutes, seconds });
    };

    const intervalId = setInterval(calculateAge, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo cuando se desmonta el componente
  }, []);

  return (
    <div>
      <p>
        {age.years} years, {age.months} months, {age.days} days, {age.hours}{" "}
        hours, {age.minutes} minutes and {age.seconds} seconds
      </p>
    </div>
  );
};

export default AgeCounter;
