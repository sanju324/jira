"use client";
import OrgSwitcher from "@/components/org-switcher";
import { projectSchema } from "@/lib/validators";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { CreateProject } from "@/actions/projects";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
	const { isLoaded: isOrgLoaded, membership } = useOrganization();
	const { isLoaded: isUserLoaded } = useUser();
	const [isAdmin, setIsAdmin] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(projectSchema),
	});

	useEffect(() => {
		if (isOrgLoaded && isUserLoaded && membership) {
			setIsAdmin(membership.role === "org:admin");
		}
	}, [isOrgLoaded, isUserLoaded, membership]);

	const {
		data: project,
		loading,
		error,
		fn: createProjectFn,
	} = useFetch(CreateProject);

	const onSubmit = async (data) => {
		createProjectFn(data);
	};
	useEffect(() => {
		if (project) {
			toast.success("Project created successfully");
			router.push(`/project/${project.id}`);
		}
	}, [loading]);

	if (!isOrgLoaded || !isUserLoaded) {
		return null;
	}

	if (!isAdmin) {
        return (
            <div className="flex flex-col gap-2 items-center">
                <span className="text-2xl light-gradient-title">
                    Oops! Only admins can create projects
                </span>
                <OrgSwitcher />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-6xl text-center font-bold mb-8 light-gradient-title">
                Create Project
            </h1>
            <form
                className="flex flex-col space-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <Input
                        id="name"
                        className="bg-white text-black"
                        placeholder="Project Name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </span>
                    )}
                </div>
                <div>
                    <Input
                        id="key"
                        className="bg-white text-black"
                        placeholder="Project Key"
                        {...register("key")}
                    />
                    {errors.key && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.key.message}
                        </span>
                    )}
                </div>
                <div>
                    <Textarea
                        id="description"
                        className="bg-white text-black h-28"
                        placeholder="Project Description"
                        {...register("description")}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </span>
                    )}
                </div>
                <div>
                    <Button
                        disabled={loading}
                        type="submit"
                        size="lg"
                        className="bg-blue-500 text-white"
                    >
                        {loading ? "Creating..." : "Create Project"}
                    </Button>
                    {error && (
                        <p className="text-red-500 mt-2">{error.message}</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Page;