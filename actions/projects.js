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

		return project;
	} catch (error) {
		throw new Error("Failed to create project" + error.message);
	}
}
