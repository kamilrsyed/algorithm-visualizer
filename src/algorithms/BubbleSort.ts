import type { Item } from "../types/types";

export async function bubbleSort(
    arr: Item[],
    setArr: React.Dispatch<React.SetStateAction<Item[]>>,
    isCancelled: () => boolean
) {
    const copiedArr = [...arr];
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 0; i < copiedArr.length - 1; i++) {
            if (isCancelled()) return;

            copiedArr[i].compared = true;
            copiedArr[i + 1].compared = true;
            setArr([...copiedArr]);
            await delay(200);

            if (copiedArr[i].value > copiedArr[i + 1].value) {
                swapped = true;
                [copiedArr[i], copiedArr[i + 1]] = [copiedArr[i + 1], copiedArr[i]];
            }

            copiedArr[i].compared = false;
            copiedArr[i + 1].compared = false;
            setArr([...copiedArr]);
            await delay(200);
        }
    }

    if (!isCancelled()) setArr([...copiedArr]);
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}