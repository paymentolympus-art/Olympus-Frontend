import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { updateDomainSchema } from "@/validators/domain";
import type { CreateDomainInput, UpdateDomainInput } from "@/validators/domain";

interface EditDomainFormProps {
  initialData?: Partial<UpdateDomainInput>;
  onSubmit: (data: CreateDomainInput | UpdateDomainInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EditDomainForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: EditDomainFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDomainInput | UpdateDomainInput>({
    resolver: zodResolver(updateDomainSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: CreateDomainInput | UpdateDomainInput) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
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
                disabled
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="cnameName" className="text-sm font-medium">
                Nome CNAME
              </label>
              <Input id="cnameName" value="pay" placeholder="pay" disabled />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Atualizar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
