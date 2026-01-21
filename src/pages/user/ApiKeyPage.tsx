import { useState } from "react";
import { PageContainer } from "@/components/widgets/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Key, Shield, ExternalLink } from "lucide-react";
import { useApiKeys } from "@/hooks/useApiKeys";
import {
  ApiKeyList,
  ApiKeyCreateForm,
  ApiKeyEditForm,
  SecretModal,
} from "@/components/features/api-keys";
import type { ApiKey, ApiKeyWithSecret } from "@/types/api-key";
import type {
  CreateApiKeyFormData,
  UpdateApiKeyFormData,
} from "@/validators/api-key";

export function ApiKeyPage() {
  const {
    apiKeys,
    total,
    isLoading,
    createApiKey,
    isCreating,
    updateApiKey,
    isUpdating,
    deleteApiKey,
  } = useApiKeys();

  // Estado para modal de criação
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  // Estado para modal de edição
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingApiKey, setEditingApiKey] = useState<ApiKey | null>(null);

  // Estado para modal de exibição do secret
  const [createdApiKey, setCreatedApiKey] = useState<ApiKeyWithSecret | null>(
    null
  );
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);

  const handleCreateApiKey = async (data: CreateApiKeyFormData) => {
    const result = await createApiKey(data);
    setCreatedApiKey(result.apiKey);
    setIsSecretModalOpen(true);
  };

  const handleUpdateApiKey = async (data: UpdateApiKeyFormData) => {
    if (!editingApiKey) return;
    await updateApiKey(editingApiKey.id, data);
    setEditingApiKey(null);
  };

  const handleEdit = (apiKey: ApiKey) => {
    setEditingApiKey(apiKey);
    setIsEditFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteApiKey(id);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setEditingApiKey(null);
  };

  return (
    <PageContainer title="API Keys">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl text-primary bg-primary/10 rounded-lg p-2.5">
            <Key />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">API Keys</h1>
            <p className="text-muted-foreground">
              {total} {total === 1 ? "chave cadastrada" : "chaves cadastradas"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            asChild
            className="gap-2 border-yellow-400/30 hover:bg-yellow-400/10 hover:border-yellow-400/50"
          >
            <a
              href="https://docs.olympuspay.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              Documentação
            </a>
          </Button>
          <Button
            onClick={() => setIsCreateFormOpen(true)}
            className="bg-gradient-to-r from-yellow-400/80 to-yellow-500/80 hover:from-yellow-500/90 hover:to-yellow-600/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova API Key
          </Button>
        </div>
      </div>

      {/* Informações de Segurança */}
      <Card className="p-4 bg-gradient-to-r from-yellow-400/5 to-yellow-500/5 border-yellow-400/20">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-yellow-400/10">
            <Shield className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1">
              Dicas de Segurança
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                • A chave secreta (secret) é exibida{" "}
                <strong>apenas uma vez</strong> durante a criação.
              </li>
              <li>
                • Configure IPs e domínios permitidos para aumentar a segurança.
              </li>
              <li>
                • Revogue imediatamente chaves que possam ter sido
                comprometidas.
              </li>
              <li>• Use variáveis de ambiente para armazenar suas chaves.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Lista de API Keys */}
      <ApiKeyList
        apiKeys={apiKeys}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal de Criação */}
      <ApiKeyCreateForm
        open={isCreateFormOpen}
        onOpenChange={setIsCreateFormOpen}
        onSubmit={handleCreateApiKey}
        isLoading={isCreating}
      />

      {/* Modal de Edição */}
      <ApiKeyEditForm
        open={isEditFormOpen}
        onOpenChange={handleCloseEditForm}
        onSubmit={handleUpdateApiKey}
        apiKey={editingApiKey}
        isLoading={isUpdating}
      />

      {/* Modal de Exibição do Secret */}
      <SecretModal
        open={isSecretModalOpen}
        onOpenChange={setIsSecretModalOpen}
        apiKey={createdApiKey}
      />
    </PageContainer>
  );
}
