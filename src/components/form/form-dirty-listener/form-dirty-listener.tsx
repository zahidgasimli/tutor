import { useFormikContext } from 'formik';
import { useEffect } from 'react';

export type FormDirtyListenerProps = {
    onDirtyChange: (dirty: boolean) => void;
};

export const FormDirtyListener: React.FC<FormDirtyListenerProps> = ({ onDirtyChange }) => {
    const { dirty } = useFormikContext();

    useEffect(() => {
        onDirtyChange(dirty);
    }, [dirty]);

    return null;
};
