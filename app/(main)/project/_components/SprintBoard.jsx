"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import SprintManager from "./SprintManager";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import statuses from "@/data/status";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import IssueCreationDrawer from "./IssueCreationDrawer";
import useFetch from "@/hooks/use-fetch";
import { getIssuesForSprint } from "@/actions/issues";
import { BarLoader } from "react-spinners";
import IssueCard from "./IssueCard";
import { toast } from "sonner";

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const SprintBoard = ({ sprints, projectId, orgId }) => {
	const [currentSprint, setCurrentSprint] = useState(
		sprints.find((sprint) => sprint.status === "ACTIVE") || sprints[0]
	);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(null);

	const handleAddIssue = (status) => {
		setSelectedStatus(status);
		setIsDrawerOpen(true);
	};

	const {
		loading: issuesLoading,
		error: issuesError,
		fn: fetchIssues,
		data: issues,
		setdata: setIssues,
	} = useFetch(getIssuesForSprint);

	useEffect(() => {
		if (currentSprint.id) {
			fetchIssues(currentSprint.id);
			setFilteredIssues(issues);
			console.log(issues, filteredIssues);
		}
	}, [currentSprint.id]);

	const [filteredIssues, setFilteredIssues] = useState(issues);

	const handleIssueCreated = () => {
		fetchIssues(currentSprint.id);
		setFilteredIssues(issues);
	};
	const onDragEnd = async (result) => {
		if (currentSprint.status === "PLANNED") {
			toast.warning("Start the sprint to move issues.");
		}
		if (currentSprint.status === "COMPLETED") {
			toast.warning("Sprint is completed, you can't move issues.");
		}
		const { destination, source } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const newOrderedData = [...issues];
		const sourceList = newOrderedData.filter(
			(list) => list.status === source.droppableId
		);
		const destinationList = newOrderedData.filter(
			(list) => list.status === destination.droppableId
		);

		if (source.droppableId === destination.droppableId) {
			const reorderedCards = reorder(
				sourceList,
				source.index,
				destination.index
			);
			reorderedCards.forEach((card, index) => {
				card.order = index;
			});

			const sortedIssues = newOrderedData.sort(
				(a, b) => a.order - b.order
			);
			setIssues(sortedIssues);
		}
	};

	if (issuesError) return <div>Error loading issues.</div>;

	return (
		<div>
			<SprintManager
				sprint={currentSprint}
				setSprint={setCurrentSprint}
				sprints={sprints}
				projectId={projectId}
			/>

			{issuesLoading && (
				<BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
			)}

			<DragDropContext onDragEnd={onDragEnd}>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-slate-900 p-4">
					{statuses.map((column) => {
						return (
							<Droppable
								key={column.key}
								droppableId={column.key}
							>
								{(provided) => {
									return (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											className="space-y-2"
										>
											<h3 className="font-semibold mb-2 text-center">
												{column.name}
											</h3>

											{/* Issues */}
											{issues
												?.filter(
													(issue) =>
														issue.status ===
														column.key
												)
												?.map((issue, index) => {
													return (
														<Draggable
															key={issue.id}
															draggableId={
																issue.id
															}
															index={index}
														>
															{(provided) => {
																return (
																	<div
																		ref={
																			provided.innerRef
																		}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																	>
																		<IssueCard
																			issue={
																				issue
																			}
																		/>
																	</div>
																);
															}}
														</Draggable>
													);
												})}

											{provided.placeholder}
											{column.key === "TODO" && (
												<Button
													variant="ghost"
													className="w-full"
													onClick={() =>
														handleAddIssue(
															column.key
														)
													}
												>
													<Plus className="h-4 w-4" />
													Create Issue
												</Button>
											)}
										</div>
									);
								}}
							</Droppable>
						);
					})}
				</div>
			</DragDropContext>
			<IssueCreationDrawer
				isOpen={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				sprintId={currentSprint.id}
				status={selectedStatus}
				projectId={projectId}
				onIssueCreated={handleIssueCreated}
				orgId={orgId}
			/>
		</div>
	);
};

export default SprintBoard;
