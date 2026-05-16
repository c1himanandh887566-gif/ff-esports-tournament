import React from 'react';
import TeamsShowcase from '../components/sections/TeamsShowcase';

const Teams = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen">
      <TeamsShowcase isPreview={false} />
    </div>
  );
};

export default Teams;
