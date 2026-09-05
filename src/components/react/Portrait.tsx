import { motion } from 'framer-motion';

interface PortraitProps {
	src: string;
	width: number;
	height: number;
	alt: string;
}

export default function Portrait({ src, width, height, alt }: PortraitProps) {
	return (
		<motion.div
			className="portrait-entrance"
			initial={{ opacity: 0, y: 20, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
		>
			<motion.div
				className="portrait-float"
				animate={{ y: [0, -10, 0] }}
				transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
			>
				<div className="portrait-aura" aria-hidden="true"></div>
				<img className="portrait-img" src={src} width={width} height={height} alt={alt} />
			</motion.div>
		</motion.div>
	);
}
