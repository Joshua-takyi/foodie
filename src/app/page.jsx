"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/container/container";
import Image from "next/image";
import { AlertDemo } from "@/components/container/alert";
import { HoverCardDemo } from "@/components/container/hovercard";
import { DrawerDemo } from "@/components/container/drawer";
import Loading from "./loading";
import { FaceIcon } from "@radix-ui/react-icons";
import Footer from "@/components/page";
export const revalidate = 0;

export default function Home() {
	const [meal, setMeal] = useState(null);
	const [update, setUpdate] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const dataFetch = async () => {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		try {
			let dat = await fetch(
				`https://www.themealdb.com/api/json/v1/1/search.php?s=${update}
					`
			);
			let res = await dat.json();
			if (res && res.meals && res.meals.length === 0) {
				console.log("no meals found");
				alert("Sorry, meal not found!");
			} else {
				setMeal(res);
			}
		} catch (error) {
			console.error("Fetch error types:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (event) => {
		setUpdate(event.target.value);
	};
	const execute = () => {
		dataFetch();
	};

	return (
		<>
			<nav className="border-b-2 shadow-md flex flex-col lg:flex-row lg:justify-between items-center sticky top-0 backdrop-blur-md z-50 p-3 lg:px-5 w-full lg:w-screen mt-3 justify-center">
				<header className="hidden lg:flex">
					<FaceIcon className="size-14" />
				</header>
				<div className="letter tracking-wider hidden text-2xl animate-bounce text-balance font-bold text-center p-2 lg:flex">
					<h2>Search for Dish</h2>
				</div>
				<div className="logo flex w-full max-w-sm items-center lg:max-w-none lg:w-auto space-x-3">
					<Input type="text" placeholder="search" onChange={handleChange} />
					<Button onClick={execute} className="py-2">
						search
					</Button>
				</div>
			</nav>
			<main className="flex flex-col items-center">
				{isLoading && <Loading />}
				{meal &&
					meal?.meals &&
					meal?.meals?.map((e) => (
						<div
							className="lg:mx-10 p-3 flex flex-col lg:space-x-7 lg:flex-row items-center lg:justify-center"
							key={e.idMeal}
						>
							<div className="lg:w-1/2 p-2 justify-center items-center">
								<Image
									src={e.strMealThumb}
									width={300}
									height={300}
									priority={true}
									alt={e.strMeal}
									className="w-full h-full lg:w-[380] lg:h-[380]"
								/>
							</div>
							<div
								className="lg:w-1/2 flex flex-col justify-center items-center"
								key={e.idMeal}
							>
								<h1 className="lg:text-8xl font-semibold text-3xl lg:tracking-wide p-2 lg:min-h-40">
									{e.strMeal}
								</h1>
								<div className="flex flex-col lg:flex-row list-none lg:p-4 p-2 space-y-2 lg:space-y-0">
									<div className="flex-grow p-2">
										<div>
											<HoverCardDemo
												identify="category"
												title={e.strCategory}
												note={e.strTags}
												date={`joined in ${new Date().toLocaleDateString()}`}
											/>
										</div>
									</div>
									<div className="flex-grow p-2">
										<Button
											className="w-full"
											variant="destructive"
											style={{ maxWidth: "170px", margin: "0 auto" }}
										>
											<Link
												href="https://www.youtube.com/watch?v=Mt5lgUZRoUg"
												target="_blank"
												rel="noopener noreferrer"
											>
												YouTube
											</Link>
										</Button>
									</div>
								</div>
								<div className="my-3">
									<AlertDemo
										head="youtube Link isn't working at the moment"
										text="Apologies for the broken link inconvenience caused."
										style={{ maxWidth: "100%" }}
									/>
								</div>
								<div className="mx-3">
									<DrawerDemo
										goal="let's Cook"
										activity="ingredients"
										method={`${e.strInstructions}`}
									/>
								</div>
							</div>
						</div>
					))}
			</main>
			{meal && meal?.meals ? <Footer /> : false}
		</>
	);
}
