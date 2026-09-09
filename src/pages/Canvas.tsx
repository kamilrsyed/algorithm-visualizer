import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { AlgoOption } from "../interfaces/AlgoOption";
import type { Item } from "../types/types";
import { bubbleSort } from "../algorithms/BubbleSort";
import { componentMap } from "../constants/ComponentMap";
import BubbleSort from "../components/BubbleSort";
import type { AlgoComponentProps } from "../interfaces/AlgoComponentProps";
import SelectionSort from "../components/SelectionSort";
import { selectionSort } from "../algorithms/SelectionSort";


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
    const [swaps, setSwaps] = useState(0);
    const [compares, setCompares] = useState(0);
    const maxVal = Math.max(...items.map(i => i.value));
    const maxHeight = 450;
    const [Component, setComponent] = useState<React.ComponentType<AlgoComponentProps> | null>(null);

    useEffect(() => {
        const initialItems: Item[] = Array.from({ length: sampleValue }, (_, i) => ({ id: i + Date.now(), value: generateRandomNum(1, 50), inComparison: false, sorted: false, currentMin: false }));
        setItems(initialItems);
    }, [generateTrigger]);
    
    useEffect(() => {
        if (sortTrigger === 0) return;

        let cancelled = false;

        switch (selectedAlgorithm.code) {
            case Algorithms.Bubble:
                bubbleSort(items, setItems, setSwaps, setCompares, () => cancelled);
                setComponent(() => componentMap[selectedAlgorithm.code]);
                // console.log(items); 
                break;
            case Algorithms.Selection:
                selectionSort(items, setItems, () => cancelled);
                setComponent(() => componentMap[selectedAlgorithm.code]);
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
                <div className="w-full h-full flex flex-col items-center justify-around ">
                    <div className="flex w-full justify-evenly">
                        <p className="text-gray-700">Swaps: {swaps}</p>
                        <p className="text-gray-700">Compares: {compares}</p>
                    </div>
                    <div className="text-center w-full">
                        {Component ? (
                            <Component items={items} maxVal={maxVal} maxHeight={maxHeight} />
                        ) : (
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
                                    backgroundColor: "#E8E8E8",
                                    borderColor: "#5C5C5C",
                                }}
                                transition={{ height: { duration: 0 }, backgroundColor: { duration: 0.15 } }}
                            />
                            <span className="text-[10px]">{item.value}</span>
                        </motion.div>
                    );
                })
            }
        </section>
                        )}
                        {/* <section className="w-full flex items-end justify-center gap-1 grow">
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
                        </section> */}
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