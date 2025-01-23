'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LocationSelector from '@/components/ui/location-input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { PhoneInput } from '../phone';

const labelColors = 'text-blue-500 pt-4';

const formSchema = z.object({
	name_4500651209: z.string(),
	name_6286633892: z.string(),
	name_9228593767: z.coerce.date(),
	name_2611222094: z.string(),
	name_4017430262: z.tuple([z.string(), z.string().optional()]),
});

export default function MyForm() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [countryName, setCountryName] = useState<string>('');
	const [stateName, setStateName] = useState<string>('');
	const [studentTutor, setStudentTutor] = useState<string>('student');

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name_9228593767: new Date(),
		},
	});

	const handleRegistration = (value: string) => {
		setStudentTutor(value);
	};

	const isStudent =
		studentTutor === 'student' ? 'School Name' : 'Languages Spoken';
	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			console.log(values);
			alert('Form submitted successfully');
			toast(
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(values, null, 2)}</code>
				</pre>
			);
		} catch (error) {
			console.error('Form submission error', error);
			toast.error('Failed to submit the form. Please try again.');
		}
	}

	return (
		<div className='wrapper container shadow-2xl shadow-slate-300 border border-slate-200 rounded-lg bg-white max-w-2xl mx-auto py-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
			<div className='form-header'>
				<div className='logo mb-8'>
					<Image
						src='/studypivot-logo-icon.png'
						alt='logo'
						width={55}
						height={65.12}
					/>
				</div>
				<div className='title-desc'>
					<h2 className='text-base font-bold text-neutralSP-900'>
						Help Us Get to Know You Better!
					</h2>
					<p className=' text-neutralSP-700 text-sm'>
						To help us better personalize your experience and enhance your
						profile, please take a moment to fill out this quick form.
					</p>
				</div>
				{/* <div className='student-tutor-registration'>
					<RadioGroup
						onValueChange={handleRegistration}
						defaultValue={studentTutor}
						className='flex space-x-8 mt-8'>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value='student' id='r1' />
							<Label htmlFor='r1'>Register as a student</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value='tutor' id='r2' />
							<Label htmlFor='r2'>Register as a tutor</Label>
						</div>
					</RadioGroup>
				</div> */}
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 max-w-2xl mx-auto py-10'>
					<div className=''>
						<p>{studentTutor}</p>
						<div>
							<div className='student-tutor-registration'>
								<RadioGroup
									onValueChange={handleRegistration}
									defaultValue={studentTutor}
									className='flex space-x-8 mt-8'>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='student' id='r1' />
										<Label htmlFor='r1'>Register as a student</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='tutor' id='r2' />
										<Label htmlFor='r2'>Register as a tutor</Label>
									</div>
								</RadioGroup>
							</div>
						</div>
						<FormField
							control={form.control}
							name='name_4500651209'
							render={({ field }) => (
								<FormItem>
									<FormLabel className={`${labelColors}`}>
										{isStudent}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={
												studentTutor === 'student'
													? 'Nyatsime College'
													: 'English, French, Shona'
											}
											type=''
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className='grid grid-cols-12 gap-4'>
							<div className='col-span-6'>
								<FormField
									control={form.control}
									name='name_6286633892'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a verified email to display' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='m@example.com'>
														m@example.com
													</SelectItem>
													<SelectItem value='m@google.com'>
														m@google.com
													</SelectItem>
													<SelectItem value='m@support.com'>
														m@support.com
													</SelectItem>
												</SelectContent>
											</Select>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='col-span-6'>
								<FormField
									control={form.control}
									name='name_9228593767'
									render={({ field }) => (
										<FormItem className=''>
											<FormLabel className={labelColors}>
												Date of birth
											</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={'outline'}
															className={cn(
																'w-[240px] pl-3 min-w-full text-left font-normal',
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
													<Calendar
														mode='single'
														selected={field.value}
														onSelect={field.onChange}
														initialFocus
													/>
												</PopoverContent>
											</Popover>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<FormField
							control={form.control}
							name='name_2611222094'
							render={({ field }) => (
								<FormItem className=''>
									<FormLabel className={labelColors}>Phone number</FormLabel>
									<FormControl className='w-full'>
										<PhoneInput
											placeholder='Placeholder'
											{...field}
											defaultCountry='TR'
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name_4017430262'
							render={({ field }) => (
								<FormItem>
									<FormLabel className={labelColors}>Select Country</FormLabel>
									<FormControl>
										<LocationSelector
											onCountryChange={(country) => {
												setCountryName(country?.name || '');
												form.setValue(field.name, [
													country?.name || '',
													stateName || '',
												]);
											}}
											onStateChange={(state) => {
												setStateName(state?.name || '');
												form.setValue(field.name, [
													form.getValues(field.name)[0] || '',
													state?.name || '',
												]);
											}}
										/>
									</FormControl>
									<FormDescription>
										If your country has states, it will be appear after
										selecting country
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='mt-4'>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
