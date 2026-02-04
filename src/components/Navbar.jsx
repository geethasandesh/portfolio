import React from 'react';

const Navbar = () => {
    return (
        <div className="sticky top-0 z-30 p-4 lg:p-8 pb-0 pointer-events-none">
            <div className="flex justify-center items-center max-w-4xl mx-auto">
                <ul className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium text-gray-300">
                    {['Home', 'Projects', 'Experience', 'Skills', 'Education', 'Contact'].map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="px-5 py-2 border border-white/60 bg-black/20 backdrop-blur-md rounded-full hover:bg-white/10 hover:scale-105 hover:border-white/90 transition-all shadow-lg text-gray-200 block pointer-events-auto">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
