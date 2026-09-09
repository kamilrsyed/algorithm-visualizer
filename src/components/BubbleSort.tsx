import { motion } from "motion/react";
import type { AlgoComponentProps } from "../interfaces/AlgoComponentProps";

function BubbleSort({ items, maxVal, maxHeight }: AlgoComponentProps) {
    return (
        <section className="w-full flex items-end justify-center gap-1 grow">
            {
                items.map((item) => {
                    const barHeight = maxVal > 0 ? (item.value / maxVal) * maxHeight : 0;
                    return (
                        <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 1000, damping: 40 }}
                            className="flex flex-col flex-1 min-w-0"
                            key={item.id}
                            style={{ maxWidth: 24 }}
                        >
                            <motion.div
                                className="w-full border rounded"
                                initial={{ height: 0 }}
                                animate={{
                                    height: barHeight,
                                    backgroundColor: item.sorted ? "#82C47E" : item.inComparison ? "#60a5fa" : "#E8E8E8",
                                    borderColor: item.sorted ? "#468F42" : item.inComparison ? "#3b82f6" : "#5C5C5C",
                                }}
                                transition={{ height: { duration: 0 }, backgroundColor: { duration: 0.15 } }}
                            />
                            <span className="text-[10px]">{item.value}</span>
                        </motion.div>
                    );
                })
            }
        </section>
    )
}

export default BubbleSort;