"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createIssue(projectId, data) {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		throw new Error("Unauthorized");
	}

	let user = await db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});

	const lastIssue = await db.issue.findFirst({
		where: {
			projectId,
			status: data.status,
		},
		orderBy: {
			order: "desc",
		},
	});

	const newOrder = lastIssue ? lastIssue.order + 1 : 0;

	const issue = await db.issue.create({
		data: {
			title: data.title,
			description: data.description,
			status: data.status,
			priority: data.priority,
			projectId: projectId,
			sprintId: data.sprintId,
			order: newOrder,
			reporterId: user.id,
			assigneeId: data.assigneeId || null,
		},
		include: {
			assignee: true,
			reporter: true,
		},
	});
	return issue;
}

export async function getIssuesForSprint(sprintId) {
	const { userId, orgId } = auth();

	const issues = await db.issue.findMany({
		where: {
			sprintId,
		},
		include: {
			assignee: true,
			reporter: true,
		},
		orderBy: [
			{
				order: "asc",
			},
			{
				status: "asc",
			},
		],
	});
	return issues;
}

export async function updateIssuesOrder(updatedIssues) {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		throw new Error("Unauthorized");
	}

	await db.$transaction(async (prisma) => {
		for (const issue of updatedIssues) {
			await prisma.issue.update({
				where: {
					id: issue.id,
				},
				data: {
					order: issue.order,
					status: issue.status,
				},
			});
		}
	});

	return { success: true };
}
