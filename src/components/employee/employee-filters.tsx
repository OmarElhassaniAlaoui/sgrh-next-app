"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import { Employee } from "@/types/employee-types"; // Assuming types are defined here
import { Card } from "../ui/card";

interface EmployeeFiltersProps {
  uniqueFilters: {
    divisions: string[];
    services: string[];
    grades: string[];
    ladders: string[];
  };
}

export function EmployeeFilters({ uniqueFilters }: EmployeeFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filter state from URL search params
  const [filters, setFilters] = useState({
    division: searchParams.get("division") || "",
    service: searchParams.get("service") || "",
    grade: searchParams.get("grade") || "",
    ladder: searchParams.get("ladder") || "",
  });

  // Update URL when filters change
  const updateUrlParams = useCallback(
    (newFilters: typeof filters) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      // Keep existing search query if present
      const currentSearch = searchParams.get("search");
      if (currentSearch) {
        params.set("search", currentSearch);
      } else {
        params.delete("search"); // Ensure search is removed if empty
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const filterValue = value === "_all" ? "" : value;
    const newFilters = { ...filters, [key]: filterValue };
    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const resetFilters = () => {
    const resetState = {
      division: "",
      service: "",
      grade: "",
      ladder: "",
    };
    setFilters(resetState);
    updateUrlParams(resetState);
  };

  // Sync state if URL changes externally (e.g., browser back/forward)
  useEffect(() => {
    setFilters({
      division: searchParams.get("division") || "",
      service: searchParams.get("service") || "",
      grade: searchParams.get("grade") || "",
      ladder: searchParams.get("ladder") || "",
    });
  }, [searchParams]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <Card className=" p-4 rounded-lg space-y-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Filtres</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
        >
          <FilterX className="mr-2 h-4 w-4" />
          Réinitialiser
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Division Filter */}
        <div className="space-y-2">
          <Label htmlFor="division">Division</Label>
          <Select
            value={filters.division || "_all"}
            onValueChange={(value) => handleFilterChange("division", value)}
          >
            <SelectTrigger id="division">
              <SelectValue placeholder="Toutes les divisions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Toutes les divisions</SelectItem>
              {uniqueFilters.divisions.sort().map((division) => (
                <SelectItem key={division} value={division}>
                  {division}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Service Filter */}
        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <Select
            value={filters.service || "_all"}
            onValueChange={(value) => handleFilterChange("service", value)}
          >
            <SelectTrigger id="service">
              <SelectValue placeholder="Tous les services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Tous les services</SelectItem>
              {uniqueFilters.services.sort().map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grade Filter */}
        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Select
            value={filters.grade || "_all"}
            onValueChange={(value) => handleFilterChange("grade", value)}
          >
            <SelectTrigger id="grade">
              <SelectValue placeholder="Tous les grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Tous les grades</SelectItem>
              {uniqueFilters.grades.sort().map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ladder Filter */}
        <div className="space-y-2">
          <Label htmlFor="ladder">Échelle</Label>
          <Select
            value={filters.ladder || "_all"}
            onValueChange={(value) => handleFilterChange("ladder", value)}
          >
            <SelectTrigger id="ladder">
              <SelectValue placeholder="Toutes les échelles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Toutes les échelles</SelectItem>
              {uniqueFilters.ladders.sort().map((ladder) => (
                <SelectItem key={ladder} value={ladder}>
                  {ladder}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
