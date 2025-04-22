import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FormLeaveType } from "@/utils/leave-form-utils";
import {
  calculateBusinessDays,
  calculateReturnDate,
  toISODateString,
} from "@/utils/date-utils";
import { getLeaveTypeOptions } from "@/utils/leave-form-utils";

// Interface for Employee data
interface Employee {
  id: string;
  name: string;
  surname: string;
  cin: string;
}

export const formSchema = z
  .object({
    employeeId: z.string({
      required_error: "Veuillez sélectionner un employé",
    }),
    type: z.enum(
      [
        "annual",
        "special",
        "sick",
        "maternity",
        "hajj",
        "marriage",
        "bereavement",
      ] as const,
      {
        required_error: "Veuillez sélectionner un type de congé",
      }
    ),
    startDate: z.date({
      required_error: "Veuillez sélectionner une date de début",
    }),
    endDate: z.date({
      required_error: "Veuillez sélectionner une date de fin",
    }),
    returnDate: z.date().optional(),
    replacementColleagueId: z.string().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "La date de fin doit être postérieure à la date de début",
    path: ["endDate"],
  });

interface LeaveFormProps {
  employees: Employee[];
  preselectedEmployeeId?: string;
  onSubmit: (values: z.infer<typeof formSchema> & { duration: number }) => void;
}

export function LeaveForm({
  employees,
  preselectedEmployeeId,
  onSubmit,
}: LeaveFormProps) {
  const router = useRouter();
  const [duration, setDuration] = useState(0);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [openEmployeeCombobox, setOpenEmployeeCombobox] = useState(false); // State for Employee Combobox
  const [openReplacementCombobox, setOpenReplacementCombobox] = useState(false); // State for Replacement Combobox

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: preselectedEmployeeId || "",
      type: "annual" as FormLeaveType,
      startDate: new Date(),
      endDate: new Date(),
      replacementColleagueId: "",
    },
  });

  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  // Recalculate duration and return date when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const calculatedDuration = calculateBusinessDays(startDate, endDate);
      const calculatedReturnDate = calculateReturnDate(endDate);

      setDuration(calculatedDuration);
      setReturnDate(calculatedReturnDate);

      form.setValue("returnDate", calculatedReturnDate);
    }
  }, [startDate, endDate, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...values,
      duration,
      returnDate: values.returnDate || (returnDate as Date),
    });

    toast.success("Demande de congé créée avec succès");
    router.push("/leaves");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Employé</FormLabel>
                <Popover
                  open={openEmployeeCombobox}
                  onOpenChange={setOpenEmployeeCombobox}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openEmployeeCombobox}
                        disabled={!!preselectedEmployeeId}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? employees.find(
                              (employee) => employee.id === field.value
                            )?.name +
                            " " +
                            employees.find(
                              (employee) => employee.id === field.value
                            )?.surname
                          : "Sélectionner un employé"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                    <Command>
                      <CommandInput placeholder="Rechercher un employé..." />
                      <CommandList>
                        <CommandEmpty>Aucun employé trouvé.</CommandEmpty>
                        <CommandGroup>
                          {employees.map((employee) => (
                            <CommandItem
                              value={`${employee.name} ${employee.surname} ${employee.cin} ${employee.id}`} // Searchable value
                              key={employee.id}
                              onSelect={() => {
                                form.setValue("employeeId", employee.id);
                                setOpenEmployeeCombobox(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  employee.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {employee.name} {employee.surname} ({employee.cin}
                              )
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de congé</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type de congé" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getLeaveTypeOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de début</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < startDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Durée: <strong>{duration} jours</strong> (hors week-ends)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="replacementColleagueId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Remplaçant (optionnel)</FormLabel>
                <Popover
                  open={openReplacementCombobox}
                  onOpenChange={setOpenReplacementCombobox}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openReplacementCombobox}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && field.value !== "_none"
                          ? employees.find(
                              (employee) => employee.id === field.value
                            )?.name +
                            " " +
                            employees.find(
                              (employee) => employee.id === field.value
                            )?.surname
                          : "Sélectionner un remplaçant"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                    <Command>
                      <CommandInput placeholder="Rechercher un remplaçant..." />
                      <CommandList>
                        <CommandEmpty>Aucun employé trouvé.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="_none"
                            onSelect={() => {
                              form.setValue("replacementColleagueId", "_none"); // Use a special value or empty string
                              setOpenReplacementCombobox(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === "_none"
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            Aucun remplaçant
                          </CommandItem>
                          {employees
                            .filter(
                              (emp) => emp.id !== form.getValues("employeeId")
                            ) // Exclude the employee taking leave
                            .map((employee) => (
                              <CommandItem
                                value={`${employee.name} ${employee.surname} ${employee.cin} ${employee.id}`} // Searchable value
                                key={employee.id}
                                onSelect={() => {
                                  form.setValue(
                                    "replacementColleagueId",
                                    employee.id
                                  );
                                  setOpenReplacementCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    employee.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {employee.name} {employee.surname}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex flex-col">
            <FormLabel>Date de retour</FormLabel>
            <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
              {returnDate
                ? format(returnDate, "dd/MM/yyyy")
                : "Calculé automatiquement"}
            </div>
            <FormDescription>
              Calculée automatiquement (jour ouvrable suivant la date de fin)
            </FormDescription>
          </FormItem>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/leaves")}
          >
            Annuler
          </Button>
          <Button type="submit">Créer</Button>
        </div>
      </form>
    </Form>
  );
} 