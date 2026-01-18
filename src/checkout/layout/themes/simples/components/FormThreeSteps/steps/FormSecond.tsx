import { useCheckout } from "@checkout/hooks/useCheckout";
import { Input } from "@checkout-layout/ui/input";
import { Button } from "@checkout-layout/ui/button";
import { Label } from "@checkout-layout/ui/label";
import { useForm } from "react-hook-form";
import { addressSchema, type AddressData } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@checkout-layout/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@checkout-layout/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { estadosBrasil } from "../constants";
import { useState } from "react";
import { searchCEP } from "../functions";
import { validateCEP } from "../validator";
import { formatCEP, formatPrice } from "../mask";
import { ArrowLeft, CircleAlert } from "lucide-react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { InputMask } from "@checkout-layout/ui/input-mask";

const FormSecond: React.FC = () => {
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [isNotNumber, setIsNotNumber] = useState(false);
  const {
    data,
    theme,
    productOrder,
    setAddressData,
    prevStep,
    nextStep,
    setShippingOptionData,
  } = useCheckout();
  const { address, cart } = productOrder;
  const { shippingOptions } = data;

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      cep: address.cep,
      city: address.city,
      address: address.address,
      number: address.number,
      complement: address.complement,
      neighborhood: address.neighborhood,
      state: address.state,
      country: "brasil",
    },
  });

  const handleCEPChange = async (value: string) => {
    const formattedCEP = formatCEP(value);
    setValue("cep", value);

    if (validateCEP(formattedCEP)) {
      setLoadingCEP(true);
      try {
        const data = await searchCEP(formattedCEP);
        if (data) {
          setValue("address", data.logradouro);
          setValue("neighborhood", data.bairro);
          setValue("city", data.localidade);
          setValue("state", data.uf);
          trigger();
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setLoadingCEP(false);
      }
    }
  };

  const handleShippingOptionChange = (value: string) => {
    const selectedShipping = shippingOptions.find(
      (shipping) => shipping.id === value
    );
    if (selectedShipping) {
      setShippingOptionData(selectedShipping);
    }
  };

  // Função de navegação sem validação para permitir fluxo livre
  const handleNextStep = () => {
    // Coleta dados atuais do form (mesmo sem validação completa)
    const formData = {
      cep: watch("cep") || "",
      city: watch("city") || "",
      address: watch("address") || "",
      number: isNotNumber ? "S/N" : (watch("number") ?? ""),
      complement: watch("complement") || "",
      neighborhood: watch("neighborhood") || "",
      state: watch("state") || "",
      country: watch("country") || "brasil",
    };
    setAddressData({ ...address, ...formData });
    nextStep();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-3">
        <p
          className="text-sm font-semibold"
          style={{ color: theme.defaultColors.cardText }}
        >
          Entrega
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cep">CEP</Label>
            <InputMask
              id="cep"
              value={watch("cep")}
              onChange={(value) => handleCEPChange(value.currentTarget.value)}
              className={errors.cep ? "border-red-500" : ""}
              placeholder="12345-000"
              mask="00000-000"
            />
            {errors.cep && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.cep.message}
              </p>
            )}
            {loadingCEP && (
              <p className="text-blue-500 text-sm mt-1">Buscando CEP...</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              {...register("address")}
              className={errors.address ? "border-red-500" : ""}
              placeholder="Rua, Avenida, Alameda"
            />
            {errors.address && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="number">Número</Label>
            <Input
              id="number"
              {...register("number")}
              disabled={isNotNumber}
              value={isNotNumber ? "Sem número" : watch("number")}
              className={errors.number ? "border-red-500" : ""}
              placeholder="3213"
            />
            {errors.number && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.number.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="not-number"
              checked={isNotNumber}
              onCheckedChange={(checked) =>
                setIsNotNumber(checked === "indeterminate" ? false : checked)
              }
            />
            <Label htmlFor="not-number">S/N</Label>
          </div>

          <div>
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              {...register("complement")}
              placeholder="Apartamento, unidade, prédio, andar, etc."
            />
          </div>

          <div>
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              id="neighborhood"
              {...register("neighborhood")}
              className={errors.neighborhood ? "border-red-500" : ""}
              placeholder="Centro"
            />
            {errors.neighborhood && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.neighborhood.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              {...register("city")}
              className={errors.city ? "border-red-500" : ""}
              placeholder="Cidade"
            />
            {errors.city && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="state">Estado</Label>
            <Select
              value={watch("state")}
              onValueChange={(value) => setValue("state", value)}
            >
              <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {estadosBrasil.map((estado) => (
                  <SelectItem key={estado.value} value={estado.value}>
                    {estado.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="country">País</Label>
            <Select
              value={watch("country")}
              onValueChange={(value) => setValue("country", value)}
              defaultValue="brasil"
            >
              <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brasil">Brasil</SelectItem>
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                <IoIosInformationCircleOutline className="w-4 h-4" />
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p
            className="text-sm"
            style={{ color: theme.defaultColors.cardText }}
          >
            Escolha o melhor frete para você
          </p>

          {/* Opções de Frete */}
          {watch("cep") &&
            validateCEP(watch("cep")) &&
            shippingOptions.length > 0 && (
              <div className="">
                <RadioGroup
                  value={cart.shippingOption.id}
                  onValueChange={(value) => handleShippingOptionChange(value)}
                >
                  {shippingOptions.map((shippingOption) => {
                    const isSelected =
                      cart.shippingOption.id === shippingOption.id;
                    return (
                      <Label
                        key={shippingOption.id}
                        htmlFor={shippingOption.id}
                        className={`flex items-center space-x-3 px-4 py-5 border-1 rounded-lg cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        style={{
                          backgroundColor: isSelected
                            ? "rgba(43, 127, 255, 0.05)"
                            : "transparent",
                        }}
                      >
                        <RadioGroupItem
                          value={shippingOption.id}
                          id={shippingOption.id}
                        />
                        {shippingOption.image && (
                          <img
                            src={shippingOption.image}
                            alt={shippingOption.name}
                            className="w-10 h-10"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className="font-medium cursor-pointer"
                              style={{ color: theme.defaultColors.cardText }}
                            >
                              {shippingOption.name}
                            </span>
                            <span
                              className="font-medium text-xs"
                              style={{ color: theme.defaultColors.cardText }}
                            >
                              {shippingOption.price > 0
                                ? formatPrice(shippingOption.price)
                                : "Grátis"}
                            </span>
                          </div>
                          <p
                            className="text-xs font-normal"
                            style={{
                              color: theme.defaultColors.cardDescription,
                            }}
                          >
                            {shippingOption.description}
                          </p>
                        </div>
                      </Label>
                    );
                  })}
                </RadioGroup>
                {shippingOptions.length === 0 && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <CircleAlert className="w-3 h-3" /> Nenhuma opção de frete
                    encontrada
                  </p>
                )}
              </div>
            )}
          {!watch("cep") && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-md p-4">
              <p
                className="text-sm font-medium"
                style={{ color: theme.defaultColors.cardText }}
              >
                Preencha seu CEP para encontrar o melhor frete
              </p>
              <p
                className="text-xs"
                style={{ color: theme.defaultColors.cardDescription }}
              >
                Após preenchido, encontraremos as melhores opções pra você
              </p>
            </div>
          )}
          <p
            className="text-xs"
            style={{
              color: theme.defaultColors.cardDescription,
              fontSize: "10px",
            }}
          >
            A previsão de entrega pode variar de acordo com a região e
            facilidade de acesso ao seu endereço
          </p>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-1 md:justify-between">
          <Button
            type="button"
            onClick={handleNextStep}
            className="font-bold w-full sm:w-auto text-white py-5 hover:opacity-90"
            style={{
              backgroundColor: theme.defaultColors.buttonColor,
              color: theme.defaultColors.buttonTextColor,
            }}
          >
            IR PARA O PAGAMENTO
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="font-bold w-full sm:w-auto sm:shadow-none border-none text-white py-5 hover:opacity-90"
            style={{
              backgroundColor: "transparent",
              color: theme.defaultColors.cardDescription,
            }}
          >
            <ArrowLeft className="w-4 h-4 hidden sm:block" />
            Voltar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormSecond;
