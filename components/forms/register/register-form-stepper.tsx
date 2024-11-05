"use client";

import * as React from "react";

import { useRegisterStore } from "@/lib/register-store";
import { cn } from "@/lib/utils";
import { RegisterDetailsOtpVerify } from "./forms/otp";
import { UserRegisterDetails } from "./forms/user-details";

export function RegisterDetailsFormStepper({
  className,
  ...props
}: {
  className?: string;
}) {
  const { currentStep } = useRegisterStore();

  return (
    <div className={cn("grid gap-6 p-2", className)} {...props}>
      {currentStep === 0 && <UserRegisterDetails />}
      {currentStep === 1 && <RegisterDetailsOtpVerify />}
    </div>
  );
}
