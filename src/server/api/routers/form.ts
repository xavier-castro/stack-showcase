// src/server/api/routers/form.ts
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { formSchema, simpleFormSchema } from "~/schemas/form-schema";

export const formRouter = createTRPCRouter({
  submit: publicProcedure
    .input(formSchema)
    .mutation(async ({ input }) => {
      // Here, you would typically save the form data to a database
      console.log("Form submitted:", input);
      
      // Simulate a delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: "Form submitted successfully",
      };
    }),
    
  submitSimple: publicProcedure
    .input(simpleFormSchema)
    .mutation(async ({ input }) => {
      // Process simple form data
      console.log("Simple form submitted:", input);
      
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: "Form submitted successfully",
      };
    }),
});