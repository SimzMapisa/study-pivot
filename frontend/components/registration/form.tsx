'use client';

import { register } from '@/app/actions/register';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Country, State } from 'country-state-city';
import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PhoneInput } from '../ui/phone-input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
// import countries from "@/data/countries.json"

// interface DatePickerProps {
// 	startYear?: number;
// 	endYear?: number;
// }

const startYear = getYear(new Date()) - 80;
const endYear = getYear(new Date()) - 12;

const registerSchema = z
	.object({
		userType: z.enum(['student', 'tutor'], {
			required_error: 'User type is required', // Custom message for enum validation
		}),
		dob: z.date({
			required_error: 'A date of birth is required.',
		}),
		gender: z.enum(['Male', 'Female', 'Other'], {
			required_error: 'Please select your gender',
		}),
		phone: z
			.string()
			.nonempty('Phone number can not be empty')
			.refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
		languages: z.string().optional(),
		school: z.string().optional(),
		country: z.string().nonempty('Please select a country'), // Add country field
		state: z.string().optional(), // Add state field
	})
	.refine(
		(data) => {
			if (data.userType === 'student') {
				return !!data.school; // school is required for students
			} else if (data.userType === 'tutor') {
				return !!data.languages; // languages is required for tutors
			}
			return true;
		},
		{
			message: 'School or Languages is required based on user type',
			path: ['school', 'language'], // Specify the fields to validate
		}
	)
	.refine(
		(data) => {
			if (!data.country) return true;
			const countryStates = State.getStatesOfCountry(data.country);

			// If country has states, validate state field
			if (countryStates.length > 0) {
				return !!data.state;
			}
			return true;
		},
		{
			message: 'State is required for this country',
			path: ['state'],
		}
	);

export default function RegistrationForm() {
	const years = Array.from(
		{ length: endYear - startYear + 1 },
		(_, i) => startYear + i
	).sort((a, b) => b - a);

	const [selectedCountry, setSelectedCountry] = useState<string>('');
	const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);
	const [state, action, isPending] = useActionState(register, null);
	console.log(state);

	const countries = Country.getAllCountries();

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

	const handleCountryChange = (countryCode: string) => {
		setSelectedCountry(countryCode);
		const countryStates = State.getStatesOfCountry(countryCode);
		setStates(countryStates);
		form.setValue('state', '');
	};

	function onSubmit(values: z.infer<typeof registerSchema>) {
		// Wrap the action call in startTransition
		startTransition(() => {
			const formattedValues = {
				...values,
				dob: values.dob.toISOString(),
				phone: values.phone.replace(/\D/g, ''),
			};
			action(formattedValues);
		});
	}

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		mode: 'onBlur',
		defaultValues: {
			school: '',
			userType: undefined,
			phone: '',
			languages: '',
			gender: undefined,
			country: '',
			state: '',
			dob: new Date(endYear, 0, 1), // Add default date
		},
	});

	function handleMonthChange(month: string) {
		const monthIndex = months.indexOf(month);
		const newDate = setMonth(date, monthIndex);
		setDate(newDate);
		form.setValue('dob', newDate);
	}

	function handleYearChange(year: string) {
		const newDate = setYear(date, parseInt(year));
		setDate(newDate);
		form.setValue('dob', newDate); // Update the form's dob field
	}

	const [date, setDate] = useState<Date>(
		form.getValues('dob') || new Date(endYear, 0, 1)
	);

	// Watch the userType field
	const userType = form.watch('userType');

	// Reset school and languages fields when userType changes
	useEffect(() => {
		if (userType === 'student') {
			form.resetField('languages'); // Reset languages field
		} else if (userType === 'tutor') {
			form.resetField('school'); // Reset school field
		}
	}, [userType, form]);

	useEffect(() => {
		if (!state?.errors) {
			form.reset();
			setDate(new Date(endYear, 0, 1)); // Reset calendar state
		}
	}, [state, form]);

	useEffect(() => {
		if (state?.success) {
			// Force full page reload to clear middleware state
			if (state.redirectUrl) {
				window.location.href = state.redirectUrl;
			}
		}
	}, [state]);
	const params = useSearchParams();

	useEffect(() => {
		if (params.get('refresh')) {
			window.location.href = '/';
		}
	}, [params]);

	return (
		<Card className='lg:w-[500px] space-y-2 py-8'>
			<CardHeader className='flex items-center text-center'>
				<div className='mb-8'>
					<Image
						src='/studypivot-logo-icon.png'
						alt='study pivot logo'
						width={50}
						height={60}
					/>
				</div>
				<div>
					<h3 className='text-neutralSP-900 text-base font-semibold leading-6'>
						Help Us Get to Know You Better!
					</h3>
					<p className='text-neutralSP-700 text-sm leading-5'>
						To help us better personalize your experience and enhance your
						profile, please take a moment to fill out this quick form.
					</p>
				</div>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent>
						<FormField
							name='userType'
							render={({ field }) => (
								<FormItem>
									{/* <FormLabel className='font-semibold text-base tex'>
										User Type
									</FormLabel> */}
									<FormControl>
										<RadioGroup
											value={field.value}
											onValueChange={field.onChange}>
											<div className='flex gap-4'>
												{/* Custom radio button for 'student' */}
												<div className='flex items-center w-1/2'>
													<RadioGroupItem
														value='student'
														id='r1'
														className='hidden'
													/>
													<div
														className={`w-6 h-6 rounded-full mr-2 border-2 ${
															field.value === 'student'
																? 'border-slate-500 bg-white'
																: 'border-gray-300'
														} flex justify-center items-center cursor-pointer transition-all`}
														role='radio'
														aria-checked={field.value === 'student'}
														onClick={() => field.onChange('student')}>
														{field.value === 'student' && (
															<div className='w-3 h-3 rounded-full bg-slate-500' />
														)}
													</div>
													<Label htmlFor='r1'>Register as a student</Label>
												</div>

												{/* Custom radio button for 'tutor' */}
												<div className='flex items-center  w-1/2'>
													<RadioGroupItem
														value='tutor'
														id='r2'
														className='hidden'
													/>
													<div
														className={`w-6 h-6 rounded-full mr-2 border-2 ${
															field.value === 'tutor'
																? 'border-slate-500 bg-white'
																: 'border-gray-300'
														} flex justify-center items-center cursor-pointer transition-all`}
														role='radio'
														aria-checked={field.value === 'tutor'}
														onClick={() => field.onChange('tutor')}>
														{field.value === 'tutor' && (
															<div className='w-3 h-3 rounded-full bg-slate-500' />
														)}
													</div>
													<Label htmlFor='r2'>Register as a tutor</Label>
												</div>
											</div>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{userType === 'student' && (
							<FormField
								name='school'
								render={({ field }) => (
									<FormItem>
										<FormLabel>School Name</FormLabel>
										<FormDescription>
											Please add your school name here.
										</FormDescription>
										<FormControl>
											<Input
												{...field}
												className={`${
													form.formState.errors.school
														? 'border-red-500 border-2'
														: 'border-neutral-200'
												}`}
												placeholder='eg: Nyatsime College'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{userType === 'tutor' && (
							<FormField
								name='languages'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Languages Spoken</FormLabel>
										<FormDescription>
											Please add languages comma seperated.
										</FormDescription>
										<FormControl>
											<Input
												{...field}
												className={`${
													form.formState.errors.languages
														? 'border-red-500 border-2'
														: 'border-neutral-200'
												}`}
												placeholder='eg: Shona, French, English...'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<div className='flex items-center gap-4'>
							<FormField
								name='gender'
								render={({ field }) => (
									<FormItem className='w-1/2'>
										<FormLabel>Gender</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}>
												<SelectTrigger className=''>
													<SelectValue placeholder='Select your gender' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value='Male'>Male</SelectItem>
														<SelectItem value='Female'>Female</SelectItem>
														<SelectItem value='Other'>Other</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='dob'
								render={({ field }) => (
									<FormItem className='flex flex-col w-1/2'>
										<FormLabel className='pb-2'>Date of birth</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'w-full pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground'
														)}>
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-auto p-0' align='start'>
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
													selected={field.value} // Bind to the form's dob field
													onSelect={(selectedDate) => {
														if (selectedDate) {
															field.onChange(selectedDate); // Update the form's dob field
															setDate(selectedDate); // Update the date state
														}
													}}
													disabled={(date) =>
														date > new Date() || date < new Date('1900-01-01')
													}
													initialFocus
													month={date}
													onMonthChange={setDate}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<PhoneInput
											{...field}
											className={`bg-white ${
												form.formState.errors.phone
													? 'border-red-500 border-2 rounded-md'
													: 'border-neutral-200'
											}`}
											defaultCountry='ZW'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex gap-4'>
							{/* Country Field */}
							<FormField
								name='country'
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormLabel>Country</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);
													handleCountryChange(value);
												}}>
												<SelectTrigger>
													<SelectValue placeholder='Select your country' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{countries.map((country) => (
															<SelectItem
																key={country.isoCode}
																value={country.isoCode}>
																{country.name}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* State Field (Conditional) */}
							{selectedCountry && states.length > 0 && (
								<FormField
									name='state'
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>State</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}>
													<SelectTrigger>
														<SelectValue placeholder='Select your state' />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{states.map((state) => (
																<SelectItem
																	key={state.isoCode}
																	value={state.isoCode}>
																	{state.name}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>
					</CardContent>
					<CardFooter>
						<Button className='w-full' type='submit' disabled={isPending}>
							{isPending ? 'Updating...' : 'Update Profile'}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
