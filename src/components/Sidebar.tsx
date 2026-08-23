import type { AlgoOption } from "../interfaces/AlgoOption";
import Dropdown from "./Dropdown";

interface SampleChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

interface SidebarProps {
    sampleValue: number;
    onSampleChange: (event: SampleChangeEvent) => void;
    onRunSort: () => void;
    onGenerateArray: () => void;
    onSelectAlgorithm: (selected: AlgoOption) => void;
    selectedAlgorithm: AlgoOption;
    algos: AlgoOption[]
}

function Sidebar({ sampleValue, selectedAlgorithm, onSampleChange, onRunSort, onGenerateArray, onSelectAlgorithm, algos }: SidebarProps) {
    const sampleMin = 1;
    const sampleMax = 100;
    const algorithms = algos;

    return (
        <>
            <aside className="flex flex-col bg-skin-bg border-r border-skin-border w-64 fixed left-0 top-16 bottom-0 z-20 overflow-auto place-items-center p-5">
                <div className="mt-5 w-full p-1">
                    <label htmlFor="sample-size" className="flex text-gray-700 text-sm font-bold">Sample size</label>
                    <input
                        id="sample-size"
                        className="w-full hover:cursor-pointer"
                        type="range"
                        min={sampleMin}
                        max={sampleMax}
                        value={sampleValue}
                        onChange={onSampleChange}
                    />
                    <p className="flex">{sampleValue}</p>
                    <button className="bg-white border hover:cursor-pointer hover:bg-mist-100 text-blue-500 py-2 px-4 rounded-full" onClick={onGenerateArray}>
                        Generate
                    </button>
                </div>

                <div className="mt-5 w-full max-w-xs rounded-lg font-mono p-1">
                    <label className="flex text-gray-700 text-sm font-bold mb-1" htmlFor="unique-input">Sample Size</label>
                    <input
                        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                        placeholder="Enter text here"
                        type="text"
                        id="unique-input"
                    />
                </div>
                <div className="mt-5 w-full max-w-xs rounded-lg font-mono p-1">
                    <Dropdown optionsList={algorithms} selectedAlgorithm={selectedAlgorithm} onSelectAlgorithm={onSelectAlgorithm} />
                </div>
                <div className="mt-5 w-full max-w-xs rounded-lg font-mono p-1">
                    <button className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full" onClick={onRunSort}>
                        Run
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;