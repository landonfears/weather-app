import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DayOfWeek, TimeOfDay } from "~/server/types";

export function DropdownMenu({
  items,
  placeholder,
  triggerClassName,
  value,
  onSelect,
}: {
  items: string[];
  placeholder: string;
  triggerClassName?: string;
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
