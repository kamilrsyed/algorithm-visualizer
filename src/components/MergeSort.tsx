import { motion } from "motion/react";
import type { AlgoComponentProps } from "../interfaces/AlgoComponentProps";

function MergeSort({ items, maxVal, maxHeight }: AlgoComponentProps) {
    return (
        <section className="w-full flex items-end justify-center gap-1 grow">
            {
                items.map((item) => {
                    const barHeight = maxVal > 0 ? (item.value / maxVal) * maxHeight : 0;
                    const translateY = item.divideLevel * 20; // Adjust vertical position based on divide level
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
                                initial={{ height: 0, translateY: 0 }}
                                animate={{
                                    height: barHeight,
                                    translateY: translateY,
                                    backgroundColor: item.sorted ? "#82C47E" : item.inComparison ? "#FFB200" : "#E8E8E8",
                                    borderColor: item.sorted ? "#468F42" : item.inComparison ? "#A37200" : "#5C5C5C",
                                }}
                                transition={{
                                    height: { duration: 0 },
                                    translateY: { duration: 0.3 },
                                    backgroundColor: { duration: 0.15 },
                                }}
                            />
                            <span className="text-[10px]">{item.value}</span>
                        </motion.div>
                    );
                })
            }
        </section>
    );
}

export default MergeSort;