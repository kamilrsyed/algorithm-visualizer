import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { AlgoOption } from "../interfaces/AlgoOption";
import type { Item } from "../types/types";
import { bubbleSort } from "../algorithms/BubbleSort";


export const Algorithms = {
    Bubble: 'BUBBLE',
    Insertion: 'INSERTION',
    Selection: 'SELECTION'
  };

interface CanvasProps {
    sortTrigger: number;
    generateTrigger: number
    sampleValue: number;
    selectedAlgorithm: AlgoOption
}

function Canvas({ sortTrigger, sampleValue, generateTrigger, selectedAlgorithm }: CanvasProps) {
    const [items, setItems] = useState<Item[]>([]);
    
    const maxHeight = 450;
    const maxVal = Math.max(...items.map(i => i.value));

    useEffect(() => {
        const initialItems: Item[] = Array.from({ length: sampleValue }, (_, i) => ({ id: i + Date.now(), value: generateRandomNum(1, 50), compared: false }));
        setItems(initialItems);
    }, [generateTrigger]);
    
    useEffect(() => {
        if (sortTrigger === 0) return;

        let cancelled = false;

        switch (selectedAlgorithm.code) {
            case Algorithms.Bubble:
                console.log('bubble sort recieved in canvas')
                bubbleSort(items, setItems, () => cancelled);
                break;
        
            default:
                console.log('algo recieved in canvas: ', selectedAlgorithm.name);
                break;
        }

        return () => {
            cancelled = true;
        };
    }, [sortTrigger]);

    return (
        <>
            <main className="fixed top-16 left-64 right-0 bottom-0 overflow-auto bg-skin-bg text-skin-text p-4">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center w-full">
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
                                                    backgroundColor: item.compared ? "#60a5fa" : "#E8E8E8",
                                                    borderColor: item.compared ? "#3b82f6" : "#5C5C5C",
                                                }}
                                                transition={{ height: { duration: 0 }, backgroundColor: { duration: 0.15 } }}
                                            />
                                            <span className="text-[10px]">{item.value}</span>
                                        </motion.div>
                                    );
                                })
                            }
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

function generateRandomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Canvas