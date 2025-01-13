import { z } from "zod";

export const projectSchema = z.object({
	name: z
		.string()
		.min(1, "Project Name is required")
		.max(100, "Project Name is too long"),
	key: z
		.string()
		.min(1, "Project Key is required")
		.max(10, "Project Key is too long"),
	description: z
		.string()
		.max(500, "Project Description is too long")
		.optional(),
});

export const sprintSchema = z.object({
	name: z
		.string()
		.min(1, "Sprint Name is required")
		.max(100, "Sprint Name is too long"),
	startDate: z.date(),
	endDate: z.date(),
});

export const issueSchema = z.object({
	title: z
		.string()
		.min(1, "Issue Title is required")
		.max(100, "Issue Title is too long"),
	assigneeId: z.string("Please Select Assignee"),
	description: z.string().optional(),
	priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});
