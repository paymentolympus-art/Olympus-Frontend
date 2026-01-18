export interface AssetValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface AssetSpecs {
  maxWidth: number;
  maxHeight: number;
  maxSizeBytes: number;
  allowedFormats: string[];
  aspectRatio?: number;
}

export const ASSET_SPECS: Record<string, AssetSpecs> = {
  logo: {
    maxWidth: 215,
    maxHeight: 215,
    maxSizeBytes: 1 * 1024 * 1024, // 1MB
    allowedFormats: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
    aspectRatio: 1,
  },
  favicon: {
    maxWidth: 32,
    maxHeight: 32,
    maxSizeBytes: 100 * 1024, // 100KB
    allowedFormats: ["image/png", "image/x-icon"],
    aspectRatio: 1,
  },
  bannerMobile: {
    maxWidth: 375,
    maxHeight: 200,
    maxSizeBytes: 2 * 1024 * 1024, // 2MB
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    aspectRatio: 1.875,
  },
  bannerDesktop: {
    maxWidth: 1200,
    maxHeight: 400,
    maxSizeBytes: 3 * 1024 * 1024, // 3MB
    allowedFormats: ["image/jpeg", "image/png", "image/webp"],
    aspectRatio: 3,
  },
};

export const validateAsset = async (
  file: File,
  assetType: keyof typeof ASSET_SPECS
): Promise<AssetValidationResult> => {
  const errors: string[] = [];
  const specs = ASSET_SPECS[assetType];

  // Validar formato
  if (!specs.allowedFormats.includes(file.type)) {
    const formats = specs.allowedFormats
      .map((format) => format.split("/")[1].toUpperCase())
      .join(", ");
    errors.push(`Formato não permitido. Use: ${formats}`);
  }

  // Validar tamanho do arquivo
  if (file.size > specs.maxSizeBytes) {
    const maxSizeMB = specs.maxSizeBytes / (1024 * 1024);
    errors.push(`Arquivo muito grande. Máximo: ${maxSizeMB}MB`);
  }

  // Validar dimensões da imagem
  try {
    const dimensions = await getImageDimensions(file);

    if (
      dimensions.width > specs.maxWidth ||
      dimensions.height > specs.maxHeight
    ) {
      errors.push(
        `Dimensões muito grandes. Máximo: ${specs.maxWidth}x${specs.maxHeight}px`
      );
    }

    // Validar proporção (com tolerância de 0.1)
    if (specs.aspectRatio) {
      const actualRatio = dimensions.width / dimensions.height;
      const tolerance = 0.3;

      if (Math.abs(actualRatio - specs.aspectRatio) > tolerance) {
        errors.push(
          `Proporção incorreta. Esperado: ${specs.aspectRatio}:1, atual: ${actualRatio.toFixed(2)}:1`
        );
      }
    }
  } catch (error) {
    errors.push("Erro ao processar imagem. Verifique se o arquivo é válido.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Erro ao carregar imagem"));
    };

    img.src = url;
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getAssetDisplayName = (
  assetType: keyof typeof ASSET_SPECS
): string => {
  const names: Record<keyof typeof ASSET_SPECS, string> = {
    logo: "Logo",
    favicon: "Favicon",
    bannerMobile: "Banner Mobile",
    bannerDesktop: "Banner Desktop",
  };

  return names[assetType];
};
