import { keyframes } from '@emotion/react';

export const pulse = (multiplier: number) => {
    const translation = `${-8 * multiplier}px`;
    return keyframes`
        0% { top: 0; left: 0; bottom: 0; right: 0; opacity: 0.3; border-radius: 16px; }    
        100% { top: ${translation}; left: ${translation}; bottom: ${translation}; right: ${translation}; opacity: 0; border-radius: 24px; }    
    `;
};
