import React from 'react';
import profileImg from '../assets/1739438380694.jpg';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

// Using the user-provided image
const PROFILE_IMAGE = profileImg;

const Sidebar = () => {
    return (
        <div className="w-full lg:w-1/4 lg:h-full p-4 z-20 flex items-center justify-center pointer-events-none">
            {/* Reduced height (h-[80vh]), reduced padding (p-6), and flex alignment */}
            <div className="w-full h-[85vh] flex flex-col justify-between items-center text-center p-6 border border-white/60 bg-black/10 backdrop-blur-sm shadow-2xl rounded-2xl relative pointer-events-auto">

                {/* Profile Header */}
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-2xl font-bold mb-4">Geetha Sandesh</h2>
                    <div className="relative w-56 h-56 mb-4 rounded-2xl overflow-hidden border-2 border-white/60 shadow-2xl group">
                        <img
                            src={PROFILE_IMAGE}
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="w-full text-left space-y-4">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Specialization:</p>
                        <p className="font-semibold text-white">Software Engineer</p>
                        <p className="font-semibold text-white">AI & ML Enthusiast</p>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Based in:</p>
                            <p className="font-semibold text-white">Hyderabad, Telangana</p>
                        </div>
                        {/* Icons added to Based In section as requested */}
                        <div className="flex gap-3 text-gray-300">
                            <a href="#" className="hover:text-blue-400 transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="hover:text-blue-600 transition-colors"><FaLinkedin size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><FaGithub size={20} /></a>
                        </div>
                    </div>
                </div>
                <div className="pt-4 border-t border-white/10 w-full">
                    <p className="text-gray-400 text-sm mb-1">Contact:</p>
                    <p className="text-white text-sm">+91-8522997578</p>
                    <p className="text-white text-sm break-all">geethasandesh09@gmail.com</p>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;
