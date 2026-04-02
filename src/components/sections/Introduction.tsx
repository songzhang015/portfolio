"use client";

import { motion } from "framer-motion";
import { useLoading } from "../others/LoadingContext";

const itemVariants = {
	initial: { x: -32, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as never },
	},
};

export default function Introduction() {
	const isLoading = useLoading();

	return (
		<div className="flex justify-center items-center h-screen">
			<motion.div
				className="flex flex-col w-full max-w-5xl gap-4"
				variants={{
					initial: {},
					visible: {
						transition: {
							delay: 1,
							staggerChildren: 0.2,
							delayChildren: 1,
						},
					},
				}}
				initial="initial"
				animate={isLoading ? "initial" : "visible"}
			>
				<motion.div variants={itemVariants} className="text-lg text-sky-blue">
					Hi, I&apos;m
				</motion.div>

				<motion.div variants={itemVariants} className="text-6xl font-bold">
					Song Zhang
				</motion.div>

				<motion.div variants={itemVariants} className="text-2xl text-gray-400">
					A software engineer attending the University of Oregon.
				</motion.div>

				<motion.div variants={itemVariants} className="text-2xl text-gray-400">
					Feel free to reach out at any time!
				</motion.div>

				<motion.button
					variants={itemVariants}
					className="text-lg border border-sky-blue text-sky-blue mt-1 self-start px-6 py-3 cursor-pointer rounded-lg"
				>
					Say Hello
				</motion.button>
			</motion.div>
		</div>
	);
}
