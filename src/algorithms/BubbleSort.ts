import type { Item } from "../types/types";

// Bubble Sort Algorithm:
// Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
// compares adjacent elements, and swaps them if they are in the wrong order.
// The largest unsorted element "bubbles up" to its correct position in each iteration.
// This process is repeated until the list is sorted.
// The algorithm also marks elements as "sorted" once their position is finalized.


export async function bubbleSort(
    arr: Item[],
    setArr: React.Dispatch<React.SetStateAction<Item[]>>,
    setSwaps: React.Dispatch<React.SetStateAction<number>>,
    setCompares: React.Dispatch<React.SetStateAction<number>>,
    isCancelled: () => boolean
) {
    const copiedArr = [...arr];
    let swapped = true;
    let compares = 0;
    let swaps = 0;
    let lastIdx = copiedArr.length - 1;

    while (swapped) {
        swapped = false;
        for (let i = 0; i < copiedArr.length - 1; i++) {
            if (isCancelled()) return;

            copiedArr[i].inComparison = true;
            copiedArr[i + 1].inComparison = true;
            compares++;
            setCompares(compares);
            setArr([...copiedArr]);
            await delay(50);

            if (copiedArr[i].value > copiedArr[i + 1].value) {
                swapped = true;
                [copiedArr[i], copiedArr[i + 1]] = [copiedArr[i + 1], copiedArr[i]];
                swaps++;
                setSwaps(swaps);
            }

            if (i + 1 === lastIdx) {
                copiedArr[i+1].sorted = true;
                lastIdx--;
            }
            copiedArr[i].inComparison = false;
            copiedArr[i + 1].inComparison = false;
            setArr([...copiedArr]);
            await delay(50);
        }
    }

    if (!isCancelled()) {
        for (let k = 0; k <= lastIdx; k++) {
            copiedArr[k].sorted = true;
        }
        setArr([...copiedArr]);  
    } 

}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}