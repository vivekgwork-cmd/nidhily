import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
	children: ReactNode;
	delay?: number;
	y?: number;
	as?: 'div' | 'section' | 'li';
	className?: string;
}

export default function Reveal({ children, delay = 0, y = 24, as = 'div', className }: RevealProps) {
	const MotionTag = motion[as];
	return (
		<MotionTag
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '0px 0px -80px 0px' }}
			transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
		>
			{children}
		</MotionTag>
	);
}
