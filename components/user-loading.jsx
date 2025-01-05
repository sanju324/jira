"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
const UserLoading = () => {
	const user = useUser();
	const organization = useOrganization();

	if (!user.isLoaded || !organization.isLoaded) {
		return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
	} else <></>;
};

export default UserLoading;
