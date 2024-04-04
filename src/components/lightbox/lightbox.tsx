import React from 'react';
import LightboxC, { ILightBoxProps } from 'react-image-lightbox';

export const Lightbox: React.FC<ILightBoxProps> = ({ ...props }) => {
    return (
        <LightboxC
            reactModalStyle={{
                overlay: {
                    zIndex: 1500,
                },
            }}
            animationDuration={600}
            {...props}
        />
    );
};
