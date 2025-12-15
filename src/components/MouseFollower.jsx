import React, { useEffect, useState } from 'react';

const MouseFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            className="pointer-events-none fixed z-0 transform -translate-x-1/2 -translate-y-1/2"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="w-[500px] h-[500px] bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full blur-[100px] opacity-50" />
        </div>
    );
};

export default MouseFollower;
