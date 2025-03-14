import { useState, useEffect } from "react";

interface CallTimerProps {
  isCallActive: boolean;
}

const CallTimer: React.FC<CallTimerProps> = ({ isCallActive }) => {
  const [seconds, setSeconds] = useState<number>(0);
  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isCallActive) {
      setSeconds(0); // Reset timer on new call
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup
    };
  }, [isCallActive]);

  // Format time as HH:MM:SS
  const formatTime = (time: number): string => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return <div>Call Duration: {formatTime(seconds)}</div>;
};

export default CallTimer;
