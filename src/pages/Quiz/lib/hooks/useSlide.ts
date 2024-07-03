import React, { useEffect, useRef } from 'react';

export const useSlide = () => {
    const moveRef = useRef<HTMLDivElement>(null);

    const stateRef = useRef({
        x: 0,
        deltaX: 0,
    });

    const onTouchStart = (event: React.TouchEvent) => {
        stateRef.current.x = event.changedTouches.item(0).clientX - stateRef.current.deltaX;
    };

    const onTouchMove = (event: React.TouchEvent) => {
        stateRef.current.deltaX = event.changedTouches.item(0).clientX - stateRef.current.x;

        requestAnimationFrame(() => {
            moveRef.current!.style.transform = `translateX(${stateRef.current.deltaX}px)`;
        });
    };

    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        stateRef.current.x = event.clientX - stateRef.current.deltaX;
    };

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pressure === 0.5 || event.pressure === 1) {
            stateRef.current.deltaX = event.clientX - stateRef.current.x;

            requestAnimationFrame(() => {
                if (moveRef.current) {
                    moveRef.current.style.transform = `translateX(${stateRef.current.deltaX}px)`;
                }
            });
        }
    };

    useEffect(() => {
        const element = document.getElementById('root-layout');

        if (element) {
            element.style.overflow = 'hidden';
        }

        return () => {
            if (element) {
                element.style.overflow = '';
            }
        };
    }, []);

    return {
        moveRef,
        onTouchStart,
        onTouchMove,
        onPointerDown,
        onPointerMove,
    };
};
