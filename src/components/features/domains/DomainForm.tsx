import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createDomainSchema } from "@/validators/domain";
import type { CreateDomainInput, UpdateDomainInput } from "@/validators/domain";
import { useState } from "react";

interface DomainFormProps {
  initialData?: Partial<UpdateDomainInput>;
  onSubmit: (data: CreateDomainInput | UpdateDomainInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DomainForm({
  initialData,
  onSubmit,
  onCancel,
}: DomainFormProps) {
  const schema = createDomainSchema;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDomainInput | UpdateDomainInput>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const handleFormSubmit = async (
    data: CreateDomainInput | UpdateDomainInput
  ) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome do Domínio *
        </label>
        <Input
          id="name"
          {...register("name")}
          placeholder="exemplo.com"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="cnameType" className="text-sm font-medium">
            Tipo CNAME
          </label>
          <Input
            id="cnameType"
            value="CNAME"
            placeholder="CNAME"
            disabled={true}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="cnameName" className="text-sm font-medium">
            Nome CNAME
          </label>
          <Input id="cnameName" value="pay" placeholder="pay" disabled={true} />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Criar"}
        </Button>
      </div>
    </form>
  );
}
