"use server";
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function CreateProject(data) {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		throw new Error("User ID or Organization ID is missing");
	}

	const { data: memberships } =
		await clerkClient().organizations.getOrganizationMembershipList({
			organizationId: orgId,
		});

	const userMembership = memberships.find(
		(m) => m.publicUserData.userId === userId
	);

	if (!userMembership || userMembership.role !== "org:admin") {
		throw new Error("User is not an admin of the organization");
	}

	try {
		const project = await db.project.create({
			data: {
				name: data.name,
				key: data.key,
				description: data.description,
				organizationId: orgId,
			},
		});

		return JSON.parse(JSON.stringify(project));
	} catch (error) {
		throw new Error("Failed to create project" + error.message);
	}
}

export async function GetProjects(orgId) {
	const { userId } = auth();

	if (!orgId) {
		throw new Error("Organization ID is missing");
	}
	if (!userId) {
		throw new Error("User ID is missing");
	}

	const user = await db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});

	if (!user) {
		throw new Error("User not found");
	}

	const projects = await db.project.findMany({
		where: {
			organizationId: orgId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return JSON.parse(JSON.stringify(projects));
}

export async function deleteProject(projectId) {
	const { userId, orgId, orgRole } = auth();

	if (!userId || !orgId) {
		throw new Error("User ID or Organization ID is missing");
	}

	if (orgRole !== "org:admin") {
		throw new Error("User is not an admin of the organization");
	}

	const project = await db.project.findUnique({
		where: {
			id: projectId,
		},
	});

	if (!project || project.organizationId !== orgId) {
		throw new Error(
			"Project not found Or Project does not belong to the organization"
		);
	}

	try {
		await db.project.delete({
			where: {
				id: projectId,
			},
		});

		return { success: true };
	} catch (error) {
		throw new Error("Failed to delete project" + error.message);
	}
}

export async function getProject(projectId) {
	const { userId, orgId } = auth();

	if (!userId) {
		throw new Error("User ID is missing");
	}
	if (!orgId) {
		throw new Error("Organization ID is missing");
	}

	const user = await db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});

	if (!user) {
		throw new Error("User not found");
	}

	const project = await db.project.findUnique({
		where: {
			id: projectId,
		},
		include: {
			sprints: {
				orderBy: {
					createdAt: "desc",
				},
			},
		},
	});

	if (!project) {
		return null;
	}

	if (project.organizationId !== orgId) {
		return null;
	}

	return JSON.parse(JSON.stringify(project));
}
