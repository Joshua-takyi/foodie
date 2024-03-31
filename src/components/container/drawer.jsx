import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerDemo(props) {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					variant="outline"
					style={{ width: "100%", paddingBottom: "1px" }}
				>
					Open Drawer
				</Button>
			</DrawerTrigger>
			<DrawerContent style={{ maxHeight: "fit-content" }}>
				<div
					className="mx-auto w-full max-w-2xl "
					style={{ maxHeight: "100%", minHeight: "20%" }}
				>
					<DrawerHeader>
						<DrawerTitle style={{ paddingBottom: "10px" }}>
							{props.goal}
						</DrawerTitle>
						<DrawerDescription>{props.activity}</DrawerDescription>
						<DrawerDescription>{props.method}</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button
								variant="outline"
								style={{ maxHeight: "100%", padding: "5px" }}
							>
								Close
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
