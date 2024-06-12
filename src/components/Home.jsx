import { AuroraBackground } from "./ui/aurora-background";
import { AuroraBackgroundDemo } from "./childs/background";
import { motion } from "framer-motion";
import React from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/joy/Button';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                    Another AI Chat Bot.
                </div>
                <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                    but with the (free) Google Gemini
                </div>

                <button onClick={() => navigate('chat')} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-12 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    Try it out
                </button>
    
            </motion.div>
        </AuroraBackground>
    );
}