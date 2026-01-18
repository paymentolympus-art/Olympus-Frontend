import { useRef, useState, useEffect } from "react";

type Props = {
  disabled?: boolean;
  accept?: string;
  title?: string;
  subtitle?: string;
  onSelected: (file: File | null) => void;
  value?: File | null;
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

export function UploadInput({
  disabled,
  accept,
  title = "Upload de imagem",
  subtitle = "Tamanho máx. 5MB",
  onSelected,
  value,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(value ?? null);

  useEffect(() => {
    setSelectedFile(value ?? null);
  }, [value]);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  function handleClick() {
    if (disabled) return;
    inputRef.current?.click();
  }

  function isImageFile(fileUrl: string): boolean {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const lowerUrl = fileUrl.toLowerCase();
    // Verifica se a URL contém alguma extensão de imagem
    return imageExtensions.some((ext) => lowerUrl.includes(ext));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    onSelected(file);
  }

  function handleRemove() {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onSelected(null);
  }

  return (
    <div className="w-full">
      {selectedFile && previewUrl ? (
        <div className="max-w-[300px] sm:max-w-[350px] w-full rounded-xl border border-[#2b1f3f] bg-[#0f0a18] p-4 space-y-3">
          {isImageFile(previewUrl) ? (
            <div className="relative w-full rounded-lg overflow-hidden bg-[#0a0610] aspect-video">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="relative w-full rounded-lg overflow-hidden bg-[#0a0610] aspect-video">
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title={title}
                style={{ border: "none" }}
              />
            </div>
          )}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white font-medium truncate max-w-[70%]">
                {selectedFile.name}
              </span>
              {!disabled && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-xs text-white/60 hover:text-white/80 transition-colors"
                >
                  Remover
                </button>
              )}
            </div>
            <div className="text-xs text-white/60">
              {formatFileSize(selectedFile.size)}
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className="w-full rounded-xl border border-dashed border-[#2b1f3f] bg-[#0f0a18] hover:bg-[#130d21] transition-colors p-6 flex flex-col items-center justify-center gap-2 text-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {/* Ícone Cloud Upload (SVG inline para evitar dependências) */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/80"
          >
            <path
              d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12v8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m8 16 4-4 4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-white font-medium">{title}</span>
          <span className="text-xs text-white/60">{subtitle}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        disabled={disabled}
        onChange={handleFileChange}
      />
    </div>
  );
}
