import React from 'react';
import LiveStandings from '../components/sections/LiveStandings';

const Standings = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen">
      <LiveStandings isPreview={false} />
    </div>
  );
};

export default Standings;
