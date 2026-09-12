import BubbleSort from "../components/BubbleSort";
import InsertionSort from "../components/InsertionSort";
import SelectionSort from "../components/SelectionSort";
import type { AlgoComponentProps } from "../interfaces/AlgoComponentProps";



export const componentMap: Record<string, React.ComponentType<AlgoComponentProps>> = {
    'BUBBLE': BubbleSort,
    'SELECTION': SelectionSort,
    'INSERTION': InsertionSort
}