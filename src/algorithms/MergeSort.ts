import type { Item } from "../types/types";

// export async function mergeSort(
//     arr: Item[]
// ): Promise<Item[]> {
//     let mid = Math.trunc(arr.length / 2);
    
//     if (mid == 0) {
//         return arr;
//     }

//     let left: Item[] = arr.slice(0, mid).map(item => ({
//         ...item,
//         divideLevel: item.divideLevel - 1
//     }));
//     let right: Item[] = arr.slice(mid).map(item => ({
//         ...item,
//         divideLevel: item.divideLevel + 1
//     }));
    
//     left = await mergeSort(left);
//     right = await mergeSort(right);

//     return merge(left, right);
// }

// function merge(left: Item[], right: Item[]): Item[] {
//     let sortedArr: Item[] = [];
//     let p1 = 0;
//     let p2 = 0;

//     while (p2 < right.length) {
//         if (left[p1].value < right[p2].value) {
//             sortedArr.push(left[p1]);
//             p1++;
//         } else {
//             sortedArr.push(right[p2]);
//             p2++;
//         }

//         if (p1 == left.length) {
//             for (let i = p2; i < right.length; i++) {
//                 sortedArr.push(right[i]);
//             }
//             return sortedArr;
//         }
//         if (p2 == right.length) {
//             for (let i = p1; i < left.length; i++) {
//                 sortedArr.push(left[i]);
//             }
//             return sortedArr;
//         }
//     }

//     return sortedArr;
// }




type Update = (items: Item[]) => Promise<void>; // sets state, then awaits a delay

export async function mergeSort(items: Item[], update: Update) {
    const arr = items.map(i => ({ ...i, divideLevel: 0, sorted: false, inComparison: false }));
    await sort(arr, 0, arr.length, 1, update);
    arr.forEach(i => (i.sorted = true));
    await update([...arr]);
}

async function sort(arr: Item[], start: number, end: number, depth: number, update: Update) {
    if (end - start < 2) return;
    const mid = start + Math.trunc((end - start) / 2);

    // divide: push this range down one level
    for (let i = start; i < end; i++) arr[i].divideLevel = depth;
    await update([...arr]);

    await sort(arr, start, mid, depth + 1, update);
    await sort(arr, mid, end, depth + 1, update);

    await merge(arr, start, mid, end, depth, update);
}

async function merge(arr: Item[], start: number, mid: number, end: number, depth: number, update: Update) {
    const left = arr.slice(start, mid);
    const right = arr.slice(mid, end);
    let p1 = 0, p2 = 0, k = start;

    // arr[k..end) always holds exactly the items not yet placed
    const writeRemainder = () => {
        const rest = [...left.slice(p1), ...right.slice(p2)];
        rest.forEach((item, i) => (arr[k + i] = item));
    };

    while (p1 < left.length && p2 < right.length) {
        left[p1].inComparison = true;
        right[p2].inComparison = true;
        await update([...arr]);

        const take = left[p1].value <= right[p2].value ? left[p1++] : right[p2++];
        arr[k++] = take;
        writeRemainder();

        left.forEach(i => (i.inComparison = false));
        right.forEach(i => (i.inComparison = false));
    }
    writeRemainder(); // leftover tail from whichever side wasn't exhausted

    for (let i = start; i < end; i++) arr[i].divideLevel = depth - 1;
    await update([...arr]);
}