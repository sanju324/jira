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
	return JSON.parse(JSON.stringify(issue));
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
	return JSON.parse(JSON.stringify(issues));
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

export async function deleteIssue(issueId) {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		throw new Error("Unauthorized");
	}

	const user = await db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});
	if (!user) {
		throw new Error("User not found");
	}

	const issue = await db.issue.findUnique({
		where: {
			id: issueId,
		},
		include: {
			project: true,
		},
	});

	if (!issue) {
		throw new Error("Issue not found");
	}

	if (
		issue.reporterId !== user.id &&
		!issue.project.adminIds.includes(user.id)
	) {
		throw new Error("You dont have permissions to delete this issue.");
	}

	await db.issue.delete({
		where: {
			id: issueId,
		},
	});

	return { success: true };
}

export async function updateIssue(issueId, data) {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		throw new Error("Unauthorized");
	}

	const user = await db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});
	if (!user) {
		throw new Error("User not found");
	}

	const issue = await db.issue.findUnique({
		where: {
			id: issueId,
		},
		include: {
			project: true,
		},
	});

	if (!issue) {
		throw new Error("Issue not found");
	}

	if (
		issue.reporterId !== user.id &&
		!issue.project.adminIds.includes(user.id)
	) {
		throw new Error("You dont have permissions to update this issue.");
	}

	try {
		const updatedIssue = await db.issue.update({
			where: {
				id: issueId,
			},
			data: {
				status: data.status,
				priority: data.priority,
			},
			include: {
				assignee: true,
				reporter: true,
			},
		});

		return JSON.parse(JSON.stringify(updatedIssue));
	} catch (error) {
		throw new Error("Something went wrong : ", error);
	}
}

export async function getUserIssues(userId) {
	/* @next-codemod-ignore */
	const { orgId } = auth();
	if (!userId || !orgId) {
		throw new Error("Unauthorized");
	}

	const user = await db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});

	if (!user) {
		throw new Error("User not found");
	}

	const issues = await db.issue.findMany({
		where: {
			OR: [
				{
					reporterId: user.id,
				},
				{
					assigneeId: user.id,
				},
			],
		},
		include: {
			project: true,
			assignee: true,
			reporter: true,
		},
		orderBy: { updatedAt: "desc" },
	});

	return JSON.parse(JSON.stringify(issues));
}
