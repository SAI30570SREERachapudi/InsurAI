import React from 'react';
import { Grid, Card, CardContent, Typography, Container, Avatar, Box, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../locales/en/translation.json';
const Features = () => {
  const { t } = useTranslation();

  const features = [
    { title: t('features.directSellingTitle'), description: t('features.directSellingDesc') },
    { title: t('features.freshProduceTitle'), description: t('features.freshProduceDesc') },
    { title: t('features.fairPricingTitle'), description: t('features.fairPricingDesc') },
    { title: t('features.realTimeUpdatesTitle'), description: t('features.realTimeUpdatesDesc') },
    { title: t('features.easyPaymentsTitle'), description: t('features.easyPaymentsDesc') },
    { title: t('features.farmerSupportTitle'), description: t('features.farmerSupportDesc') },
  ];

  const reviews = [
    {
      name: 'Aarav Sharma',
      profile: 'https://randomuser.me/api/portraits/men/32.jpg',
      review: t('reviews.aarav'),
    },
    {
      name: 'Priya Desai',
      profile: 'https://randomuser.me/api/portraits/women/44.jpg',
      review: t('reviews.priya'),
    },
    {
      name: 'Rohan Verma',
      profile: 'https://randomuser.me/api/portraits/men/65.jpg',
      review: t('reviews.rohan'),
    },
    {
      name: 'Meera Patel',
      profile: 'https://randomuser.me/api/portraits/women/68.jpg',
      review: t('reviews.meera'),
    },
    {
      name: 'Vikram Singh',
      profile: 'https://randomuser.me/api/portraits/men/12.jpg',
      review: t('reviews.vikram'),
    },
    {
      name: 'Sneha Reddy',
      profile: 'https://randomuser.me/api/portraits/women/23.jpg',
      review: t('reviews.sneha'),
    },
  ];

  return (
    <Container sx={{ py: 8, backgroundColor: '#F8F9FA' }} maxWidth="lg">
      <Box mb={8}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="#2E8B57">
          {t('features.ourStoryTitle')}
        </Typography>
        <Typography variant="body1" align="center" color="#6C757D" maxWidth="md" mx="auto">
          {t('features.ourStoryDesc')}
        </Typography>
      </Box>

      <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="#2E8B57">
        {t('features.whyChoose')}
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom fontWeight="bold" color="#2E8B57">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="#6C757D">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="#2E8B57">
        {t('features.userReviews')}
      </Typography>
      <Grid container spacing={4}>
        {reviews.map((review, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Avatar src={review.profile} alt={review.name} sx={{ width: 56, height: 56, mb: 2 }} />
                <Typography variant="subtitle1" fontWeight="bold" color="#2E8B57">
                  {review.name}
                </Typography>
                <Divider sx={{ width: '50%', my: 2 }} />
                <Typography variant="body2" color="#6C757D" align="center">
                  "{review.review}"
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
