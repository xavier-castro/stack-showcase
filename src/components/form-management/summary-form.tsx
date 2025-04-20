// src/components/form-management/summary-form.tsx
"use client"

import * as React from "react"
import { format } from "date-fns"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Badge } from "~/components/ui/badge"

type SummaryFormProps = {
  formData: any
  setIsValid: (isValid: boolean) => void
}

export function SummaryForm({ formData, setIsValid }: SummaryFormProps) {
  React.useEffect(() => {
    // The summary is always valid
    setIsValid(true)
  }, [setIsValid])

  return (
    <div className="space-y-6">
      <div className="text-muted-foreground pb-2 text-sm">
        Please review your information before submitting.
      </div>
      
      <Accordion type="single" collapsible className="w-full" defaultValue="personal">
        <AccordionItem value="personal">
          <AccordionTrigger className="text-base font-medium">
            Personal Information
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="text-muted-foreground text-sm">First Name</div>
                <div>{formData.personalInfo.firstName}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Last Name</div>
                <div>{formData.personalInfo.lastName}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Email</div>
                <div>{formData.personalInfo.email}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Phone Number</div>
                <div>{formData.personalInfo.phoneNumber || "Not provided"}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Date of Birth</div>
                <div>
                  {formData.personalInfo.dateOfBirth
                    ? format(new Date(formData.personalInfo.dateOfBirth), "PP")
                    : "Not provided"}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="address">
          <AccordionTrigger className="text-base font-medium">
            Address
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <div className="text-muted-foreground text-sm">Street</div>
                <div>{formData.address.street}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">City</div>
                <div>{formData.address.city}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">State/Province</div>
                <div>{formData.address.state}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Zip/Postal Code</div>
                <div>{formData.address.zipCode}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Country</div>
                <div>{formData.address.country}</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="preferences">
          <AccordionTrigger className="text-base font-medium">
            Preferences
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-muted-foreground text-sm">Receive Updates</div>
                <div>{formData.preferences.receiveUpdates ? "Yes" : "No"}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Theme</div>
                <div className="capitalize">{formData.preferences.theme}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Notification Methods</div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {formData.preferences.notifications && formData.preferences.notifications.length > 0 ? (
                    formData.preferences.notifications.map((method: string) => (
                      <Badge key={method} variant="outline">
                        {method}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No notification methods selected</span>
                  )}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}