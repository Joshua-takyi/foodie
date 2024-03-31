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
		<Container>
			<nav
				className="border-b-2 shadow-md flex flex-row justify-between items-center sticky top-0 backdrop-blur-xl
			z-50 p-3"
			>
				<header>
					<FaceIcon className="size-14" />
				</header>
				<div className="letter tracking-wider text-2xl  animate-bounce	text-balance font-bold text-center p-2 ">
					<h2>Search for Dish</h2>
				</div>
				<div className="logo">
					<div className="flex w-full max-w-sm items-center space-x-2">
						<Input type="text" placeholder="search" onChange={handleChange} />
						<Button onClick={execute}>search</Button>
					</div>
				</div>
			</nav>
			<Container>
				<div>
					{isLoading && <Loading />}
					{meal &&
						meal?.meals &&
						meal?.meals?.map((e) => (
							<div
								className="mx-10 p-3 flex flex-col space-x-3 lg:flex-row"
								key={e.idMeal}
							>
								<div className="lg:w-1/2 p-2 flex justify-center items-center">
									<Image
										src={e.strMealThumb}
										width={400}
										height={300}
										priority={true}
										alt={e.strMeal}
									/>
								</div>
								<div
									className="lg:w-1/2 flex flex-col justify-center"
									key={e.idMeal}
								>
									<h1 className="lg:text-7xl font-semibold text-4xl tracking-wide p-2 min-h-40">
										{e.strMeal}
									</h1>
									<div
										className="flex flex-row list-none p-4 space-x-5 text-center font-semibold tracking-wide"
										style={{ width: "500px" }}
									>
										<div className="p-2 text-left">
											<div style={{ width: "200px" }}>
												<HoverCardDemo
													identify="category"
													title={e.strCategory}
													note={e.strTags}
													date={`joined in ${new Date().toLocaleDateString()}`}
												/>
											</div>
										</div>

										<div className="p-2 " style={{ width: "200px" }}>
											<Button
												className="p-2"
												variant="destructive"
												style={{ width: "170px" }}
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
									<div className="my-3  ">
										<AlertDemo
											head="youtube Link isn't working at the moment"
											text="Apologies for the broken link inconvenience caused."
											style={{ maxWidth: "100%" }}
										/>
									</div>
									<div className="mx-3 ">
										<DrawerDemo
											goal="let's Cook"
											activity="ingredients"
											method={`${e.strInstructions}`}
										/>
									</div>
								</div>
							</div>
						))}
				</div>
			</Container>
			{meal && meal?.meals ? <Footer /> : false}
		</Container>
	);
}
