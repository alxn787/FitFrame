
'use client';

import React from 'react';
import Header from '../components/Header';
import WorkoutTracker from '../components/WorkoutTracker';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <WorkoutTracker />
      </main>
    </div>
  );
}
