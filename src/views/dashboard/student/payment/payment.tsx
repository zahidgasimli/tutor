import { Container } from '@mui/material';
import { PaymentsContent } from './payment-content';

export const Payment: React.FC = () => {
    return (
        <Container maxWidth="md">
            <PaymentsContent />
        </Container>
    );
};
