import React, { useEffect, useRef } from 'react';

const CyberpunkGrid = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const gridLines = [];
        const spacing = 40;

        // Perspective variables
        let offset = 0;

        function drawGrid() {
            ctx.fillStyle = '#050511'; // Match darkbg
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)'; // Neon blue low opacity

            const width = canvas.width;
            const height = canvas.height;

            // Vertical lines with perspective simulation
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.beginPath();
            // Radiating lines
            for (let i = 0; i <= width; i += spacing * 2) {
                ctx.moveTo(i, 0);
                ctx.lineTo(centerX + (i - centerX) * 0.2, height);

                // Bottom half floor effect
                if (i % (spacing * 4) === 0) {
                    ctx.moveTo(i, height);
                    ctx.lineTo(centerX, centerY);
                }
            }

            // Horizontal lines (moving down)
            offset = (offset + 0.5) % spacing;

            for (let y = 0; y < height; y += spacing) {
                const yPos = y + offset;
                const alpha = Math.max(0, (yPos - centerY) / (height / 2)); // Fade out near center

                if (yPos > centerY) {
                    ctx.strokeStyle = `rgba(188, 19, 254, ${alpha * 0.3})`; // Neon purple
                    ctx.beginPath();
                    ctx.moveTo(0, yPos);
                    ctx.lineTo(width, yPos);
                    ctx.stroke();
                }
            }

            ctx.stroke();

            animationFrameId = requestAnimationFrame(drawGrid);
        }

        drawGrid();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-60"
        />
    );
};

export default CyberpunkGrid;
