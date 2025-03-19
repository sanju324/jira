"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganisation(slug) {
	const { userId, getToken } = auth();

	const token = await getToken();
	console.log("token : ", token);

	if (!userId) {
		return { status: 401, body: { message: "Unauthorized" } };
	}

	const user = db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});

	if (!user) {
		return { status: 404, body: { message: "User not found" } };
	}

	const organisation = await clerkClient().organizations.getOrganization({
		slug,
	});

	if (!organisation) {
		return null;
	}

	const { data: memberships } =
		await clerkClient().organizations.getOrganizationMembershipList({
			organizationId: organisation.id,
		});

	const userMembership = memberships.find((m) => m.userId === user.id);

	if (!userMembership) {
		return null;
	}

	return JSON.parse(JSON.stringify(organisation));
}

export async function getOrganisationUsers(orgId) {
	const { userId } = auth();
	if (!userId) {
		return { status: 401, body: { message: "Unauthorized" } };
	}

	const user = db.user.findUnique({
		where: {
			clerkUserId: userId,
		},
	});

	if (!user) {
		return { status: 404, body: { message: "User not found" } };
	}

	const organisationMemberships =
		await clerkClient().organizations.getOrganizationMembershipList({
			organizationId: orgId,
		});

	const userIds = organisationMemberships.data.map(
		(m) => m.publicUserData.userId
	);

	const users = await db.user.findMany({
		where: {
			clerkUserId: {
				in: userIds,
			},
		},
	});

	return JSON.parse(JSON.stringify(users));
}
