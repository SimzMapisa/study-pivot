import { motion } from 'framer-motion';

function Stat({ value, label }: { value: string; label: string }) {
	return (
		<motion.div
			className='text-center'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.7 }}>
			<div className='text-2xl font-bold text-gray-800 mb-1'>{value}</div>
			<div className='text-sm text-gray-600'>{label}</div>
		</motion.div>
	);
}
export default Stat;
