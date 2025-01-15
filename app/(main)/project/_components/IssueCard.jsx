import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import UserAvatar from "./UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import IssueDetailsDialog from "./IssueDetailsDialog";

const priorityColor = {
	LOW: "border-green-600",
	MEDIUM: "border-yellow-300",
	HIGH: "border-orange-400",
	URGENT: "border-red-400",
};
const IssueCard = ({
	issue,
	showStatus = false,
	onDelete = () => {},
	onUpdate = () => {},
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const router = useRouter();

	const onDeleteHandler = async (...params) => {
		router.refresh();
		onDelete(...params);
	};

	const onUpdateHandler = async (...params) => {
		router.refresh();
		onUpdate(...params);
	};

	const created = formatDistanceToNow(new Date(issue.createdAt), {
		addSuffix: true,
	});
	return (
		<div>
			<Card
				onClick={() => setIsDialogOpen(true)}
				className="cursor-pointer hover:shadow-md transition-shadow"
			>
				<CardHeader
					className={`border-t-2 ${
						priorityColor[issue.priority]
					} rounded-lg`}
				>
					<CardTitle>{issue.title}</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-2 -mt-3">
					{showStatus && <Badge>{issue.status}</Badge>}
					<Badge variant="outline" className={"-ml-1"}>
						{issue.priority}
					</Badge>
				</CardContent>
				<CardFooter className="flex flex-col items-start space-y-3">
					<UserAvatar user={issue.assignee} />
					<div className="text-xs text-gray-400 w-full">
						Created {created}
					</div>
				</CardFooter>
			</Card>
			{isDialogOpen && (
				<IssueDetailsDialog
					isOpen={isDialogOpen}
					onClose={() => setIsDialogOpen(false)}
					issue={issue}
					onDelete={onDeleteHandler}
					onUpdate={onUpdateHandler}
					borderColor={priorityColor[issue.priority]}
				/>
			)}
		</div>
	);
};

export default IssueCard;
