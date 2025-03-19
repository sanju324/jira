import { getOrganisation } from "@/actions/organisations";
import OrgSwitcher from "@/components/org-switcher";
import ProjectList from "./_components/ProjectList";
import UserIssues from "./_components/UserIssues";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({ params }) => {
	const { orgId } = await params;
	const organisation = await getOrganisation(orgId);
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	if (!organisation) {
		return <div>Organisation not found</div>;
	}

	return (
		<div className="container mx-auto px-4 bg-white text-gray-900">
			<div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
				<h1 className="text-5xl font-bold light-gradient-title pb-2">
					{organisation.name}&rsquo;s Projects
				</h1>
				{/* org switcher */}
				<OrgSwitcher />
			</div>
			<div className="mb-4">
				<ProjectList orgId={organisation.id} />
			</div>
			<div className="mt-8">
				<UserIssues userId={userId} />
			</div>
		</div>
	);
};

export default Page;
