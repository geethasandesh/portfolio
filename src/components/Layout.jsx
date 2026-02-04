import React from 'react';


const Layout = ({ children }) => {
    return (
        // macOS Dark Theme Background: Deep charcoal/black with subtle mesh gradient
        <div className="min-h-screen relative bg-black text-white selection:bg-blue-500 selection:text-white font-[system-ui]">

            {/* Abstract Background Mesh */}
            {/* Simple Black Background */}
            <div className="fixed inset-0 z-0 overflow-hidden bg-black">
                {/* Optional: You can add the subtle gradient/mesh back here if 'simple black' feels too empty, 
                    but adhering to 'simple black bg' request for now. 
                    If purely black is too harsh, we can re-add the mesh. 
                    For now, creating just a black void. */}
            </div>

            {/* Main Content Wrapper - pointer-events-none to let accumulated space pass through, but children will need auto if interactive */}
            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen lg:h-screen lg:overflow-hidden pointer-events-none">
                {children}
            </div>
        </div>
    );
};

export default Layout;
