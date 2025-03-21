
'use client';

import React from 'react';
import Header from '../components/Header';
import WorkoutTracker from '../components/WorkoutTracker';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <WorkoutTracker />
      </main>
      <footer className="w-full py-4 px-6 bg-card/50 border-t border-border text-sm text-center text-muted-foreground">
        BicepTracker • Precision Rep Tracking
      </footer>
    </div>
  );
}
