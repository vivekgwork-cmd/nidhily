import { motion, type Variants } from 'framer-motion';

interface AnimatedBrainProps {
	width?: number;
	className?: string;
}

const pathVariants: Variants = {
	hidden: { pathLength: 0, opacity: 0 },
	show: { pathLength: 1, opacity: 1, transition: { duration: 1.8, ease: [0.4, 0, 0.2, 1] } },
};

const sparkVariants: Variants = {
	hidden: { opacity: 0, scale: 0.6 },
	show: (i: number) => ({
		opacity: [0, 1, 0.4, 1],
		scale: [0.6, 1.3, 0.9, 1.15],
		transition: { duration: 2.2, repeat: Infinity, repeatDelay: 1.5, delay: 1.6 + i * 0.25, ease: 'easeInOut' },
	}),
};

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.15 } },
};

const folds = [
	'M100,20 C95,50 98,90 92,140',
	'M50,55 C60,50 70,60 65,70 C75,75 70,90 60,88',
	'M90,40 C100,35 110,45 105,55 C115,60 110,75 100,72',
	'M120,55 C130,50 140,60 135,72 C145,78 138,92 128,90',
	'M58,100 C68,98 80,105 76,115',
	'M100,95 C112,92 122,100 118,112',
];

const sparks: [number, number][] = [
	[65, 70],
	[105, 55],
	[135, 72],
	[78, 115],
	[118, 112],
];

export default function AnimatedBrain({ width = 200, className }: AnimatedBrainProps) {
	return (
		<motion.svg
			className={className}
			width={width}
			viewBox="0 0 200 160"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: '0px 0px -60px 0px' }}
		>
			<defs>
				<linearGradient id="brainStrokeFM" x1="10" y1="10" x2="190" y2="150" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stopColor="#e34989" />
					<stop offset="55%" stopColor="#ffadc6" />
					<stop offset="100%" stopColor="#a98360" />
				</linearGradient>
			</defs>

			<motion.path
				d="M100,20 C70,10 40,25 30,50 C15,55 10,75 20,90 C15,100 20,115 35,120 C35,135 55,145 75,140 C85,150 105,150 115,140 C130,145 150,135 150,115 C165,105 165,85 155,72 C165,60 160,40 145,32 C140,15 115,12 100,20 Z"
				stroke="url(#brainStrokeFM)"
				strokeWidth={2.5}
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={pathVariants}
			/>

			{folds.map((d) => (
				<motion.path
					key={d}
					d={d}
					stroke="url(#brainStrokeFM)"
					strokeWidth={1.6}
					strokeLinecap="round"
					opacity={0.85}
					variants={pathVariants}
				/>
			))}

			{sparks.map(([cx, cy], i) => (
				<motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.4} fill="#e34989" custom={i} variants={sparkVariants} />
			))}
		</motion.svg>
	);
}
