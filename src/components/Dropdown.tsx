import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { algorithms } from '../App';
import type { AlgoOption } from '../interfaces/AlgoOption';

interface DropdownProps {
    optionsList: AlgoOption[];
    selectedAlgorithm: AlgoOption;
    onSelectAlgorithm: (selected: AlgoOption) => void;
}

export default function Dropdown({ selectedAlgorithm, onSelectAlgorithm, optionsList }: DropdownProps) {
    const algorithmList = optionsList;
    const defaultOption = algorithms.find((item) => item.name === 'Bubble Sort');

    return (
        <Listbox as="div" className="relative inline-block w-full hover:cursor-pointer" value={selectedAlgorithm || defaultOption} onChange={onSelectAlgorithm}>
            <ListboxButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50 hover:cursor-pointer">
                {selectedAlgorithm.name}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
            </ListboxButton>
            <ListboxOptions className="absolute left-0 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                {algorithmList.map((algo) => (
                    <ListboxOption
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        key={algo.id}
                        value={algo}
                        disabled={algo.unavailable}
                    >
                        {algo.name}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
}