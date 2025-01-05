import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }) => {
	const { projectId } = params;
	const project = await getProject(projectId);
	if (!project) {
		notFound();
	}
	return <div>page</div>;
};

export default page;
