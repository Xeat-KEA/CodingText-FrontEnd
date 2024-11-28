import { motion } from "framer-motion";

export default function LoadingAnimation() {
  const variants = {
    initial: { y: 0 },
    animate: { y: [0, -10, 0] },
  };
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className="flex gap-2"
    >
      <motion.div
        variants={variants}
        transition={{ repeat: Infinity, repeatDelay: 1, duration: 0.5 }}
        className="w-2 h-2 rounded-full bg-primary-1"
      />
      <motion.div
        variants={variants}
        transition={{
          repeat: Infinity,
          repeatDelay: 1,
          duration: 0.5,
          delay: 0.15,
        }}
        className="w-2 h-2 rounded-full bg-primary-1"
      />
      <motion.div
        variants={variants}
        transition={{
          repeat: Infinity,
          repeatDelay: 1,
          duration: 0.5,
          delay: 0.3,
        }}
        className="w-2 h-2 rounded-full bg-primary-1"
      />
    </motion.div>
  );
}
