import BubbleSort from "../components/BubbleSort";
import SelectionSort from "../components/SelectionSort";
import type { AlgoComponentProps } from "../interfaces/AlgoComponentProps";



export const componentMap: Record<string, React.ComponentType<AlgoComponentProps>> = {
    'BUBBLE': BubbleSort,
    'SELECTION': SelectionSort

}