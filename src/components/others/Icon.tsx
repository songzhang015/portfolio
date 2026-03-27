interface IconProps {
	label: string;
	icon: React.ReactNode;
	color: string;
}

export default function Icon({ label, icon, color }: IconProps) {
	return (
		<div>
			<div
				className="hover:text-[var(--hover-color)] transition-colors duration-300"
				style={{ "--hover-color": color } as React.CSSProperties}
			>
				{icon}
			</div>
			<div>{label}</div>
		</div>
	);
}
