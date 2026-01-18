"use client";

import imageCompression from "browser-image-compression";
import { useState } from "react";
import { Camera, User, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AvatarUploadFieldProps {
  onChange?: (file: File | null) => void;
  position?: "left" | "right" | "center";
  initialImage?: string | null;
  label?: string;
  inputId?: string;
  establishmentId?: string;
  onUploadSuccess?: (imageUrl: string) => void;
  onDeleteSuccess?: () => void;
  autoUpload?: boolean;
}

export function AvatarUploadField({
  onChange,
  position = "left",
  initialImage = null,
  label = "Foto do perfil",
  inputId = "avatar-upload",
  establishmentId,
  onUploadSuccess,
  onDeleteSuccess,
  autoUpload = false,
}: AvatarUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 400,
        useWebWorker: true,
        fileType: "image/webp",
      });

      // Preview imediato
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(compressedFile);

      // Upload automático se habilitado
      if (autoUpload && establishmentId) {
        await uploadAvatar(compressedFile);
      } else {
        // Callback tradicional
        onChange?.(compressedFile);
      }
    } else {
      onChange?.(null);
      setPreview(null);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!establishmentId) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `/api/establishments/${establishmentId}/avatar`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao fazer upload do avatar");
      }

      const result = await response.json();
      toast.success("Avatar atualizado com sucesso!");
      onUploadSuccess?.(result.establishment.image);
    } catch (error) {
      toast.error("Erro ao fazer upload do avatar");
      setPreview(initialImage); // Reverter preview
    } finally {
      setIsUploading(false);
    }
  };

  const deleteAvatar = async () => {
    if (!establishmentId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/establishments/${establishmentId}/avatar`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao deletar avatar");
      }

      toast.success("Avatar deletado com sucesso!");
      setPreview(null);
      onDeleteSuccess?.();
    } catch (error) {
      toast.error("Erro ao deletar avatar");
    } finally {
      setIsDeleting(false);
    }
  };

  const removeImage = () => {
    onChange?.(null);
    setPreview(null);
  };

  return (
    <div
      className={`space-y-3 ${
        position === "center"
          ? "flex flex-col justify-center items-center"
          : position === "left"
            ? "flex flex-col justify-start items-start"
            : "flex flex-col justify-end items-end"
      }`}
    >
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {preview ? (
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-orange-400 bg-gray-100 shadow-lg">
            <img
              src={preview}
              alt="Avatar preview"
              className="w-full h-full object-cover"
            />
            {(isUploading || isDeleting) && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={establishmentId ? deleteAvatar : removeImage}
            disabled={isUploading || isDeleting}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50"
            title={establishmentId ? "Deletar imagem" : "Remover imagem"}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 cursor-pointer rounded-full border-2 border-dashed border-orange-400 hover:border-orange-500 transition-colors bg-gray-50 hover:bg-gray-100 shadow-sm"
        >
          <User className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 mb-1" />
          <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading || isDeleting}
          />
        </label>
      )}
    </div>
  );
}
