import { GetProjects } from "@/actions/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteProject from "./DeleteProject";

export default async function ProjectList({ orgId }) {
	const projects = await GetProjects(orgId);

	if (projects.length === 0) {
		return (
			<div>
				No projects found.
				<Link
					href="/project/create"
					className="underline underline-offset-2 text-blue-200"
				>
					Create New
				</Link>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{projects.map((project) => (
				<Card key={project.id}>
					<CardHeader>
						<CardTitle className="flex justify-between items-center">
							{project.name}
							<DeleteProject projectId={project.id} />
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{project.description}</p>
						<Link
							className="text-blue-500 hover:underline"
							href={`/project/${project.id}`}
						>
							View Project
						</Link>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
