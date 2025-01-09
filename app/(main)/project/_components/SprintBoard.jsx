"use client";
import React from "react";
import { useState } from "react";
import SprintManager from "./SprintManager";

const SprintBoard = ({ sprints, projectId, orgId }) => {
	const [currentSprint, setCurrentSprint] = useState(
		sprints.find((sprint) => sprint.status === "ACTIVE") || sprints[0]
	);
	return (
		<div>
			<SprintManager
				sprint={currentSprint}
				setSprint={setCurrentSprint}
				sprints={sprints}
				projectId={projectId}
			/>
		</div>
	);
};

export default SprintBoard;
