import type { Item } from "../types/types";
import { delay } from "./BubbleSort";

export async function insertionSort(
    arr: Item[],
    setArr: React.Dispatch<React.SetStateAction<Item[]>>,
    isCancelled: () => boolean
) {
    const sortedArr = [...arr];
    sortedArr[0].sorted = true;

    for (let i = 1; i < sortedArr.length; i++) {
        if (isCancelled()) return;

        sortedArr[i].inComparison = true;
        setArr([...sortedArr]);
        await delay(200);

        let j = i;
        while (j > 0 && sortedArr[j - 1].value > sortedArr[j].value) {
            if (isCancelled()) return;

            sortedArr[j - 1].inComparison = true;

            [sortedArr[j - 1], sortedArr[j]] = [sortedArr[j], sortedArr[j - 1]];
            setArr([...sortedArr]);
            await delay(200);

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