import { cubicOut } from 'svelte/easing';

export function flyBlur(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0 }) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
        delay,
        duration,
        easing,
        css: (t: number, u: number) => {
            const eased = easing(t);
            return `
        transform: ${transform} translate(${(1 - eased) * x}px, ${(1 - eased) * y}px);
        opacity: ${eased * opacity};
        filter: blur(${u * 10}px);
      `;
        }
    };
}