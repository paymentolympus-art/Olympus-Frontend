import { useState } from "react";
import { HiMiniBell, HiMiniTrash } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  type?: "info" | "success" | "warning" | "error";
}

interface NavNotificationProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: number) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
}

const defaultNotifications: Notification[] = [
  {
    id: 1,
    title: "Nova venda realizada",
    description: "Você recebeu um pagamento de R$ 150,00",
    timestamp: "2 min atrás",
    isRead: false,
    type: "success",
  },
  {
    id: 2,
    title: "Produto em estoque baixo",
    description: "O produto 'Produto A' está com estoque baixo",
    timestamp: "1 hora atrás",
    isRead: false,
    type: "warning",
  },
  {
    id: 3,
    title: "Atualização do sistema",
    description: "Nova versão disponível com melhorias",
    timestamp: "3 horas atrás",
    isRead: true,
    type: "info",
  },
];

export function NavNotification({
  notifications = defaultNotifications,
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: NavNotificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const unreadCount = localNotifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (notificationId: number) => {
    setLocalNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
    onMarkAsRead?.(notificationId);
  };

  const handleMarkAllAsRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    onMarkAllAsRead?.();
  };

  const handleClearAll = () => {
    setLocalNotifications([]);
    onClearAll?.();
  };

  const getNotificationColor = (type?: string) => {
    switch (type) {
      case "success":
        return "border-green-500 bg-purple-950";
      case "warning":
        return "border-yellow-500 bg-purple-950";
      case "error":
        return "border-red-500 bg-purple-950";
      default:
        return "border-blue-500 bg-purple-950";
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-md"
        >
          <HiMiniBell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1"
            >
              <div className="h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </div>
            </motion.div>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 max-h-96 overflow-hidden"
        sideOffset={8}
      >
        <div className="flex items-center justify-between p-4 pb-2">
          <h3 className="font-semibold text-sm">Notificações</h3>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="h-6 px-2 text-xs"
              >
                Marcar todas como lidas
              </Button>
            )}
            {localNotifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-6 w-6 p-0 text-gray-600 hover:text-gray-100"
                title="Limpar todas as notificações"
              >
                <HiMiniTrash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-64 overflow-y-auto">
          <AnimatePresence>
            {localNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <HiMiniBell className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Nenhuma notificação</p>
                <p className="text-xs text-gray-400">
                  Você está em dia com suas notificações
                </p>
              </motion.div>
            ) : (
              localNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "bg-accent border-l-4 p-3 hover:bg-accent transition-colors cursor-pointer",
                    getNotificationColor(notification.type),
                    !notification.isRead && "bg-accent border-purple-500"
                  )}
                  onClick={() => {
                    if (!notification.isRead) {
                      handleMarkAsRead(notification.id);
                    }
                    onNotificationClick?.(notification);
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm font-medium truncate",
                            !notification.isRead && "font-semibold"
                          )}
                        >
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-200 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {localNotifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                onClick={() => setIsOpen(false)}
              >
                Ver todas as notificações
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
