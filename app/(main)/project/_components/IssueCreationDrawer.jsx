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
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";

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
		reset,
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

	useEffect(() => {
		if (newIssue) {
			reset();
			onClose();
			onIssueCreated();
			toast.success("Issue Created Successfully");
		}
	}, [newIssue, createIssueLoading]);

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

	const onSubmit = async (data) => {
		await createIssueFn(projectId, { ...data, status, sprintId });
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<Drawer open={isOpen} onClose={onClose}>
			<DrawerContent className="bg-white text-black">
				<DrawerHeader>
					<DrawerTitle className="text-xl font-bold">Create New Issue</DrawerTitle>
				</DrawerHeader>
				{usersLoading && <BarLoader width={"100%"} color="#36d7b7" />}
				<form
					className="p-4 space-y-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium mb-1"
						>
							Title
						</label>
						<Input id="title" {...register("title")} className="border-gray-300" />
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
							name="assigneeId"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="border-gray-300">
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
							)}
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

						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<MDEditor
									value={field.value}
									onChange={field.onChange}
									className="border-gray-300"
								/>
							)}
						/>
					</div>
					<div>
						<label
							htmlFor="priority"
							className="block text-sm font-medium mb-1"
						>
							Priority
						</label>
						<Controller
							name="priority"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-[180px] border-gray-300">
										<SelectValue placeholder="Select Priority" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="LOW">LOW</SelectItem>
										<SelectItem value="MEDIUM">
											MEDIUM
										</SelectItem>
										<SelectItem value="HIGH">
											HIGH
										</SelectItem>
										<SelectItem value="URGENT">
											URGENT
										</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					{error && (
						<p className="text-red-500 mt-2">{error.message}</p>
					)}
					<Button
						type="submit"
						disabled={createIssueLoading}
						className="w-full bg-blue-500 text-white hover:bg-blue-600"
					>
						{createIssueLoading ? "Creating..." : "Create Issue"}
					</Button>
				</form>
			</DrawerContent>
		</Drawer>
	);
};

export default IssueCreationDrawer;
