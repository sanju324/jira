"use client";
import { createSprint } from "@/actions/sprints";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import useFetch from "@/hooks/use-fetch";
import { sprintSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Chevron, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const SprintCreationBoard = ({
	projectTitle,
	projectId,
	projectKey,
	sprintKey,
}) => {
	const [showForm, setShowForm] = useState(false);

	const [dateRange, setDateRange] = useState({
		from: new Date(),
		to: addDays(new Date(), 14),
	});

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(sprintSchema),
		defaultValues: {
			name: `${projectKey}${sprintKey}`,
			startDate: dateRange.from,
			endDate: dateRange.to,
		},
	});

	const { loading: createSprintLoading, fn: createSprintFn } =
		useFetch(createSprint);

	const onSubmit = async (data) => {
		await createSprintFn(projectId, {
			...data,
			startDate: dateRange.from,
			endDate: dateRange.to,
		});
		setShowForm(false);
		toast.success("Sprint Created Successfully");
		router.refresh();
	};

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-5xl font-bold mb-8 light-gradient-title">
					{projectTitle}
				</h1>
				<Button
					onClick={() => setShowForm(!showForm)}
					className={`mt-2 ${showForm ? "bg-red-200" : "bg-blue-500"}`}
					variant={showForm ? "destructive" : "default"}
				>
					{showForm ? "Cancel" : "Create Sprint"}
				</Button>
			</div>
			{showForm && (
				<Card className="pt-4 mb-4 bg-white shadow-lg">
					<CardContent>
						<form
							className="flex gap-4 items-end"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium mb-1 text-gray-700"
								>
									Sprint Name
								</label>
								<Input
									id="name"
									readOnly
									className="bg-gray-100"
									{...register("name")}
								/>
								{errors.name && (
									<p className="text-red-500 text-sm mt-1">
										{errors.name.message}
									</p>
								)}
							</div>
							<div className="flex-1">
								<label className="block text-sm font-medium mb-1 text-gray-700">
									Sprint Duration
								</label>
								<Controller
									name="dateRange"
									control={control}
									render={({ field }) => (
										<Popover>
											<PopoverTrigger asChild>
												<Button
													className={`w-full justify-start text-left font-normal bg-gray-100 ${
														!dateRange &&
														"text-muted-foreground"
													}`}
													variant="outline"
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{dateRange.from &&
													dateRange.to ? (
														format(
															dateRange.from,
															"LLL dd, y"
														) +
														" - " +
														format(
															dateRange.to,
															"LLL dd, y"
														)
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto bg-white shadow-lg"
												align="start"
											>
												<DayPicker
													mode="range"
													selected={dateRange}
													onSelect={(range) => {
														if (
															range.from &&
															range.to
														) {
															setDateRange(range);
															field.onChange(
																range
															);
														}
													}}
													classNames={{
														Chevron:
															"fill-blue-500",
														range_start:
															"bg-blue-700",
														range_end:
															"bg-blue-700",
														range_middle:
															"bg-blue-400",
														day_button:
															"border-none",
														today: "border-2 border-blue-700",
													}}
												/>
											</PopoverContent>
										</Popover>
									)}
								/>
							</div>
							<Button
								type="submit"
								disabled={createSprintLoading}
								className="bg-green-500"
							>
								{createSprintLoading
									? "Creating..."
									: "Create Sprint"}
							</Button>
						</form>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default SprintCreationBoard;
