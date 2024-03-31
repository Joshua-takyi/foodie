import { CalendarIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

export function HoverCardDemo(props) {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button
					variant="link"
					style={{ width: "200px" }}
					className="bg-secondary text-primary"
				>
					{props.identify}
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex justify-between space-x-4">
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">{props.title}</h4>
						<p className="text-sm">{props.note}</p>
						<div className="flex items-center pt-2">
							<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
							<span className="text-xs text-muted-foreground">
								{props.date}
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
