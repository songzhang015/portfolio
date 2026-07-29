import type { ReactNode } from "react";

interface NavButtonProps {
	children: ReactNode;
	onClick: () => void;
}

export function NavButton({ children, onClick }: NavButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="group relative cursor-pointer transition-colors duration-300 text-gray hover:text-white"
		>
			<span>{children}</span>
			<span
				className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left
				scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"
			/>
		</button>
	);
}
