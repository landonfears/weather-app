import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "~/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";

import { Skeleton } from "~/components/ui/skeleton";

import { Check, X } from "lucide-react";
import { cn } from "~/lib/utils";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  value?: Option;
  onValueChange?: (value: Option) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  inputClassName?: string;
  commandClassName?: string;
  hasOptions?: boolean;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
  inputValue,
  setInputValue,
  inputClassName,
  commandClassName,
  hasOptions,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value!);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange],
  );

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <CommandPrimitive
      onKeyDown={handleKeyDown}
      className={cn(commandClassName)}
    >
      <div className="flex items-center justify-between">
        <div className="grow">
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={isLoading ? undefined : setInputValue}
            onBlur={handleBlur}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(inputClassName)}
          />
        </div>
        <button
          className="mr-2 shrink-0"
          onMouseDown={handleMouseDown}
          onClick={() => {
            setInputValue("");
            inputRef.current?.focus();
          }}
        >
          <X className="h-4 w-4 opacity-50" onClick={() => {}} />
        </button>
      </div>
      <div className="relative mt-0">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-2 z-10 w-full rounded-xl bg-white outline-none",
            isOpen ? "block" : "hidden",
          )}
        >
          <CommandList
            className={cn(
              isLoading ||
                (options.length > 0 && !isLoading && hasOptions) ||
                (!isLoading && hasOptions)
                ? "ring-1"
                : "ring-0",
              "w-full rounded-lg ring-slate-200",
            )}
          >
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading && hasOptions ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null,
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading && hasOptions ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
