import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@checkout-layout/ui/input";
import { Label } from "@checkout-layout/ui/label";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { InputMask } from "@checkout-layout/ui/input-mask";
import { Checkbox } from "@checkout-layout/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@checkout-layout/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { estadosBrasil } from "../../FormThreeSteps/constants";
import { validateCEP } from "../../FormThreeSteps/validator";
import { formatCEP, formatPrice } from "../../FormThreeSteps/mask";
import { type AddressData } from "../../FormThreeSteps/schemas";
import { ProductType } from "@/types/product";
import { useCheckout } from "@checkout/hooks/useCheckout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchCEP } from "@/checkout/layout/themes/simples/components/FormThreeSteps/functions";

const addressSchema = z.object({
  cep: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  number: z.string().optional(),
  complement: z.string().optional(),
  state: z.string().min(1),
  neighborhood: z.string().min(1),
});

interface Estado {
  value: string;
  label: string;
}

const AddressStep: React.FC = () => {
  const {
    data,
    theme,
    productOrder,
    setAddressData,
    nextStep,
    setShippingOptionData,
  } = useCheckout();
  const { address, cart, step } = productOrder;

  const [loadingCEP, setLoadingCEP] = useState(false);
  const [isNotNumber, setIsNotNumber] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
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

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (
      isValid &&
      step === 2 &&
      cart.type === ProductType.PHYSICAL &&
      !cart.shippingOption.id
    ) {
      setAddressData({
        cep: address.cep,
        city: address.city,
        address: address.address,
        number: address.number,
        neighborhood: address.neighborhood,
        state: address.state,
        complement: address.complement,
      });
      nextStep();

      timer = setTimeout(() => {
        document
          .getElementById("payment-step")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }

    return () => clearTimeout(timer);
  }, [
    isValid,
    address,
    setAddressData,
    nextStep,
    cart.shippingOption.id,
    step,
    cart.type,
  ]);

  if (cart.type !== ProductType.PHYSICAL) return null;
  const isCepValid = watch("cep")?.length === 9;

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
    const selectedShipping = data.shippingOptions.find(
      (shipping) => shipping.id === value
    );
    if (selectedShipping) {
      setShippingOptionData(selectedShipping);
    }
  };

  return (
    <div
      className={`rounded-lg p-6 ${
        theme.defaultSnippets.isCardShadow
          ? "shadow-lg"
          : "border border-gray-200/60"
      }`}
      style={{
        backgroundColor: theme.defaultColors.cardBackground,
      }}
    >
      <div className="space-y-4">
        <h3
          className="text-base font-semibold"
          style={{ color: theme.defaultColors.cardText }}
        >
          Entrega
        </h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="cep">CEP</Label>
            <InputMask
              id="cep"
              {...register("cep")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCEPChange(e.currentTarget.value)
              }
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

          {/* Outros campos só aparecem após CEP válido */}
          <AnimatePresence>
            {isCepValid && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                  opacity: { duration: 0.3 },
                  height: { duration: 0.4 },
                }}
                id="address-step"
                className="space-y-4 overflow-hidden"
              >
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        setIsNotNumber(
                          checked === "indeterminate" ? false : checked
                        )
                      }
                    />
                    <Label htmlFor="not-number">S/N</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    {...register("complement")}
                    placeholder="Apartamento, unidade, prédio, andar, etc."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Select
                      value={watch("state")}
                      onValueChange={(value) => setValue("state", value)}
                    >
                      <SelectTrigger
                        className={errors.state ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {estadosBrasil.map((estado: Estado) => (
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
                      <SelectTrigger
                        className={errors.country ? "border-red-500" : ""}
                      >
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

                {/* Opções de Frete */}
                <AnimatePresence>
                  {data.shippingOptions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: 0.1,
                      }}
                      className="space-y-2 overflow-hidden"
                    >
                      <p
                        className="text-sm"
                        style={{ color: theme.defaultColors.cardText }}
                      >
                        Escolha o melhor frete para você
                      </p>

                      <RadioGroup
                        value={cart.shippingOption.id}
                        onValueChange={(value) =>
                          handleShippingOptionChange(value)
                        }
                      >
                        {data.shippingOptions.map((shippingOption) => {
                          const isSelected =
                            cart.shippingOption.id === shippingOption.id;
                          return (
                            <Label
                              key={shippingOption.id}
                              htmlFor={shippingOption.id}
                              className={`flex items-center space-x-3 px-4 py-5 border rounded-lg cursor-pointer transition-all duration-300 ${
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
                                    className="font-medium"
                                    style={{
                                      color: theme.defaultColors.cardText,
                                    }}
                                  >
                                    {shippingOption.name}
                                  </span>
                                  <span
                                    className="font-medium text-xs"
                                    style={{
                                      color: theme.defaultColors.cardText,
                                    }}
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

                      <p className="text-xs text-gray-500">
                        A previsão de entrega pode variar de acordo com a região
                        e facilidade de acesso ao seu endereço
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isCepValid && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                  opacity: { duration: 0.3 },
                  height: { duration: 0.4 },
                }}
                className="space-y-4 overflow-hidden"
              >
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-md p-4">
                  <p
                    className="text-sm font-semibold mb-2"
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
                <p className="text-xs text-gray-500">
                  A previsão de entrega pode variar de acordo com a região e
                  facilidade de acesso ao seu endereço
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export { AddressStep };
