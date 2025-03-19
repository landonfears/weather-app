import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DayOfWeek, TimeOfDay } from "~/server/types";

export function DropdownMenu({
  // label,
  items,
  placeholder,
  triggerClassName,
  // labelClassName,
  value,
  onSelect,
}: {
  // label: string;
  items: string[];
  placeholder: string;
  triggerClassName?: string;
  // labelClassName?: string;
  value: TimeOfDay | DayOfWeek;
  onSelect: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onSelect}>
      <SelectTrigger className={cn(triggerClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
