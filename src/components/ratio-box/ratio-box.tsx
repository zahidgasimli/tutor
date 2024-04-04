import { styled } from '@mui/material';
import clsx from 'clsx';

const Root = styled('div')(() => ({
    '& .ratio': {
        height: 0,
        position: 'relative',
        display: 'flex !important',
    },
    '& .ratioContent': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
}));

type RatioBoxProps = {
    containerClassName?: string;
    containerStyles?: React.CSSProperties;
    contentClassName?: string;
    contentStyles?: React.CSSProperties;
    ratio?: number;
};

export const RatioBox: React.FC<RatioBoxProps> = ({
    children,
    containerClassName,
    contentClassName,
    containerStyles,
    contentStyles,
    ratio = 1,
}) => {
    return (
        <Root>
            <div
                className={clsx('ratio', containerClassName)}
                style={{ paddingBottom: `${ratio * 100}%`, ...containerStyles }}
            >
                <div className={clsx('ratioContent', contentClassName)} style={contentStyles}>
                    {children}
                </div>
            </div>
        </Root>
    );
};
