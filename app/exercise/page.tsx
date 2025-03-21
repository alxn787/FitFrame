
'use client';

import React from 'react';
import WorkoutTracker from '../components/WorkoutTracker';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className='h-16'></div>
        <WorkoutTracker />
      </main>
    </div>
  );
}
