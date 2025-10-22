import React from 'react';
import { Box, Typography, Container, Grid, Link, Divider } from '@mui/material';
import { Email } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import '../locales/en/translation.json';
const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ bgcolor: '#2E8B57', color: 'white', pt: 6, pb: 2 }} component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Farm<span style={{ color: 'red' }}>X<span style={{ color: 'white' }}></span>press</span>
            </Typography>
            <Typography variant="body2" color="grey.400">
              {t('footer.description')}
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t('footer.quickLinks')}
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>{t('footer.home')}</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>{t('footer.buyProduce')}</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>{t('footer.sellCrops')}</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>{t('footer.howItWorks')}</Link>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t('footer.resources')}
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>{t('footer.farmerSupport')}</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>{t('footer.pricingGuide')}</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>{t('footer.customerFaqs')}</Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>{t('footer.latestUpdates')}</Link>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t('footer.contact')}
            </Typography>
            <Typography variant="body2" color="grey.400" mb={1}>
              InsurAI<br />
              VIJAYAWADA,<br />
              Andhra Pradesh, India - 522501
            </Typography>
            <Typography variant="body2" color="grey.400" mt={1}>
              <Email fontSize="small" sx={{ mr: 1 }} />
              contact@InsurAI.in
            </Typography>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, bgcolor: 'grey.700' }} />

        {/* Bottom Text */}
        <Typography variant="body2" color="grey.500" align="center">
          © 2025 InsurAI. {t('footer.rightsReserved')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
