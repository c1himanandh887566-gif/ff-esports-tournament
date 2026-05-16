import React from 'react';
import UpcomingMatches from '../components/sections/UpcomingMatches';

const Schedule = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen">
      <UpcomingMatches isPreview={false} />
    </div>
  );
};

export default Schedule;
