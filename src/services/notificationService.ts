// Servicio de Notificaciones Web y PWA

export interface NotificationStatus {
  supported: boolean;
  permission: NotificationPermission;
}

class NotificationService {
  public getStatus(): NotificationStatus {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return { supported: false, permission: "denied" };
    }
    return {
      supported: true,
      permission: Notification.permission
    };
  }

  public async requestPermission(): Promise<boolean> {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    } catch (e) {
      console.warn("Error solicitando permisos de notificación:", e);
      return false;
    }
  }

  public async sendNotification(title: string, body: string): Promise<boolean> {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }

    if (Notification.permission !== "granted") {
      const granted = await this.requestPermission();
      if (!granted) return false;
    }

    try {
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(title, {
          body,
          icon: "/icon-192.svg",
          badge: "/icon-192.svg",
          tag: "morning-alarm",
          vibrate: [200, 100, 200],
        } as NotificationOptions);
        return true;
      } else {
        new Notification(title, {
          body,
          icon: "/icon-192.svg",
        });
        return true;
      }
    } catch (e) {
      console.warn("Fallo al enviar notificación nativa:", e);
      return false;
    }
  }

  // Comprueba si ya es la hora objetivo (06:00 AM)
  public isTargetTime(targetHour: number = 6, targetMinute: number = 0): boolean {
    const now = new Date();
    return now.getHours() === targetHour && now.getMinutes() === targetMinute;
  }
}

export const notificationService = new NotificationService();
