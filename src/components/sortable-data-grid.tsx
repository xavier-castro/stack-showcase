"use client";

import * as React from "react";
import {
  IconChevronDown,
  IconFilter,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type FilterValue = {
  field: string;
  operator: string;
  value: string;
};

type FilterOption = {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "date";
  operators: string[];
  options?: { value: string; label: string }[];
};

type TableFilterProps = {
  filterOptions: FilterOption[];
  onFilterChange: (filters: FilterValue[]) => void;
  className?: string;
};

export function TableFilter({
  filterOptions,
  onFilterChange,
  className,
}: TableFilterProps) {
  const [filters, setFilters] = React.useState<FilterValue[]>([]);
  const [searchText, setSearchText] = React.useState("");

  const addFilter = (filter: FilterValue) => {
    setFilters((prev) => [...prev, filter]);
  };

  const removeFilter = (index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setFilters([]);
    setSearchText("");
    onFilterChange([]);
  };

  React.useEffect(() => {
    if (searchText) {
      setFilters((prev) => [
        ...prev.filter((f) => f.field !== "search"),
        { field: "search", operator: "contains", value: searchText },
      ]);
    } else {
      setFilters((prev) => prev.filter((f) => f.field !== "search"));
    }
  }, [searchText]);

  return (
    <Card className={className}>
      <CardHeader className="p-4">
        <CardTitle className="text-base font-medium">Filters</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col gap-4">
          <div className="relative flex items-center">
            <IconSearch className="text-muted-foreground absolute left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => {
              const option = filterOptions.find((o) => o.id === filter.field);
              return (
                filter.field !== "search" && (
                  <Badge
                    key={index}
                    variant="outline"
                    className="gap-1 px-2 py-1 text-xs"
                  >
                    <span className="font-medium">
                      {option?.label || filter.field}
                    </span>
                    <span>{filter.operator}</span>
                    <span className="font-medium">{filter.value}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground h-4 w-4 p-0"
                      onClick={() => removeFilter(index)}
                    >
                      <IconX className="h-3 w-3" />
                      <span className="sr-only">Remove filter</span>
                    </Button>
                  </Badge>
                )
              );
            })}

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <IconFilter className="h-3.5 w-3.5" />
                  <span>Add filter</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <FilterBuilder
                  filterOptions={filterOptions}
                  onAddFilter={addFilter}
                />
              </PopoverContent>
            </Popover>

            {filters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4 pt-0">
        <Button size="sm" onClick={handleSearch}>
          Apply filters
        </Button>
      </CardFooter>
    </Card>
  );
}

type FilterBuilderProps = {
  filterOptions: FilterOption[];
  onAddFilter: (filter: FilterValue) => void;
};

function FilterBuilder({ filterOptions, onAddFilter }: FilterBuilderProps) {
  const [selectedField, setSelectedField] = React.useState<string>("");
  const [selectedOperator, setSelectedOperator] = React.useState<string>("");
  const [filterValue, setFilterValue] = React.useState<string>("");

  const selectedOption = React.useMemo(
    () => filterOptions.find((option) => option.id === selectedField),
    [filterOptions, selectedField],
  );

  const handleAddFilter = () => {
    if (selectedField && selectedOperator && filterValue) {
      onAddFilter({
        field: selectedField,
        operator: selectedOperator,
        value: filterValue,
      });
      setSelectedField("");
      setSelectedOperator("");
      setFilterValue("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="field" className="text-xs font-medium">
              Field
            </label>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger id="field" className="h-8">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="operator" className="text-xs font-medium">
              Operator
            </label>
            <Select
              value={selectedOperator}
              onValueChange={setSelectedOperator}
              disabled={!selectedField}
            >
              <SelectTrigger id="operator" className="h-8">
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                {selectedOption?.operators.map((operator) => (
                  <SelectItem key={operator} value={operator}>
                    {operator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="value" className="text-xs font-medium">
            Value
          </label>
          {selectedOption?.type === "select" ? (
            <Select
              value={filterValue}
              onValueChange={setFilterValue}
              disabled={!selectedOperator}
            >
              <SelectTrigger id="value" className="h-8">
                <SelectValue placeholder="Select value" />
              </SelectTrigger>
              <SelectContent>
                {selectedOption.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="value"
              type={selectedOption?.type || "text"}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="h-8"
              placeholder="Enter value"
              disabled={!selectedOperator}
            />
          )}
        </div>
      </div>
      <Button
        onClick={handleAddFilter}
        className="w-full"
        disabled={!selectedField || !selectedOperator || !filterValue}
      >
        Add filter
      </Button>
    </div>
  );
}

// Example usage:
// const filterOptions = [
//   {
//     id: "status",
//     label: "Status",
//     type: "select",
//     operators: ["equals", "not equals"],
//     options: [
//       { value: "done", label: "Done" },
//       { value: "in-process", label: "In Process" },
//     ],
//   },
//   {
//     id: "reviewer",
//     label: "Reviewer",
//     type: "text",
//     operators: ["equals", "contains", "starts with"],
//   },
//   {
//     id: "target",
//     label: "Target",
//     type: "number",
//     operators: ["equals", "greater than", "less than"],
//   },
// ]
