import { getOrganisation } from "@/actions/organisations";
import OrgSwitcher from "@/components/org-switcher";
import ProjectList from "./_components/ProjectList";

const page = async ({ params }) => {
	const { orgId } = await params;
	const organisation = await getOrganisation(orgId);

	if (!organisation) {
		return <div>Organisation not found</div>;
	}

	return (
		<div className="container mx-auto px-4">
			<div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
				<h1 className="text-5xl font-bold gradient-title pb-2">
					{organisation.name}&rsquo;s Projects
				</h1>
				{/* org switcher */}
				<OrgSwitcher />
			</div>
			<div classname="mb-4">
				<ProjectList orgId={organisation.id} />
			</div>
			<div classname="mt-8">
				Show user assigned and reported issues here
			</div>
		</div>
	);
};

export default page;
