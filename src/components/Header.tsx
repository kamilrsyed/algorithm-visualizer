import React from "react"

type HeaderProps = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header() {
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-skin-bg border-b border-skin-border text-skin-text">
            <div className="flex items-center gap-3">
                <button className="text-skin-muted focus:outline-none md:hidden hover:text-skin-text p-2 rounded">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span className="pl-5 text-skin-text text-xl">Header</span>
            </div>
        </header>
    );
}

export default Header;

// { sidebarOpen, setSidebarOpen }: HeaderProps
// onClick={() => setSidebarOpen(!sidebarOpen)}