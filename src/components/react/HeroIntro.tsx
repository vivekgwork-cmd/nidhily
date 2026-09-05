import { motion } from 'framer-motion';

interface HeroIntroProps {
	title: string;
	tagline?: string;
}

const container = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.14, delayChildren: 0.1 },
	},
};

const item = {
	hidden: { opacity: 0, y: 22 },
	show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function HeroIntro({ title, tagline }: HeroIntroProps) {
	return (
		<motion.div variants={container} initial="hidden" animate="show">
			<motion.h1 className="gradient-text" variants={item}>
				{title}
			</motion.h1>
			{tagline && (
				<motion.p className="eyebrow" variants={item}>
					{tagline}
				</motion.p>
			)}
		</motion.div>
	);
}
