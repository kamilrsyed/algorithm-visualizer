import { useEffect, useState } from "react";

type Item = { id: number; value: number };

function Canvas() {
    const [items, setItems] = useState<Item[]>([]);
    const maxHeight = 450;
    const maxVal = Math.max(...items.map(i => i.value));
    
    useEffect(() => {
        let cancelled = false;
        const initialItems: Item[] = Array.from({ length: 50 }, (_, i) => ({ id: i + Date.now(), value: generateRandomNum(1, 50) }));
        setItems(initialItems);

        const run = async () => {
            await delay(600);
            if (cancelled) return;
            await bubbleSort(initialItems, setItems, () => cancelled);
        };

        run();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <>
            <main className="fixed top-16 left-64 right-0 bottom-0 overflow-auto bg-skin-bg text-skin-text p-4">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center w-full">
                        <section className="w-full flex items-end justify-center gap-2.5 grow">
                            {
                                
                                items.map((item) => {
                                    const barHeight = maxVal > 0 ? (item.value / maxVal) * maxHeight : 0;

                                    return (
                                        <div className="flex flex-col" key={item.id}>
                                            <div
                                                className="w-6 bg-blue-300 border border-blue-500 rounded"
                                                style={{ height: `${barHeight}px`, transition: 'height 80ms linear' }}
                                            />
                                            <span className="text-xs">{item.value}</span>
                                        </div>
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


async function bubbleSort(arr: Item[], setArr: React.Dispatch<React.SetStateAction<Item[]>>, isCancelled: () => boolean) {
    const copiedArr = [...arr];
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 0; i < copiedArr.length - 1; i++) {
            if (copiedArr[i].value > copiedArr[i + 1].value) {
                if (isCancelled()) return;
                swapped = true;
                const tmp = copiedArr[i];
                copiedArr[i] = copiedArr[i + 1];
                copiedArr[i + 1] = tmp;
                // only update state when an actual swap happens
                setArr([...copiedArr]);
                await delay(20);
            }
        }
    }

    if (!isCancelled()) setArr([...copiedArr]);
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Canvas