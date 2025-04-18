import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField"; // Corrected import path
import { addEmployeeValidationSchema } from "@/lib/validation";
// Assuming you have an action to add the employee
// import { createEmployee } from "@/actions/employee.action.ts"; // Corrected potential action import path
import { useRouter } from "next/navigation"; // Or 'next/router' depending on your Next.js version
import { SelectItem } from "../ui/select"; // Import SelectItem for the Gender dropdown
import { toast } from "sonner"; // Import toast for notifications

const AddEmployeeForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof addEmployeeValidationSchema>>({
    resolver: zodResolver(addEmployeeValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cin: "",
      ppr: "",
      grade: "",
      ladder: "",
      service: "",
      division: "",
      address: "",
      email: "",
      phone: "",
      dateOfBirth: undefined, // Use undefined for optional date string
      gender: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addEmployeeValidationSchema>) {
    setIsLoading(true);
    console.log("Submitting form with values:", values);
    // Note: The backend API at /api/employees needs to handle these values.
    // There might be discrepancies between form fields (e.g., email, phone, dateOfBirth)
    // and the expected fields in the backend (e.g., decisionNumber, decisionDate).
    // The API route should be adjusted accordingly.
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add employee");
      }

      const newEmployee = await response.json();
      toast.success("Employee added successfully");
      router.push("/employees"); // Redirect after successful submission
    } catch (error: any) {
      console.error("Error submitting employee form:", error.message); // Keep console log for debugging
      toast.error(`Failed to add employee: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="Enter first name"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Enter last name"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="cin"
            label="CIN"
            placeholder="Enter CIN"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="ppr"
            label="PPR"
            placeholder="Enter PPR"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="grade"
            label="Grade (Optional)"
            placeholder="Enter grade"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="ladder"
            label="Ladder (Optional)"
            placeholder="Enter ladder"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="service"
            label="Service (Optional)"
            placeholder="Enter service"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="division"
            label="Division (Optional)"
            placeholder="Enter division"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email (Optional)"
            placeholder="Enter email address"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="phone"
            label="Phone (Optional)"
            placeholder="Enter phone number"
          />
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="dateOfBirth"
            label="Date of Birth (Optional)"
            placeholder="Select date of birth"
            dateFormat="yyyy-MM-dd" // Adjust format as needed
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="gender"
            label="Gender (Optional)"
            placeholder="Select gender"
          >
            {/* Add SelectItem components here using shadcn/ui */}
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </CustomFormField>
        </div>
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="address"
          label="Address (Optional)"
          placeholder="Enter full address"
        />

        <Button
          type="submit"
          className="shad-primary-btn w-full"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Employee"}
        </Button>
      </form>
    </Form>
  );
};

export default AddEmployeeForm;
