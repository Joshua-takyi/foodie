import { ProgressDemo } from "@/components/container/progress";

export default function Loading({ children }) {
	return (
		<div className="flex min-h-screen justify-center items-center">
			<ProgressDemo value={1}>{children}</ProgressDemo>
		</div>
	);
}
