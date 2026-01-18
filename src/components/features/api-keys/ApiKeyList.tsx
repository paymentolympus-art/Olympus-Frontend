import { motion } from "framer-motion";
import { ApiKeyCard } from "./ApiKeyCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Key } from "lucide-react";
import type { ApiKey } from "@/types/api-key";

interface ApiKeyListProps {
  apiKeys: ApiKey[];
  isLoading: boolean;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
}

export function ApiKeyList({
  apiKeys,
  isLoading,
  onEdit,
  onDelete,
}: ApiKeyListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-12 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (apiKeys.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="p-4 rounded-full bg-tertiary border mb-4">
          <Key className="h-8 w-8 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Nenhuma API Key encontrada
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Você ainda não criou nenhuma API Key. Crie sua primeira chave para
          começar a integrar com a API.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {apiKeys.map((apiKey, index) => (
        <ApiKeyCard
          key={apiKey.id}
          apiKey={apiKey}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
