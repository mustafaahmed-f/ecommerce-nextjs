"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TimerSectionProps {
  initialTimer: { hour: number; min: number; sec: number };
}

function TimerSection({ initialTimer }: TimerSectionProps) {
  const { 0: timer, 1: setTimer } = useState<{
    hour: number;
    min: number;
    sec: number;
  }>(initialTimer);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const handleTimer = useCallback(() => {
    setTimer((prevTimer) => {
      if (prevTimer["hour"] === 0) {
        return initialTimer;
      } else if (prevTimer["min"] === 0 && prevTimer["sec"] === 0) {
        return { hour: prevTimer["hour"] - 1, min: 59, sec: 59 };
      } else if (prevTimer["sec"] === 0) {
        return { ...prevTimer, min: prevTimer["min"] - 1, sec: 59 };
      } else {
        return { ...prevTimer, sec: prevTimer["sec"] - 1 };
      }
    });
  }, [initialTimer, setTimer]);

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      handleTimer();
    }, 1000);

    return () => {
      clearInterval(timerInterval.current! as NodeJS.Timeout);
    };
  }, [handleTimer]);

  return (
    <div className="grid w-full grid-cols-5">
      <p className="mb-0 font-semibold">
        {String(timer["hour"]).length < 2
          ? `0${String(timer["hour"])}`
          : `${String(timer["hour"])}`}
      </p>
      <p className="mb-0 font-semibold">:</p>
      <p className="mb-0 font-semibold">
        {String(timer["min"]).length < 2
          ? `0${String(timer["min"])}`
          : `${String(timer["min"])}`}
      </p>
      <p className="mb-0 font-semibold">:</p>
      <p className="mb-0 font-semibold">
        {String(timer["sec"]).length < 2
          ? `0${String(timer["sec"])}`
          : `${String(timer["sec"])}`}
      </p>

      <p className="mb-0 font-semibold">hour</p>
      <p className="mb-0 font-semibold"></p>
      <p className="mb-0 font-semibold">min</p>
      <p className="mb-0 font-semibold"></p>
      <p className="mb-0 font-semibold">sec</p>
    </div>
  );
}

export default TimerSection;
