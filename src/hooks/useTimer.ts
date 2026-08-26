import { useState, useEffect, useRef, useCallback } from "react";
import { soundService } from "../services/soundService";

export interface TimerOptions {
  initialMinutes?: number;
  soundEnabled?: boolean;
  onComplete?: () => void;
}

export function useTimer({
  initialMinutes = 15,
  soundEnabled = true,
  onComplete
}: TimerOptions = {}) {
  const totalSeconds = initialMinutes * 60;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const endTimeRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Iniciar o pausar
  const toggleTimer = useCallback(() => {
    if (isRunning) {
      // Pausar
      setIsRunning(false);
      endTimeRef.current = null;
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      // Reanudar / Iniciar
      if (isCompleted) {
        setTimeLeft(totalSeconds);
        setIsCompleted(false);
      }
      if (soundEnabled) {
        soundService.playStart();
      }
      setIsRunning(true);
      endTimeRef.current = Date.now() + timeLeft * 1000;
    }
  }, [isRunning, isCompleted, timeLeft, totalSeconds, soundEnabled]);

  // Reiniciar
  const resetTimer = useCallback((newMinutes?: number) => {
    const mins = newMinutes !== undefined ? newMinutes : initialMinutes;
    const secs = mins * 60;
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(secs);
    endTimeRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
  }, [initialMinutes]);

  // Añadir o restar tiempo (+1 min, -1 min)
  const adjustTime = useCallback((deltaSeconds: number) => {
    setTimeLeft((prev) => {
      const next = Math.max(10, prev + deltaSeconds);
      if (isRunning && endTimeRef.current) {
        endTimeRef.current = Date.now() + next * 1000;
      }
      return next;
    });
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        if (!endTimeRef.current) return;
        const remainingMs = endTimeRef.current - Date.now();
        const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

        // Sonidos de cuenta regresiva en los últimos 3 segundos
        if (soundEnabled) {
          if (remainingSec === 3 || remainingSec === 2) {
            soundService.playCountdownTick(false);
          } else if (remainingSec === 1) {
            soundService.playCountdownTick(true);
          }
        }

        if (remainingSec <= 0) {
          setTimeLeft(0);
          setIsRunning(false);
          setIsCompleted(true);
          if (timerRef.current) clearInterval(timerRef.current);

          if (soundEnabled) {
            soundService.playVictory();
          }
          if (onComplete) {
            onComplete();
          }
        } else {
          setTimeLeft(remainingSec);
        }
      }, 500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, soundEnabled, onComplete]);

  // Formato MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - timeLeft) / totalSeconds) * 100));

  return {
    timeLeft,
    totalSeconds,
    formattedTime,
    minutes,
    seconds,
    progressPercent,
    isRunning,
    isCompleted,
    toggleTimer,
    resetTimer,
    adjustTime,
    setTimeLeft
  };
}
