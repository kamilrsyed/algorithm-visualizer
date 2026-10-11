import type { Item } from "../types/types";
import { delay } from "./BubbleSort";

export async function insertionSort(
    arr: Item[],
    setArr: React.Dispatch<React.SetStateAction<Item[]>>,
    setSwaps: React.Dispatch<React.SetStateAction<number>>,
    setCompares: React.Dispatch<React.SetStateAction<number>>,
    isCancelled: () => boolean
) {
    const sortedArr = [...arr];
    sortedArr[0].sorted = true;
    let swaps = 0;
    let compares = 0;

    for (let i = 1; i < sortedArr.length; i++) {
        if (isCancelled()) return;

        sortedArr[i].inComparison = true;
        compares++;
        setCompares(compares);

        setArr([...sortedArr]);
        await delay(200);

        let j = i;
        while (j > 0 && sortedArr[j - 1].value > sortedArr[j].value) {
            if (isCancelled()) return;

            sortedArr[j - 1].inComparison = true;
            compares++;
            setCompares(compares);

            [sortedArr[j - 1], sortedArr[j]] = [sortedArr[j], sortedArr[j - 1]];
            swaps++;
            setSwaps(swaps);
            setArr([...sortedArr]);
            await delay(100);

            sortedArr[j].inComparison = false;
            j--;
        }

        sortedArr[j].inComparison = false;
        sortedArr[j].sorted = true;
        setArr([...sortedArr]);
        await delay(200);
    }

    for (let k = 0; k < sortedArr.length; k++) {
        sortedArr[k].sorted = true;
    }
    setArr([...sortedArr]);
}