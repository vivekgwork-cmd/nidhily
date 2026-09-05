import { motion, type Variants } from 'framer-motion';

export interface PostListItem {
	href: string;
	title: string;
	date: string;
	thumb?: string;
}

interface PostListProps {
	posts: PostListItem[];
	compact?: boolean;
}

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function PostList({ posts, compact = false }: PostListProps) {
	return (
		<motion.ul
			className={`post-list${compact ? ' post-list--compact' : ''}`}
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: '0px 0px -60px 0px' }}
		>
			{posts.map((post) => (
				<motion.li key={post.href} variants={item} whileHover={{ x: compact ? 0 : 0, y: -3 }}>
					<a className="post-list-link" href={post.href}>
						{post.thumb && (
							<span className="post-thumb">
								<img src={post.thumb} alt="" />
							</span>
						)}
						<span className="post-entry">
							<span className="post-title">{post.title}</span>
							<span className="post-date">{post.date}</span>
						</span>
					</a>
				</motion.li>
			))}
		</motion.ul>
	);
}
