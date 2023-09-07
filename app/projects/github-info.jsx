import { EyeIcon, DependabotIcon } from '@primer/octicons-react';
import { getTrafficPageViews, getDependabotAlerts } from "../data";

export async function GitHubInfo({ githubUsername, project}) {

	const [{ todayUniques, sumUniques } = {}, openAlertsBySeverity] = await Promise.all([
		getTrafficPageViews(githubUsername, project),
		getDependabotAlerts(githubUsername, project)
	]);

	const alertColor = openAlertsBySeverity.critical > 0 ? "red" : openAlertsBySeverity.high > 0 ? "orange" : openAlertsBySeverity.medium > 0 ? "yellow" : openAlertsBySeverity.low > 0 ? "blue" : "gray";
	const alertCountTotal = (openAlertsBySeverity.critical || 0) + (openAlertsBySeverity.high || 0) + (openAlertsBySeverity.medium || 0) + (openAlertsBySeverity.low || 0);
	const alertTitle = alertCountTotal > 0 ? `Open Dependabot alerts: ` + (JSON.stringify(openAlertsBySeverity)) : "No open Dependabot alerts.";
	
	const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

	return <span className={`text-zinc-500 text-xs align-middle flex items-center gap-1 ${shimmer}`}>
		<span title="Unique repository visitors: Last 14 days / Today.">
			<EyeIcon className="w-4 h-4" />{" "}
			{Intl.NumberFormat("en-US", { notation: "compact" }).format(sumUniques)}/{Intl.NumberFormat("en-US", { notation: "compact" }).format(todayUniques)}
		</span>
		{" "}
		<span title={alertTitle}>
            <DependabotIcon className="w-4 h-4 danger" fill={alertColor} />{" "}            
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(alertCountTotal)}
        </span>
	</span>;
}

