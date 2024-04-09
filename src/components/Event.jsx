import { useEffect, useState } from "react";

// Establecer startDate como una fecha fija
const startDate = new Date("2007-11-13");

const Event = ({ titulo, fecha }) => {
  const endDate = new Date(fecha);

  const [progressWidth, setProgressWidth] = useState("0%");
  const [progress, setProgress] = useState(0);
  const [progressWithDecimals, setProgressWithDecimals] = useState("0.00");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [iniciado, setIniciado] = useState(true);
  const [finalizado, setFinalizado] = useState(false);

  const updateProgress = () => {
    const currentTime = new Date();

    if (currentTime >= endDate) {
      setProgressWidth("100%");
      setProgress(100);
      setProgressWithDecimals("100.00");
      setDaysRemaining(0);
      setFinalizado(true);
      return;
    }

    if (progress < 0) {
      setProgressWidth("0%");
      setProgress(0);
      setProgressWithDecimals(progress.toFixed(0));
      setDaysRemaining(0);

      const remainingStartTime = startDate - currentTime;
      const remainingStartDays = Math.ceil(
        remainingStartTime / (1000 * 60 * 60 * 24)
      );

      const remainingTime = endDate - currentTime;
      const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(remainingDays);

      setIniciado(false);
      return;
    }

    const totalTime = endDate - startDate;
    const elapsed = currentTime - startDate;
    const remainingTime = endDate - currentTime;
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    const currentProgress = Math.min(100, (elapsed / totalTime) * 100);

    setProgressWidth(`${currentProgress}%`);
    setProgress(currentProgress);
    setProgressWithDecimals(currentProgress.toFixed(2));
    setDaysRemaining(remainingDays);

    requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    updateProgress();

    return () => {
      // No se necesita hacer nada aquí ya que la actualización del progreso se detendrá automáticamente cuando el componente se desmonte.
    };
  }, [endDate]);

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="w-full">
        <div className="flex justify-center">
          <h1 className="mb-5 whitespace-nowrap text-center text-xl text-white md:text-2xl">
            <span className="rounded-full via-pink-400 from-fuchsia-500 to-fuchsia-500 bg-gradient-to-br px-4 py-1 pb-2 font-bold text-white">
              {titulo}
            </span>
          </h1>
        </div>
        <div className="relative h-4 w-1/2 min-w-[288px] max-w-[610px] mx-auto overflow-hidden rounded-full bg-fuchsia-300/75">
          <div
            className="animate-stripes absolute left-0 top-0 h-full rounded-lg bg-fuchsia-400"
            style={{ width: progressWidth }}
          ></div>
        </div>
        <p className="mt-2 text-center text-2xl text-fuchsia-700 font-semibold">
          <span className="font-bold text-fuchsia-400">
            {progressWithDecimals.slice(0, -3)}
          </span>
          {progressWithDecimals.slice(-3)}
          <span className="font-bold text-fuchsia-400"> %</span>
        </p>
        {daysRemaining > 0 && (
          <p className="mt-2 text-center text-2xl font-semibold text-fuchsia-800">
            <span className="font-bold text-fuchsia-400">
              {daysRemaining} days remaining
            </span>{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Event;
