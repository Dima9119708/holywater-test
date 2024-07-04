import React, { useEffect, useRef } from 'react';

export const useSlide = () => {
    const moveRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    const stateRef = useRef({
        x: 0,
        deltaX: 0,
        disabledSlide: false,
    });

    const onTouchStart = (event: React.TouchEvent) => {
        stateRef.current.x = event.changedTouches.item(0).clientX - stateRef.current.deltaX;
    };

    const onTouchMove = (event: React.TouchEvent) => {
        if (stateRef.current.disabledSlide) return;
        stateRef.current.deltaX = event.changedTouches.item(0).clientX - stateRef.current.x;

        requestAnimationFrame(() => {
            moveRef.current!.style.transform = `translateX(${stateRef.current.deltaX}px)`;
        });
    };

    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        wrapRef.current!.style.cursor = 'grabbing';
        stateRef.current.x = event.clientX - stateRef.current.deltaX;
    };

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (stateRef.current.disabledSlide) return;

        if (event.pressure === 0.5 || event.pressure === 1) {
            stateRef.current.deltaX = event.clientX - stateRef.current.x;

            requestAnimationFrame(() => {
                if (moveRef.current) {
                    moveRef.current.style.transform = `translateX(${stateRef.current.deltaX}px)`;
                }
            });
        }
    };

    const onPointerUp = () => {
        wrapRef.current!.style.cursor = 'grab';
    };

    useEffect(() => {
        const element = document.getElementById('root-layout');

        const resizeObserver = new ResizeObserver((entries) => {
            wrapRef.current!.style.width = `${entries[0].contentRect.width}px`;
            moveRef.current!.style.transform = `translateX(${0}px)`;
            stateRef.current.x = 0;
            stateRef.current.deltaX = 0;

            if (moveRef.current!.scrollWidth > Math.round(entries[0].contentRect.width)) {
                stateRef.current.disabledSlide = false;
            } else {
                stateRef.current.disabledSlide = true;
            }
        });

        resizeObserver.observe(element!);

        if (element) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            resizeObserver.disconnect();
            if (element) {
                document.body.style.overflow = '';
            }
        };
    }, []);

    return {
        wrapRef,
        moveRef,
        onTouchStart,
        onTouchMove,
        onPointerUp,
        onPointerDown,
        onPointerMove,
    };
};
