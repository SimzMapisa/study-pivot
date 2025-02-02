'use client';

import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './select';

interface DatePickerProps {
	startYear?: number;
	endYear?: number;
}
export function DatePicker({
	startYear = getYear(new Date()) - 80,
	endYear = getYear(new Date()) - 12,
}: DatePickerProps) {
	const years = Array.from(
		{ length: endYear - startYear + 1 },
		(_, i) => startYear + i
	).sort((a, b) => b - a);

	const [date, setDate] = React.useState<Date>(new Date(endYear, 0, 1));
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	function handleMonthChange(month: string) {
		const newDate = setMonth(date, months.indexOf(month));
		setDate(newDate);
	}

	function handleYearChange(year: string) {
		const newDate = setYear(date, parseInt(year));
		setDate(newDate);
	}

	console.log(getYear(date), startYear, endYear);

	function handleSelect(selectedDate: Date | undefined) {
		if (selectedDate) {
			setDate(selectedDate);
		}
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[250px] justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<div className='flex gap-2 p-2'>
					<Select
						onValueChange={handleMonthChange}
						value={months[getMonth(date)]}>
						<SelectTrigger className='w-1/2'>
							<SelectValue placeholder='Month' />
						</SelectTrigger>
						<SelectContent>
							{months.map((month, i) => (
								<SelectItem value={month} key={i}>
									{month}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						onValueChange={handleYearChange}
						value={getYear(date).toString()}>
						<SelectTrigger className='w-1/2'>
							<SelectValue placeholder='Year' />
						</SelectTrigger>
						<SelectContent>
							{years.map((year) => (
								<SelectItem value={year.toString()} key={year}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Calendar
					mode='single'
					selected={date}
					onSelect={handleSelect}
					initialFocus
					month={date}
					onMonthChange={setDate}
				/>
			</PopoverContent>
		</Popover>
	);
}
