// src/components/form-management/preferences-form.tsx
"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { preferencesSchema } from "~/schemas/form-schema"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Checkbox } from "~/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

type PreferencesFormProps = {
  defaultValues: any
  onDataChange: (data: any) => void
  setIsValid: (isValid: boolean) => void
}

export function PreferencesForm({ defaultValues, onDataChange, setIsValid }: PreferencesFormProps) {
  const form = useForm({
    resolver: zodResolver(preferencesSchema),
    defaultValues,
    mode: "onChange",
  })

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onDataChange(value)
    })
    return () => subscription.unsubscribe()
  }, [form, onDataChange])

  React.useEffect(() => {
    setIsValid(form.formState.isValid)
  }, [form.formState.isValid, setIsValid])

  const notificationOptions = [
    { id: "email", label: "Email" },
    { id: "sms", label: "SMS" },
    { id: "push", label: "Push Notifications" },
  ]

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="receiveUpdates"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Receive Updates</FormLabel>
                <FormDescription>
                  Receive emails about product updates and new features.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Theme Preference</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="light" />
                    </FormControl>
                    <FormLabel className="font-normal">Light</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dark" />
                    </FormControl>
                    <FormLabel className="font-normal">Dark</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="system" />
                    </FormControl>
                    <FormLabel className="font-normal">System</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notifications"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Notification Methods</FormLabel>
                <FormDescription>
                  Select how you'd like to receive notifications.
                </FormDescription>
              </div>
              {notificationOptions.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="notifications"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id as any)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}