"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { countries } from "country-data-list";
import { CheckIcon, ChevronDown, Globe } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

import { cn } from "@polaris/ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@polaris/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@polaris/ui/popover";

export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

interface CountryDropdownProps {
  options?: Country[];
  allowedCountries?: readonly string[];
  onChange?: (country: Country) => void;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
}

const CountryDropdownComponent = (
  {
    allowedCountries,
    options: _options,
    onChange,
    defaultValue,
    value,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const options = useMemo(
    () =>
      _options ??
      (allowedCountries
        ? allowedCountries.map((a) => countries.all.find((b) => b.alpha2 === a))
        : countries.all.filter(
            (country: Country) =>
              country.emoji &&
              country.status !== "deleted" &&
              country.ioc !== "PRK",
          )),
    [_options, allowedCountries],
  );
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined,
  );

  useEffect(() => {
    if (value) {
      const initialCountry = options.find(
        (country) => value && country?.alpha2 === value,
      );
      if (initialCountry) {
        setSelectedCountry(initialCountry);
      } else {
        setSelectedCountry(undefined);
      }
    } else {
      setSelectedCountry(undefined);
    }
  }, [value, options]);

  useEffect(() => {
    if (defaultValue) {
      const initialCountry = options.find(
        (country) => defaultValue && country?.alpha2 === defaultValue,
      );
      if (initialCountry) {
        setSelectedCountry(initialCountry);
      } else {
        setSelectedCountry(undefined);
      }
    } else {
      setSelectedCountry(undefined);
    }
  }, [defaultValue, options]);

  const handleSelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      onChange?.(country);
      setOpen(false);
    },
    [onChange],
  );

  const triggerClasses = cn(
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    slim === true && "w-20",
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {selectedCountry ? (
          <div className="flex w-0 flex-grow items-center gap-2 overflow-hidden">
            <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <CircleFlag
                countryCode={selectedCountry.alpha2.toLowerCase()}
                height={20}
              />
            </div>
            {slim === false && (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedCountry.name}
              </span>
            )}
          </div>
        ) : (
          <span>
            {slim === false ? (
              placeholder || setSelectedCountry.name
            ) : (
              <Globe size={20} />
            )}
          </span>
        )}
        <ChevronDown size={16} className="opacity-50" />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command className="max-h-[200px] w-full sm:max-h-[270px]">
          <CommandList>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x?.name)
                .map(
                  (option, key: number) =>
                    option && (
                      <CommandItem
                        className="flex w-full items-center gap-2"
                        key={key}
                        onSelect={() => handleSelect(option)}
                      >
                        <div className="flex w-0 flex-grow space-x-2 overflow-hidden">
                          <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
                            <CircleFlag
                              countryCode={option.alpha2.toLowerCase()}
                              height={20}
                            />
                          </div>
                          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {option.name}
                          </span>
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4 shrink-0",
                            option.name === selectedCountry?.name
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ),
                )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdownComponent";

export const CountryDropdown = forwardRef(CountryDropdownComponent);
