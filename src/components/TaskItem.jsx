import { motion } from 'framer-motion';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      className={`task ${task.completed ? 'done' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span onClick={() => onToggle(task.id)}>
        [{task.completed ? '✔' : '❌'}] {task.text} ({task.category})
      </span>
      <button onClick={() => onDelete(task.id)}>🗑</button>
    </motion.div>
  );
};
