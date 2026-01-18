import React, { useState, useEffect, useRef } from "react";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { type SocialProofType } from "@checkout-layout/types/checkout";
import { useSocialProofs } from "@/hooks/useSocialProofs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Star,
  Upload,
  X,
  Plus,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import type { SocialProofItem } from "@/types/social-proof";

interface SocialProofModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LocalProof extends Omit<SocialProofType, "id"> {
  id: string;
  file?: File;
  isNew?: boolean;
  isDirty?: boolean;
}

export const SocialProofModal: React.FC<SocialProofModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { theme, setTheme, data } = useCheckout();
  const productId = data.id;

  const {
    socialProofs: apiSocialProofs,
    loading,
    createSocialProof,
    updateSocialProof,
    deleteSocialProof,
    isCreating,
    isUpdating,
    isDeleting,
    refetch,
  } = useSocialProofs({ productId: productId || "" });

  const [localProofs, setLocalProofs] = useState<LocalProof[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const hasInitializedRef = useRef(false);

  // Carregar provas sociais da API quando o modal abrir
  useEffect(() => {
    if (isOpen && productId) {
      refetch();
      // Resetar erros de validação quando abrir
      setValidationErrors({});
      hasInitializedRef.current = false;
    } else if (!isOpen) {
      // Resetar estado local quando fechar sem salvar
      setLocalProofs([]);
      setValidationErrors({});
      hasInitializedRef.current = false;
    }
  }, [isOpen, productId, refetch]);

  // Sincronizar provas da API com o estado local quando o modal abrir
  useEffect(() => {
    if (isOpen && !loading && !hasInitializedRef.current) {
      hasInitializedRef.current = true;

      if (apiSocialProofs.length > 0) {
        const mappedProofs: LocalProof[] = apiSocialProofs.map((proof) => ({
          id: proof.id,
          image: proof.image,
          rating: proof.rating || 5,
          name: proof.name || "",
          text: proof.text,
          isNew: false,
          isDirty: false,
        }));
        setLocalProofs(mappedProofs);
      } else {
        // Se não há provas na API, usar as do tema como fallback
        const themeProofs: LocalProof[] = (theme.socialProofs || []).map(
          (proof) => ({
            id: proof.id,
            image: proof.image,
            rating: proof.rating || 5,
            name: proof.name || "",
            text: proof.text || "",
            isNew: false,
            isDirty: false,
          })
        );
        setLocalProofs(themeProofs);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, apiSocialProofs, loading]);

  const handleAddProof = () => {
    const newProof: LocalProof = {
      id: `temp-${Date.now()}`,
      image: "",
      rating: 5,
      name: "",
      text: "",
      isNew: true,
      isDirty: false,
    };
    setLocalProofs([...localProofs, newProof]);
  };

  const handleRemoveProof = async (id: string) => {
    const proof = localProofs.find((p) => p.id === id);

    // Se é uma prova nova (não salva), apenas remove do estado local
    if (proof?.isNew) {
      setLocalProofs(localProofs.filter((p) => p.id !== id));
      return;
    }

    // Se já existe na API, deleta
    if (productId && id && !id.startsWith("temp-")) {
      try {
        await deleteSocialProof(id);
        setLocalProofs(localProofs.filter((p) => p.id !== id));
      } catch (error) {
        // Erro já é tratado no hook
      }
    }
  };

  const handleUpdateProof = (
    id: string,
    field: keyof LocalProof,
    value: any
  ) => {
    setLocalProofs(
      localProofs.map((proof) => {
        if (proof.id === id) {
          return { ...proof, [field]: value, isDirty: true };
        }
        return proof;
      })
    );
    // Limpar erro de validação para este campo
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`${id}-${field}`];
      return newErrors;
    });
  };

  const handleImageUpload = (id: string, file: File) => {
    if (!file) {
      console.warn("Nenhum arquivo selecionado");
      return;
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      setValidationErrors((prev) => ({
        ...prev,
        [`${id}-file`]: "Por favor, selecione uma imagem válida",
      }));
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setValidationErrors((prev) => ({
        ...prev,
        [`${id}-file`]: "A imagem deve ter no máximo 5MB",
      }));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        console.log("Imagem carregada com sucesso, atualizando estado...", {
          id,
          imageLength: result.length,
        });

        // Atualizar ambos os campos de uma vez usando função de atualização
        setLocalProofs((prev) => {
          const updated = prev.map((proof) => {
            if (proof.id === id) {
              return {
                ...proof,
                image: result,
                file: file,
                isDirty: true,
              };
            }
            return proof;
          });
          console.log(
            "Estado atualizado:",
            updated.find((p) => p.id === id)
          );
          return updated;
        });

        // Limpar erro de validação
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`${id}-file`];
          return newErrors;
        });
      } else {
        console.error("Resultado do FileReader está vazio");
      }
    };

    reader.onerror = (error) => {
      console.error("Erro ao ler arquivo:", error);
      setValidationErrors((prev) => ({
        ...prev,
        [`${id}-file`]: "Erro ao carregar a imagem",
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleStarClick = (proofId: string, rating: number) => {
    handleUpdateProof(proofId, "rating", rating);
  };

  const validateProof = (proof: LocalProof): boolean => {
    const errors: Record<string, string> = {};

    if (proof.isNew) {
      // Validação para criação - imagem é opcional
      if (!proof.text || proof.text.trim().length === 0) {
        errors[`${proof.id}-text`] = "Texto é obrigatório";
      }
    } else {
      // Validação para atualização (mais flexível)
      if (proof.text && proof.text.trim().length === 0) {
        errors[`${proof.id}-text`] = "Texto não pode estar vazio";
      }
    }

    if (proof.rating && (proof.rating < 1 || proof.rating > 5)) {
      errors[`${proof.id}-rating`] = "Avaliação deve ser entre 1 e 5";
    }

    setValidationErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!productId) {
      return;
    }

    let hasErrors = false;

    // Validar todas as provas
    for (const proof of localProofs) {
      if (!validateProof(proof)) {
        hasErrors = true;
      }
    }

    if (hasErrors) {
      return;
    }

    try {
      const savedProofs: SocialProofItem[] = [];

      // Processar provas novas e atualizadas
      for (const proof of localProofs) {
        if (proof.isNew) {
          // Criar nova prova social - imagem é opcional
          if (!proof.text || proof.text.trim().length === 0) {
            throw new Error(
              `Texto é obrigatório para a prova social #${localProofs.indexOf(proof) + 1}`
            );
          }

          const createData: {
            file?: File;
            text: string;
            name?: string;
            rating?: number;
          } = {
            text: proof.text,
          };

          if (proof.file) {
            createData.file = proof.file;
          }
          if (proof.name) {
            createData.name = proof.name;
          }
          if (proof.rating) {
            createData.rating = proof.rating;
          }

          const result = await createSocialProof(createData);
          savedProofs.push(result);
        } else if (proof.isDirty) {
          // Atualizar prova existente
          const updateData: {
            file?: File;
            text?: string;
            name?: string;
            rating?: number;
          } = {};

          if (proof.file) {
            updateData.file = proof.file;
          }
          if (proof.text !== undefined && proof.text.trim().length > 0) {
            updateData.text = proof.text;
          }
          if (proof.name !== undefined) {
            updateData.name = proof.name;
          }
          if (proof.rating !== undefined) {
            updateData.rating = proof.rating;
          }

          if (Object.keys(updateData).length > 0) {
            const result = await updateSocialProof({
              proofId: proof.id,
              data: updateData,
            });
            savedProofs.push(result);
          } else {
            // Se não há mudanças para salvar, mantém a prova original
            const originalProof = apiSocialProofs.find(
              (p) => p.id === proof.id
            );
            if (originalProof) {
              savedProofs.push(originalProof);
            }
          }
        } else {
          // Prova não modificada, mantém original
          const originalProof = apiSocialProofs.find((p) => p.id === proof.id);
          if (originalProof) {
            savedProofs.push(originalProof);
          }
        }
      }

      // Atualizar tema local com as provas sociais salvas
      const updatedProofs: SocialProofType[] = savedProofs.map((p) => ({
        id: p.id,
        image: p.image,
        rating: p.rating || 5,
        name: p.name || "",
        text: p.text,
      }));

      setTheme({
        ...theme,
        socialProofs: updatedProofs,
      });

      // Recarregar provas da API para garantir sincronização
      await refetch();
      onClose();
    } catch (error: any) {
      // Erro já é tratado no hook, mas podemos adicionar tratamento adicional se necessário
      console.error("Erro ao salvar provas sociais:", error);
    }
  };

  const isLoading = loading || isCreating || isUpdating || isDeleting;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Provas sociais
          </DialogTitle>
          <DialogDescription>
            Gerencie as provas sociais do seu produto. Adicione avaliações,
            comentários e imagens dos seus clientes.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoading && localProofs.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="space-y-6">
              {localProofs.map((proof, index) => (
                <Card key={proof.id} className="p-6 relative bg-white">
                  <button
                    onClick={() => handleRemoveProof(proof.id)}
                    disabled={isDeleting}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                    ) : (
                      <X className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  <div className="flex gap-6">
                    {/* Upload de Imagem */}
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-semibold mb-2">
                        #{index + 1}
                        {proof.isNew && (
                          <span className="ml-2 text-xs text-purple-500">
                            (Nova)
                          </span>
                        )}
                        {proof.isDirty && !proof.isNew && (
                          <span className="ml-2 text-xs text-orange-500">
                            (Modificada)
                          </span>
                        )}
                      </div>
                      <div className="relative group">
                        {proof.image && proof.image.trim() !== "" ? (
                          <div className="relative w-32 h-32">
                            <img
                              src={proof.image}
                              alt={proof.name || "Prova social"}
                              className="w-full h-full object-cover rounded-lg"
                              onError={() => {
                                // Se a imagem falhar ao carregar, limpar o src
                                console.error(
                                  "Erro ao carregar imagem:",
                                  proof.image
                                );
                                setLocalProofs((prev) =>
                                  prev.map((p) =>
                                    p.id === proof.id ? { ...p, image: "" } : p
                                  )
                                );
                              }}
                            />
                            <label
                              htmlFor={`image-${proof.id}`}
                              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg"
                            >
                              <Upload className="w-6 h-6 text-white" />
                            </label>
                          </div>
                        ) : (
                          <label
                            htmlFor={`image-${proof.id}`}
                            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500 text-center">
                              Adicionar foto
                            </span>
                            <span className="text-xs text-gray-400 mt-1">
                              150 px x 150 px
                            </span>
                          </label>
                        )}
                        <input
                          id={`image-${proof.id}`}
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(proof.id, file);
                            }
                            // Resetar o input para permitir selecionar o mesmo arquivo novamente
                            e.target.value = "";
                          }}
                        />
                        {validationErrors[`${proof.id}-file`] && (
                          <p className="text-xs text-red-500 mt-1 text-center">
                            {validationErrors[`${proof.id}-file`]}
                          </p>
                        )}
                        <div className="text-xs text-gray-500 mt-2 text-center">
                          Imagem em .jpg com
                          <br />
                          <span className="font-semibold">150 px x 150 px</span>
                        </div>
                      </div>
                    </div>

                    {/* Formulário */}
                    <div className="flex-1 space-y-4">
                      {/* Avaliação em Estrelas */}
                      <div className="space-y-1">
                        <Label>Avaliação</Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleStarClick(proof.id, star)}
                              className="transition-colors"
                              type="button"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= (proof.rating || 0)
                                    ? "fill-current"
                                    : "fill-none"
                                }`}
                                style={{
                                  color:
                                    star <= (proof.rating || 0)
                                      ? theme.defaultColors.socialProofStars
                                      : "#d1d5db",
                                }}
                              />
                            </button>
                          ))}
                        </div>
                        {validationErrors[`${proof.id}-rating`] && (
                          <p className="text-xs text-red-500">
                            {validationErrors[`${proof.id}-rating`]}
                          </p>
                        )}
                      </div>

                      {/* Nome */}
                      <div className="space-y-1">
                        <Label htmlFor={`name-${proof.id}`}>
                          Nome (opcional)
                        </Label>
                        <Input
                          id={`name-${proof.id}`}
                          value={proof.name || ""}
                          className="text-gray-900 border-gray-900/20 focus-visible:ring-gray-900/20 bg-white"
                          onChange={(e) =>
                            handleUpdateProof(proof.id, "name", e.target.value)
                          }
                          placeholder="Ex: João Silva"
                        />
                      </div>

                      {/* Texto */}
                      <div className="space-y-1">
                        <Label htmlFor={`text-${proof.id}`}>
                          Texto da prova social *
                        </Label>
                        <Textarea
                          id={`text-${proof.id}`}
                          value={proof.text || ""}
                          onChange={(e) =>
                            handleUpdateProof(proof.id, "text", e.target.value)
                          }
                          placeholder="Descreva a prova social..."
                          className="text-gray-900 border-gray-900/20 focus-visible:ring-gray-900/20 bg-white"
                          rows={3}
                          maxLength={500}
                        />
                        <div className="flex justify-between items-center">
                          <div>
                            {validationErrors[`${proof.id}-text`] && (
                              <p className="text-xs text-red-500">
                                {validationErrors[`${proof.id}-text`]}
                              </p>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            {(proof.text || "").length} / 500 caracteres
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Botão Adicionar Nova Prova Social */}
              <Button
                variant="outline"
                onClick={handleAddProof}
                disabled={isLoading}
                className="w-full border-dashed border-2 text-gray-900 hover:text-gray-900 border-gray-900/20 focus-visible:ring-gray-900/20 bg-white hover:bg-purple-400 disabled:opacity-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar nova prova social
              </Button>
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          <Button
            variant="outline"
            className="text-gray-900 border-gray-900/20 focus-visible:ring-gray-900/20 bg-white hover:bg-gray-400 hover:text-gray-900"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-purple-500 hover:bg-purple-500/90 text-white disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
