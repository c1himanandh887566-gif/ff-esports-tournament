import React from 'react';
import Hero from '../components/sections/Hero';
import UpcomingMatches from '../components/sections/UpcomingMatches';
import LiveStandings from '../components/sections/LiveStandings';
import TeamsShowcase from '../components/sections/TeamsShowcase';
import Announcements from '../components/sections/Announcements';

const Home = () => {
  return (
    <>
      <Hero />
      <UpcomingMatches isPreview={true} />
      <LiveStandings isPreview={true} />
      <TeamsShowcase isPreview={true} />
      <Announcements />
    </>
  );
};

export default Home;
