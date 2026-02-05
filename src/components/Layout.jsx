import React from 'react';
import FloatingLines from './FloatingLines';


const Layout = ({ children }) => {
    return (
        // macOS Dark Theme Background: Deep charcoal/black with subtle mesh gradient
        <div className="min-h-screen relative bg-black text-white selection:bg-blue-500 selection:text-white font-[system-ui]">

            {/* Abstract Background Mesh */}
            {/* Simple Black Background */}
            {/* Simple Black Background with Floating Lines */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <FloatingLines
                    enabledWaves={["top", "middle", "bottom"]}
                    lineCount={5}
                    lineDistance={5}
                    bendRadius={5}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                    mixBlendMode="normal"
                    linesGradient={["#e947f5", "#2f4ba2"]}
                />
            </div>

            {/* Main Content Wrapper - pointer-events-none to let accumulated space pass through, but children will need auto if interactive */}
            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen lg:h-screen lg:overflow-hidden pointer-events-none">
                {children}
            </div>
        </div>
    );
};

export default Layout;
