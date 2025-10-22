import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar, Box, Toolbar, Typography, IconButton, Menu, Container,
  Button, MenuItem, Avatar, Select, FormControl
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useAppContext } from "../contexts/AppContext";
import { useTranslation } from "react-i18next";
import '../locales/en/translation.json';
const allPages = [
  "Explore", "WishList", "My Cart", "My Orders", "Payments",
  "AboutUs", "Contact Us", "SignUp", "Login"
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
  }, [language, i18n]);

  
  const alwaysVisiblePages = ["AboutUs", "Contact Us"];
  const visiblePages = allPages.filter((page) => {
    if (alwaysVisiblePages.includes(page)) return true;
    if (!user) return page === "Login" || page === "SignUp";
    return page !== "Login" && page !== "SignUp";
  });

  return (
    <AppBar position="static" sx={{ background: "transparent", boxShadow: "none", py: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#2E8B57" }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#2E8B57",
              textDecoration: "none",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            INSURAI
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{ color: "#2E8B57" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {visiblePages.map((page) => (
                <MenuItem key={page} >
                  <Typography textAlign="center">{t(page)}</Typography>
                </MenuItem>
              ))}
              {user && (
                <MenuItem >
                  <Typography textAlign="center" sx={{ color: "#F44336" }}>
                    {t("Logout")}
                  </Typography>
                </MenuItem>
              )}
              <MenuItem>
                <FormControl fullWidth>
                  <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="te">తెలుగు</MenuItem>
                  </Select>
                </FormControl>
              </MenuItem>
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}>
            {visiblePages.map((page) => (
              <Button
                key={page}
                sx={{
                  color: "#2E8B57",
                  fontWeight: 1000,
                  fontSize: "16px",
                  borderBottom: "2px solid transparent",
                  "&:hover": {
                    color: "#2E8B57",
                    borderBottom: "2px solid #2E8B57",
                    fontSize: "18px",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {t(page)}
              </Button>
            ))}

            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                size="small"
                sx={{ color: "#2E8B57", fontWeight: 700 }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="te">తెలుగు</MenuItem>
              </Select>
            </FormControl>

            {user && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton sx={{ color: "#2E8B57" }}>
                  <Avatar sx={{ bgcolor: "#2E8B57" }}>
                    {user.username ? user.username[0] : "U"}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  sx={{ mt: "45px" }}
                >
                  <MenuItem >
                    <Typography textAlign="center">{t("View Profile")}</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center" sx={{ color: "#F44336" }}>
                      {t("Logout")}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
