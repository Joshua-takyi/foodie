import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDemo(props) {
	return (
		<Alert className="mx-2" variant="secondary">
			<RocketIcon className="h-4 w-4 " />
			<AlertTitle style={{ paddingBottom: "1px" }}>{props.head}</AlertTitle>
			<AlertDescription>{props.text}</AlertDescription>
		</Alert>
	);
}
