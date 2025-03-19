"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IssueCard from "@/app/(main)/project/_components/IssueCard";
import { getUserIssues } from "@/actions/issues";

const UserIssues = async ({ userId }) => {
	const issues = await getUserIssues(userId);

	if (issues.length === 0) {
		return null;
	}

	const assignedIssues = issues.filter(
		(issue) => issue.assignee.clerkUserId === userId
	);
	const reportedIssues = issues.filter(
		(issue) => issue.reporter.clerkUserId === userId
	);
	return (
		<>
			<h1 className="text-4xl font-bold light-gradient-title mb-4">
				My Issues
			</h1>
			<Tabs defaultValue="assigned" className="w-full">
				<TabsList>
					<TabsTrigger value="assigned">Assigned To You</TabsTrigger>
					<TabsTrigger value="reported">Reported By You</TabsTrigger>
				</TabsList>
				<TabsContent value="assigned">
					<IssueGrid issues={assignedIssues} />
				</TabsContent>
				<TabsContent value="reported">
					<IssueGrid issues={reportedIssues} />
				</TabsContent>
			</Tabs>
		</>
	);
};

function IssueGrid({ issues }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{issues.map((issue) => (
				<IssueCard key={issue.id} issue={issue} showStatus />
			))}
		</div>
	);
}

export default UserIssues;
