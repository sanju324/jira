import { createIssue } from "@/actions/issues";
import { getOrganisationUsers } from "@/actions/organisations";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import useFetch from "@/hooks/use-fetch";
import { issueSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const IssueCreationDrawer = ({
	isOpen,
	onClose,
	sprintId,
	status,
	projectId,
	onIssueCreated,
	orgId,
}) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(issueSchema),
		defaultValues: {
			priority: "MEDIUM",
			description: "",
			assigneeId: "",
		},
	});

	const {
		loading: createIssueLoading,
		fn: createIssueFn,
		error,
		data: newIssue,
	} = useFetch(createIssue);

	const {
		loading: usersLoading,
		data: users,
		fn: fetchUsers,
	} = useFetch(getOrganisationUsers);

	useEffect(() => {
		if (isOpen && orgId) {
			fetchUsers(orgId);
		}
	}, [isOpen, orgId]);

	const onSubmit = async (data) => {};

	return (
		<Drawer open={isOpen} onClose={onClose}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Create New Issue</DrawerTitle>
				</DrawerHeader>
				{usersLoading && <BarLoader width={"100%"} color="#36d7b7" />}
				<form className="p-4 space-y-4">
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium mb-1"
						>
							Title
						</label>
						<Input id="title" {...register("title")} />
						{errors.title && (
							<p className="text-red-500 text-sm mt-1">
								{errors.title.message}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="assigneeId"
							className="block text-sm font-medium mb-1"
						>
							Assignee
						</label>
						<Controller
							name="asigneeId"
							control={control}
							render={(field) => {
								return (
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select assignee" />
										</SelectTrigger>
										<SelectContent>
											{users?.map((user) => (
												<SelectItem
													key={user.id}
													value={user.id}
												>
													{user?.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								);
							}}
						/>
						{errors.assigneeId && (
							<p className="text-red-500 text-sm mt-1">
								{errors.assigneeId.message}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium mb-1"
						>
							Description
						</label>
						<Input id="title" {...register("title")} />
						{errors.description && (
							<p className="text-red-500 text-sm mt-1">
								{errors.description.message}
							</p>
						)}
					</div>
				</form>
			</DrawerContent>
		</Drawer>
	);
};

export default IssueCreationDrawer;
