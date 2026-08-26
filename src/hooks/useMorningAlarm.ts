import { useState, useEffect, useCallback } from "react";
import { notificationService } from "../services/notificationService";
import { soundService } from "../services/soundService";

export interface MorningAlarmState {
  targetHour: number;
  targetMinute: number;
  targetTimeString: string; // "06:00 AM"
  timeUntilTarget: string; // "en 21h 14m"
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  isTargetNow: boolean;
  hasNotificationPermission: boolean;
  requestNotifications: () => Promise<boolean>;
  triggerTestAlarm: () => void;
}

export function useMorningAlarm(targetTime: string = "06:00", soundEnabled: boolean = true): MorningAlarmState {
  const [targetHour, targetMinute] = targetTime.split(":").map(Number);
  const [timeUntilTarget, setTimeUntilTarget] = useState<string>("");
  const [hoursRemaining, setHoursRemaining] = useState<number>(0);
  const [minutesRemaining, setMinutesRemaining] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isTargetNow, setIsTargetNow] = useState<boolean>(false);
  const [hasNotificationPermission, setHasNotificationPermission] = useState<boolean>(false);

  // Comprobar permisos
  useEffect(() => {
    const status = notificationService.getStatus();
    setHasNotificationPermission(status.permission === "granted");
  }, []);

  // Calcular tiempo restante hacia las 06:00 AM
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextTarget = new Date();
      nextTarget.setHours(targetHour, targetMinute, 0, 0);

      // Si ya pasó las 06:00 AM hoy, el objetivo es mañana a las 06:00 AM
      if (now.getTime() >= nextTarget.getTime()) {
        // Si estamos exactamente en el minuto objetivo
        if (now.getHours() === targetHour && now.getMinutes() === targetMinute) {
          setIsTargetNow(true);
        } else {
          setIsTargetNow(false);
          nextTarget.setDate(nextTarget.getDate() + 1);
        }
      } else {
        setIsTargetNow(false);
      }

      const diffMs = nextTarget.getTime() - now.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const hrs = Math.floor(diffSec / 3600);
      const mins = Math.floor((diffSec % 3600) / 60);
      const secs = diffSec % 60;

      setHoursRemaining(hrs);
      setMinutesRemaining(mins);
      setSecondsRemaining(secs);

      if (hrs === 0 && mins === 0 && secs <= 5) {
        setTimeUntilTarget("¡Hora de activar el cuerpo!");
      } else if (hrs === 0) {
        setTimeUntilTarget(`en ${mins}m ${secs}s`);
      } else {
        setTimeUntilTarget(`en ${hrs}h ${mins}m`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetHour, targetMinute]);

  const requestNotifications = useCallback(async (): Promise<boolean> => {
    const granted = await notificationService.requestPermission();
    setHasNotificationPermission(granted);
    if (granted) {
      notificationService.sendNotification(
        "🔔 Recordatorio 06:00 AM Activado",
        "Te notificaremos cada mañana para tu rutina de 15 minutos de postura."
      );
    }
    return granted;
  }, []);

  const triggerTestAlarm = useCallback(() => {
    if (soundEnabled) {
      soundService.playMorningAlarm();
    }
    notificationService.sendNotification(
      "🌅 ¡Son las 06:00 AM! Fitness de Oficina",
      "Es momento de tus 15 minutos de postura y energía antes del escritorio."
    );
  }, [soundEnabled]);

  return {
    targetHour,
    targetMinute,
    targetTimeString: "06:00 AM",
    timeUntilTarget,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    isTargetNow,
    hasNotificationPermission,
    requestNotifications,
    triggerTestAlarm
  };
}
