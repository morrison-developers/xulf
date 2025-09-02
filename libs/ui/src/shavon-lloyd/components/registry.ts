// components/registry.ts

import Body from './Body/Body';
import Footer from './Footer/Footer';
import HeroImage from './HeroImage/HeroImage';
import MusicTab from './MusicTab/MusicTab';
import NavBar from './NavBar/NavBar';
import NavBarMobile from './NavBar/NavBarMobile';
import NavWrapper from './NavBar/NavWrapper';
import SettingsTab from './SettingsTab/SettingsTab';
import VideoCard from './VideoCard/VideoCard';
import { Calendar } from './Calendar/Calendar';
import ContactForm from './ContactForm/ContactForm';
import Tabs from './Tabs/Tabs';
import Gallery from './Gallery/Gallery';
import Button from './Button/Button';
import BioPreview from './Preview/BioPreview/BioPreview';
import LandingHero from './LandingHero/LandingHero';
import MagicText from './MagicText/MagicText';

// Type for consistency if you want to map by key
export const componentRegistry = {
  Body,
  Footer,
  HeroImage,
  MusicTab,
  NavBar,
  NavBarMobile,
  NavWrapper,
  SettingsTab,
  VideoCard,
  Calendar,
  ContactForm,
  Tabs,
  Gallery,
  Button,
  BioPreview,
  LandingHero,
  MagicText,
};

// Optional: export individually too
export {
  Body,
  Footer,
  HeroImage,
  MusicTab,
  NavBar,
  NavBarMobile,
  NavWrapper,
  SettingsTab,
  VideoCard,
  Calendar,
  ContactForm,
  Tabs,
  Gallery,
  Button,
  BioPreview,
  LandingHero,
  MagicText,
};
