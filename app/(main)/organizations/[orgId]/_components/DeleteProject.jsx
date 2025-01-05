"use client";
import { CreateProject, deleteProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { useOrganization } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { toast } from "sonner";

const DeleteProject = ({ projectId }) => {
	const { membership } = useOrganization();
	const router = useRouter();

	const {
		data: deleted,
		loading: isDeleting,
		error,
		fn: deleteProjectFn,
	} = useFetch(deleteProject);

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this project?")) {
			deleteProjectFn(projectId);
		}
	};

	useEffect(() => {
		if (deleted?.success) {
			toast.error("Project deleted successfully");
			router.refresh();
		}
	}, [deleted]);

	const isAdmin = membership?.role === "org:admin";

	if (!isAdmin) return null;

	return (
		<div>
			<Button variant="ghost" onClick={handleDelete}>
				<Trash2 className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default DeleteProject;
