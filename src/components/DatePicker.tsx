import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { IconButton } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { dateFormater } from "@/utils/date";

const range = (start: number, end: number, step: number): number[] => {
  return Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step);
};

const DatePickerComponent = ({onChangeDate}:{onChangeDate: (value:any) => void}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const years: number[] = range(1990, getYear(new Date()) + 1, 1);
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }: {
        date: Date;
        changeYear: (year: number) => void;
        changeMonth: (month: number) => void;
        decreaseMonth: () => void;
        increaseMonth: () => void;
        prevMonthButtonDisabled: boolean;
        nextMonthButtonDisabled: boolean;
      }) => (
        <div className="flex gap-2 justify-center px-2">
          <IconButton size="sm" variant="text" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <ChevronLeftIcon className="h-3 w-3" />
          </IconButton>

          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(parseInt(value))}
            className="border border-blue-gray-200 rounded-lg px-1 py-1.5 text-sm font-normal text-blue-gray-700 focus:outline-none focus:border-gray-900"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            className="border border-blue-gray-200 rounded-lg px-1 py-1.5 text-sm font-normal text-blue-gray-700 focus:outline-none focus:border-gray-900"
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <IconButton size="sm" variant="text" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <ChevronRightIcon className="h-3 w-3" />
          </IconButton>
        </div>
      )}
      className="border border-blue-gray-200 rounded-lg px-3 py-2.5 w-full text-sm font-normal text-blue-gray-700 focus:outline-none focus:border-gray-900"
      selected={startDate}
      onChange={(date: Date | null) => {
        setStartDate(date || new Date())
        if (date) {
          onChangeDate(date.toISOString().split('T')[0])
        }
      }}
    />
  );
};

export default DatePickerComponent;