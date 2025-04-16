import { Control } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the schema shape within the component or import it
// If importing, ensure the path is correct and the type is exported from the source file
const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  cin: z.string().min(1, "CIN is required"),
  ppr: z.string().min(1, "PPR is required"),
  grade: z.string().optional(),
  ladder: z.string().optional(),
  service: z.string().optional(),
  division: z.string().optional(),
  address: z.string().optional(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormFieldsProps {
  control: Control<EmployeeFormData>;
}

export function EmployeeFormFields({ control }: EmployeeFormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="cin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CIN</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="ppr"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PPR</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="grade"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grade (Optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Add other optional fields if they should be part of the reusable component */}
      {/* Example:
       <FormField
        control={control}
        name="ladder"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ladder (Optional)</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </>
  );
}
