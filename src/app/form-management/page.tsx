// src/app/form-management/page.tsx
"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormWizard } from "~/components/form-management/form-wizard";
import { UserForm } from "~/components/form-management/user-form";
import { AddressForm } from "~/components/form-management/address-form";
import { PreferencesForm } from "~/components/form-management/preferences-form";
import { SummaryForm } from "~/components/form-management/summary-form";
import { formSchema } from "~/schemas/form-schema";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { SimpleForm } from "~/components/form-management/simple-form";
import { FormSkeleton } from "~/components/form-management/form-skeleton";

export default function FormManagementPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isStepValid, setIsStepValid] = React.useState(true);
  const [formData, setFormData] = React.useState<z.infer<typeof formSchema>>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: undefined,
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    preferences: {
      receiveUpdates: false,
      theme: "system",
      notifications: [],
    },
  });

  const submitForm = api.form.submit.useMutation({
    onSuccess: () => {
      toast.success("Form submitted successfully!");
      // Reset form data or redirect
    },
    onError: (error) => {
      toast.error(`Error submitting form: ${error.message}`);
    },
  });

  const steps = [
    {
      id: "personal",
      title: "Personal Information",
      description: "Enter your basic personal information",
      isOptional: false,
    },
    {
      id: "address",
      title: "Address",
      description: "Enter your address details",
      isOptional: false,
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Set your account preferences",
      isOptional: true,
    },
    {
      id: "summary",
      title: "Summary",
      description: "Review your information",
      isOptional: false,
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const handleComplete = async () => {
    submitForm.mutate(formData);
  };

  const updateFormData = (stepId: string, data: z.infer<typeof formSchema>) => {
    setFormData((prev) => ({
      ...prev,
      [stepId === "personal" ? "personalInfo" : stepId]: data,
    }));
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-8 text-3xl font-bold">Form Management</h1>

      <Tabs defaultValue="multi-step" className="mb-10">
        <TabsList className="mb-4">
          <TabsTrigger value="multi-step">Multi-Step Form</TabsTrigger>
          <TabsTrigger value="simple">Simple Form</TabsTrigger>
          <TabsTrigger value="form-components">Form Components</TabsTrigger>
        </TabsList>

        <TabsContent value="multi-step">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Multi-Step Form Example</CardTitle>
              <CardDescription>
                A wizard-style form with validation between steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormWizard
                steps={steps}
                activeStep={activeStep}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onComplete={handleComplete}
                
                isStepValid={isStepValid}
                setIsStepValid={setIsStepValid}
              >
                {activeStep === 0 && (
                  <UserForm
                    defaultValues={formData.personalInfo}
                    onDataChange={(data) => updateFormData("personal", data)}
                    setIsValid={setIsStepValid}
                  />
                )}

                {activeStep === 1 && (
                  <AddressForm
                    defaultValues={formData.address}
                    onDataChange={(data) => updateFormData("address", data)}
                    setIsValid={setIsStepValid}
                  />
                )}

                {activeStep === 2 && (
                  <PreferencesForm
                    defaultValues={formData.preferences}
                    onDataChange={(data) => updateFormData("preferences", data)}
                    setIsValid={setIsStepValid}
                  />
                )}

                {activeStep === 3 && (
                  <SummaryForm
                    formData={formData}
                    setIsValid={setIsStepValid}
                  />
                )}
              </FormWizard>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simple">
          <SimpleForm />
        </TabsContent>

        <TabsContent value="form-components">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormSkeleton title="Input Fields" />
            <FormSkeleton title="Select & Radio Fields" />
            <FormSkeleton title="Checkbox Fields" />
            <FormSkeleton title="Date & Time Fields" />
            <FormSkeleton title="File Upload" />
            <FormSkeleton title="Rich Text Editor" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
