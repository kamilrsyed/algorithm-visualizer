import type { Item } from "../types/types";
import { delay } from "./BubbleSort";

// Selection Sort Algorithm:
// Selection Sort divides the array into a sorted and an unsorted region.
// It repeatedly selects the smallest element from the unsorted region
// and swaps it with the first element of the unsorted region.
// The sorted region grows one element at a time until the entire array is sorted.


export async function selectionSort(
    arr: Item[], 
    setArr: React.Dispatch<React.SetStateAction<Item[]>>, 
    isCancelled: () => boolean) {

        const copiedArr = [...arr];

        for (let i = 0; i < copiedArr.length; i++) {
            if (isCancelled()) return;
    
            let minIdx = i;
            copiedArr[i].currentMin = true;
            setArr([...copiedArr]);
            await delay(200);
    
            for (let j = i + 1; j < copiedArr.length; j++) {
                if (isCancelled()) return;
    
                copiedArr[j].inComparison = true;
                setArr([...copiedArr]);
                await delay(200);
    
                if (copiedArr[j].value < copiedArr[minIdx].value) {
                    const prevMinIdx = minIdx;
                    minIdx = j;
                    copiedArr[prevMinIdx].currentMin = false;
                    copiedArr[j].currentMin = true;
                }
    
                copiedArr[j].inComparison = false;
                setArr([...copiedArr]);
                await delay(200);
            }
    
            copiedArr[minIdx].currentMin = false;
            if (minIdx !== i) {
                const tmp = copiedArr[i];
                copiedArr[i] = copiedArr[minIdx];
                copiedArr[minIdx] = tmp;
            }
            copiedArr[i].sorted = true;
            setArr([...copiedArr]);
            await delay(200);
        }
    
        if (!isCancelled()) {
            setArr([...copiedArr]);
        }

        // for (let i = 0; i < copiedArr.length; i++) {
        //     if (isCancelled()) return;
        //     let minIdx = i;
        //     copiedArr[i].currentMin = true;
        //     setArr([...copiedArr]);
        //     await delay(200);

        //     for (let j = i + 1; j < copiedArr.length; j++) {
        //         copiedArr[j].inComparison = true;
        //         setArr([...copiedArr]);
        //         await delay(200);
        //         if (copiedArr[j].value < copiedArr[minIdx].value) {
        //             minIdx = j;

        //             copiedArr[i].currentMin = false;
        //             copiedArr[j].inComparison = false;
        //             copiedArr[j].currentMin = true;
        //             setArr([...copiedArr]);
        //             await delay(200);
        //         }
        //         copiedArr[j].inComparison = false;
        //     }
        //     if (minIdx !== i) {
        //         let tmp = copiedArr[i];
        //         copiedArr[i] = copiedArr[minIdx];
        //         copiedArr[minIdx] = tmp;

        //         copiedArr[minIdx].currentMin = false;
        //         copiedArr[i].sorted = true;
        //         setArr([...copiedArr]);
        //         await delay(200);
        //     }
        // }
        
        // if (!isCancelled()) {
        //     setArr([...copiedArr]);  
        // } 

}