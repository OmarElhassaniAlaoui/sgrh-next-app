"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLeaveStore } from "@/stores";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required." }),
  lastName: z.string().min(1, { message: "Last Name is required." }),
  cin: z.string().min(1, { message: "CIN is required." }),
  ppr: z.string().min(1, { message: "PPR is required." }),
  grade: z.string().min(1, { message: "Grade is required." }),
  division: z.string().min(1, { message: "Division is required." }),
  service: z.string().min(1, { message: "Service is required." }),
});

type EmployeeForm = z.infer<typeof formSchema>;

export default function AddEmployeePage() {
  //   const { fetchEmployees } = useLeaveStore();
  const router = useRouter();

  const form = useForm<EmployeeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cin: "",
      ppr: "",
      grade: "",
      division: "",
      service: "",
    },
  });

  const onSubmit = async (values: EmployeeForm) => {
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to add employee");

      toast.success("Employee added successfully");
      //   await fetchEmployees();
      router.push("/employees");
    } catch (error) {
      toast.error("Failed to add employee");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Add New Employee</h2>
        <p className="text-muted-foreground">
          Fill in the details to add a new employee.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <FormLabel className="col-span-2 text-right">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <FormLabel className="col-span-2 text-right">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cin"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <FormLabel className="col-span-2 text-right">CIN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ppr"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <FormLabel className="col-span-2 text-right">PPR</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="PPR123"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <FormLabel className="col-span-2 text-right">Grade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Senior"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <FormLabel className="col-span-2 text-right">
                    Division
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="HR" className="col-span-4" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <FormLabel className="col-span-2 text-right">
                    Service
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Recruitment"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => router.push("/employees")}
              >
                Cancel
              </Button>
              <Button type="submit">Add Employee</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
