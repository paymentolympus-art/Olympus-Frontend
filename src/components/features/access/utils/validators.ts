import type { RegisterFormData } from "@/validators/register";
import type { UseFormReturn } from "react-hook-form";

export const validateStep1 = async (
  form: UseFormReturn<RegisterFormData>
): Promise<boolean> => {
  const fieldsToValidate: (keyof RegisterFormData)[] = [
    "name",
    "email",
    "accountType",
    "password",
    "confirmPassword",
  ];

  const results = await Promise.all(
    fieldsToValidate.map((field) => form.trigger(field))
  );

  return results.every((result) => result);
};

export const validateStep2 = async (
  form: UseFormReturn<RegisterFormData>,
  accountType: "PERSON" | "COMPANY" | undefined
): Promise<boolean> => {
  if (accountType === "PERSON") {
    const fieldsToValidate: (keyof RegisterFormData)[] = [
      "cpf",
      "phone",
      "birthDate",
      "acceptTerms",
    ];
    const results = await Promise.all(
      fieldsToValidate.map((field) => form.trigger(field))
    );
    return results.every((result) => result);
  }

  if (accountType === "COMPANY") {
    const fieldsToValidate: (keyof RegisterFormData)[] = [
      "companyCnpj",
      "companyName",
      "tradeName",
      "phone",
      "acceptTerms",
    ];
    const results = await Promise.all(
      fieldsToValidate.map((field) => form.trigger(field))
    );
    return results.every((result) => result);
  }

  return false;
};

export const getFirstError = (
  form: UseFormReturn<RegisterFormData>
): { field: keyof RegisterFormData; message: string } | null => {
  const errors = form.formState.errors;
  const errorFields = Object.keys(errors) as (keyof RegisterFormData)[];

  for (const field of errorFields) {
    const error = errors[field];
    if (error?.message) {
      return {
        field,
        message: error.message,
      };
    }
  }
  return null;
};

export const focusFirstError = (
  form: UseFormReturn<RegisterFormData>
): void => {
  const error = getFirstError(form);
  if (error?.field) {
    const element = document.querySelector(
      `[name="${error.field}"]`
    ) as HTMLInputElement;
    if (element) {
      element.focus();
    }
  }
};
