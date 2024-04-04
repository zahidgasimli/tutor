// import { Person as PersonIcon } from '@mui/icons-material';
import { Add as AddIcon } from '@mui/icons-material';
import { Box, Collapse, Container, Divider, Grid, Hidden, IconButton, Paper, Typography } from '@mui/material';
import { RatioBox } from 'components';
import { Fragment, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createSx } from 'theme';

export const BenefitsSection: React.FC = () => {
    const sx = makeSx();
    const [expandedBenefitIndex, setExpandedBenefitIndex] = useState<null | number>(null);

    const { t } = useTranslation('home');

    const benefits = useMemo(
        () => [
            {
                title: t('benefit1Title'),
                description: t('benefit1Description'),
            },
            {
                title: t('benefit2Title'),
                description: t('benefit2Description'),
            },
            {
                title: t('benefit3Title'),
                description: t('benefit3Description'),
            },
        ],
        [t],
    );

    return (
        <Box sx={sx.root}>
            <Container maxWidth="md">
                <Typography variant="h2" sx={sx.title} textAlign="center">
                    {t('benefitsTitle')}
                </Typography>
            </Container>
            <Container style={{ position: 'relative' }}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Paper sx={sx.paper} variant="outlined">
                            {benefits.map(({ title, description }, index, self) => {
                                const expanded = expandedBenefitIndex === index;
                                return (
                                    <Fragment key={index}>
                                        <BenefitItem
                                            index={index}
                                            title={title}
                                            description={description}
                                            expanded={expanded}
                                            onExpand={(idx) =>
                                                expandedBenefitIndex === idx
                                                    ? setExpandedBenefitIndex(null)
                                                    : setExpandedBenefitIndex(index)
                                            }
                                        />
                                        {index !== self.length - 1 && <Divider light sx={{ opacity: 0.5 }} />}
                                    </Fragment>
                                );
                            })}
                        </Paper>
                    </Grid>
                    <Hidden mdDown>
                        <Grid item xs={5}>
                            <RatioBox>
                                <img
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
                                    src={require('assets/images/home/benefits-main.png').default}
                                    alt="people discussing"
                                />
                            </RatioBox>
                        </Grid>
                    </Hidden>
                </Grid>
                <Hidden mdDown>
                    <img
                        style={{ position: 'absolute', top: -15, right: '30%', zIndex: 1 }}
                        src={require('assets/images/home/ring.svg').default}
                        alt=""
                    />
                </Hidden>
                <img
                    style={{ position: 'absolute', top: -100, right: -100, zIndex: -1, width: 200 }}
                    src={require('assets/images/home/ring.svg').default}
                    alt=""
                />
            </Container>
            <img
                style={{ position: 'absolute', top: 300, left: 0, zIndex: -1, width: 500, opacity: 0.3 }}
                src={require('assets/images/home/bg-dots-green.svg').default}
                alt=""
            />
            <Hidden mdDown>
                <img
                    style={{ position: 'absolute', bottom: 150, right: 0, zIndex: -1, width: 500, opacity: 0.3 }}
                    src={require('assets/images/home/bg-dots-green.svg').default}
                    alt=""
                />
            </Hidden>
        </Box>
    );
};

const BenefitItem: React.FC<{
    index: number;
    title: string;
    description: string;
    expanded: boolean;
    onExpand: (index: number) => void;
}> = ({ index, title, description, expanded, onExpand }) => {
    const sx = makeSx({ collapsed: !expanded });

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" sx={sx.benefit}>
            <Box display="flex" alignItems="center">
                <Typography sx={sx.benefitIndex}>0{index + 1}</Typography>
                <Typography sx={sx.benefitTitle}>{title}</Typography>
                <Box>
                    <IconButton
                        sx={sx.benefitIcon}
                        size="small"
                        aria-label="accordion expand button"
                        onClick={() => onExpand(index)}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
            <Collapse in={expanded}>
                <Typography sx={sx.benefitDescription}>{description}</Typography>
            </Collapse>
        </Box>
    );
};

const makeSx = createSx<{ collapsed: boolean }>((props) => {
    return {
        root: {
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 6, sm: 12 },
            pb: { xs: 12 },
        },
        title: {
            mb: 5,
        },
        paper: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: 'none',
        },
        benefit: {
            p: { xs: 2.5, sm: 4 },
            flex: 1,
        },
        benefitIndex: {
            color: 'text.secondary',
            fontSize: { xs: 26, sm: 32 },
            fontWeight: 700,
            width: 36,
        },
        benefitTitle: {
            ml: 2,
            fontSize: { xs: 18, sm: 22 },
            fontWeight: 700,
            flex: 1,
        },
        benefitDescription: {
            color: 'text.secondary',
            maxWidth: '60ch',
            paddingLeft: '52px',
            fontSize: { xs: 14, sm: 18 },
        },
        benefitIcon: {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'primary.main',
            backgroundColor: props?.collapsed ? 'transparent' : 'primary.main',
            transform: props?.collapsed ? 'rotate(0deg)' : 'rotate(45deg)',
            transition: '.3s',
            p: { xs: 0, sm: 0.125 },
            '&:hover': {
                backgroundColor: props?.collapsed ? 'transparent' : 'primary.main',
            },
            color: props?.collapsed ? 'primary.main' : '#fff',
        },
    };
});
