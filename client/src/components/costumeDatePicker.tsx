"use client";
import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDaysIcon, ChevronDown } from "lucide-react";
import clsx from "clsx";

interface DatePickerProps {
  date?: Date;
  onChange: (date: Date | undefined) => void;
  className?: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  date,
  onChange,
  className,
}) => {
  const [selected, setSelected] = useState<Date | undefined>(date);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleSelect = (day: Date | undefined) => {
    setSelected(day);
    onChange(day);
  };

  useEffect(() => {
    const popoverContent = popoverContentRef.current;

    const adjustDropdownHeight = () => {
      if (popoverContent) {
        const dropdowns = popoverContent.querySelectorAll(
          ".rdp-dropdown select"
        );
        dropdowns.forEach((dropdown) => {
          (dropdown as HTMLSelectElement).style.maxHeight = `${
            popoverContent.offsetHeight - 40
          }px`;
          (dropdown as HTMLSelectElement).style.overflowY = "auto";
        });
      }
    };

    if (popoverContent) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            adjustDropdownHeight();
            observerRef.current?.disconnect(); // Disconnect after it's visible
          }
        });
      });

      observerRef.current.observe(popoverContent);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []); // Run only on mount

  // Re-adjust if the selected date changes and the popover is likely open again
  useEffect(() => {
    if (popoverContentRef.current) {
      adjustDropdownHeight();
    }
  }, [selected]);

  const adjustDropdownHeight = () => {
    const popoverContent = popoverContentRef.current;
    if (popoverContent) {
      const dropdowns = popoverContent.querySelectorAll(".rdp-dropdown select");
      dropdowns.forEach((dropdown) => {
        (dropdown as HTMLSelectElement).style.maxHeight = `${
          popoverContent.offsetHeight - 40
        }px`;
        (dropdown as HTMLSelectElement).style.overflowY = "auto";
      });
    }
  };

  return (
    <div className={clsx("relative", className)}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className={clsx(
              "flex items-center justify-between w-full px-4 py-2.5",
              "text-sm font-medium text-gray-700 bg-white dark:bg-gray-800",
              "border border-gray-200 dark:border-gray-700 rounded-lg",
              "shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700",
              "transition-colors duration-150 focus:outline-none",
              "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            )}
          >
            <span
              className={clsx(
                selected
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-400"
              )}
            >
              {selected ? format(selected, "MMM d, yyyy") : "Select date"}
            </span>
            <CalendarDaysIcon className="w-5 h-5 ml-2 text-gray-400 dark:text-gray-400" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            ref={popoverContentRef}
            sideOffset={4}
            className={clsx(
              "z-50 rounded-xl border border-gray-200 dark:border-gray-700",
              "bg-white dark:bg-gray-800 shadow-lg overflow-hidden",
              "will-change-transform animate-in fade-in-80 zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              captionLayout="dropdown-buttons"
              fromYear={1970}
              toYear={new Date().getFullYear() + 10}
              className="p-3"
              components={{
                Dropdown: ({ name, value, onChange, children, ...props }) => (
                  <div className="relative">
                    <select
                      {...props}
                      value={value}
                      onChange={onChange}
                      className={clsx(
                        "appearance-none bg-transparent pr-8 pl-3 py-1",
                        "border border-gray-200 dark:border-gray-700 rounded-md",
                        "text-sm font-medium focus:outline-none focus:ring-1",
                        "focus:ring-blue-500 focus:border-blue-500"
                      )}
                    >
                      {children}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                ),
              }}
              classNames={{
                caption: "flex justify-center gap-2 items-center pb-2",
                caption_dropdowns: "flex gap-2",
                dropdown: "rdp-dropdown",
                dropdown_month: "rdp-dropdown_month",
                dropdown_year: "rdp-dropdown_year",
                dropdown_icon: "hidden",
                nav: "rdp-nav",
                nav_button: "rdp-nav_button",
                table: "w-full border-collapse",
                head_row: "rdp-head_row",
                head_cell: "rdp-head_cell",
                row: "rdp-row",
                cell: "rdp-cell",
                day: "rdp-day",
                day_selected: "rdp-day_selected",
                day_today: "rdp-day_today",
                day_outside: "rdp-day_outside",
                day_disabled: "rdp-day_disabled",
                day_hidden: "rdp-day_hidden",
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <style jsx global>{`
        .rdp {
          --rdp-cell-size: 32px;
          --rdp-accent-color: #3b82f6;
          --rdp-background-color: #eff6ff;
          --rdp-outline: 2px solid var(--rdp-accent-color);
          --rdp-outline-selected: 2px solid rgba(0, 0, 0, 0.1);
        }

        .rdp-dropdown {
          position: relative;
        }

        .rdp-dropdown_month,
        .rdp-dropdown_year {
          font-size: 14px !important;
          padding: 5px !important;
        }

        .rdp-head_row {
          margin-top: 8px;
        }

        .rdp-head_cell {
          color: #6b7280;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          padding: 8px 0;
        }

        .rdp-day {
          width: var(--rdp-cell-size);
          height: var(--rdp-cell-size);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 400;
          transition: all 0.2s;
        }

        .rdp-day:hover:not(.rdp-day_selected, .rdp-day_disabled) {
          background-color: #f3f4f6;
        }

        .rdp-day_selected {
          background-color: var(--rdp-accent-color);
          color: white;
          font-weight: 500;
        }

        .rdp-day_today:not(.rdp-day_selected) {
          font-weight: 600;
          color: var(--rdp-accent-color);
        }

        .rdp-day_outside {
          color: #9ca3af;
          opacity: 0.5;
        }

        .rdp-day_disabled {
          color: #d1d5db;
          cursor: not-allowed;
        }

        .dark .rdp-dropdown_month,
        .dark .rdp-dropdown_year {
          background-color: #1f2937;
          border-color: #374151;
          color: #f3f4f6;
        }

        .dark .rdp-dropdown_month:hover,
        .dark .rdp-dropdown_year:hover {
          border-color: #4b5563;
        }

        .dark .rdp-day:hover:not(.rdp-day_selected, .rdp-day_disabled) {
          background-color: #374151;
        }

        .dark .rdp-day_outside {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default CustomDatePicker;
