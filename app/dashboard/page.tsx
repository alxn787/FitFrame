"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Trophy,
  TrendingUp,
  ArrowUpRight,
  Dumbbell,
  ArrowLeft,
  Flame
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Dummy session data for demonstration
const workoutSessions = [
  { id: 1, date: '2023-10-01', totalReps: 45, duration: 12, maxRepsPerMin: 6, calories: 98 },
  { id: 2, date: '2023-10-02', totalReps: 52, duration: 15, maxRepsPerMin: 7, calories: 110 },
  { id: 3, date: '2023-10-04', totalReps: 38, duration: 10, maxRepsPerMin: 5, calories: 75 },
  { id: 4, date: '2023-10-06', totalReps: 62, duration: 18, maxRepsPerMin: 8, calories: 130 },
  { id: 5, date: '2023-10-08', totalReps: 57, duration: 16, maxRepsPerMin: 7, calories: 120 },
  { id: 6, date: '2023-10-10', totalReps: 72, duration: 20, maxRepsPerMin: 9, calories: 150 },
  { id: 7, date: '2023-10-12', totalReps: 68, duration: 19, maxRepsPerMin: 8, calories: 140 },
];

const chartConfig = {
  total: {
    label: 'Total Reps',
    color: 'hsl(210, 100%, 50%)',
  },
  max: {
    label: 'Max Reps/Min',
    color: 'hsl(120, 70%, 50%)',
  },
  duration: {
    label: 'Duration (min)',
    color: 'hsl(45, 70%, 50%)',
  },
  calories: {
    label: 'Calories',
    color: 'hsl(0, 70%, 50%)',
  },
};

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: number;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className 
}) => (
  <Card className={cn("rounded-xl text-white  overflow-hidden glassmorphism-dark border-white/50", className)}>
    <CardHeader className="flex flex-row items-center text-white  justify-between pb-2">
      <CardTitle className="text-sm font-medium text-white text-muted-foreground">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {trend !== undefined && (
        <div className={`flex items-center mt-2 text-xs ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowUpRight size={12} className="rotate-180" />}
          <span className="ml-1">{Math.abs(trend)}% from last session</span>
        </div>
      )}
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const [maxTotalReps, setMaxTotalReps] = useState(0);
  const [maxRepsPerMin, setMaxRepsPerMin] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
//   const [totalReps, setTotalReps] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  
  useEffect(() => {
    // Calculate statistics from workoutSessions
    const maxReps = Math.max(...workoutSessions.map(session => session.totalReps));
    const maxRPM = Math.max(...workoutSessions.map(session => session.maxRepsPerMin));
    // const allReps = workoutSessions.reduce((sum, session) => sum + session.totalReps, 0);
    const allCalories = workoutSessions.reduce((sum, session) => sum + session.calories, 0);
    
    setMaxTotalReps(maxReps);
    setMaxRepsPerMin(maxRPM);
    setTotalWorkouts(workoutSessions.length);
    // setTotalReps(allReps);
    setTotalCalories(allCalories);
  }, []);
  
  // Prepare chart data
  const chartData = workoutSessions.map(session => ({
    date: session.date.split('-')[2], // Just the day for display
    totalReps: session.totalReps,
    maxRepsPerMin: session.maxRepsPerMin,
    duration: session.duration,
    calories: session.calories,
  }));
  
  return (
    <div className="min-h-screen w-full bg-black">
        <div className='h-20'></div>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/dashboard">
                <Button variant="outline" size="icon" className="h-8 w-8 border-white/10 hover:bg-white/10">
                  <ArrowLeft className='text-white' size={16} />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Workout Dashboard</h1>
            </div>
            <p className="text-white/60">Track your bicep curl performance and progress over time</p>
          </div>
          <Link href='/exercise'>
            <Button className="mt-4 rounded-xl md:mt-0 bg-blue-600 hover:bg-blue-700">
              New Workout
            </Button>
          </Link>
        </header>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatCard 
            title="Max Reps in a Session" 
            value={maxTotalReps}
            icon={<Trophy size={18} />}
            trend={7}
          />
          <StatCard 
            title="Max Reps per Minute" 
            value={maxRepsPerMin}
            icon={<TrendingUp size={18} />}
            trend={3}
          />
          <StatCard 
            title="Total Workouts" 
            value={totalWorkouts}
            icon={<Dumbbell size={18} />}
            description="Completed sessions"
          />
          <StatCard 
            title="Total Calories Burned" 
            value={totalCalories}
            icon={<Flame size={18} />}
            trend={12}
          />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="rounded-xl glassmorphism-dark border-white/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Reps Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={chartConfig}>
                <BarChart data={chartData}>
                  <XAxis dataKey="date" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Bar dataKey="totalReps" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl glassmorphism-dark border-white/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Reps Per Minute</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={chartConfig}>
                <LineChart data={chartData}>
                  <XAxis dataKey="date" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Line 
                    type="monotone" 
                    dataKey="maxRepsPerMin"
                    stroke="var(--color-max)" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 4 }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="rounded-xl glassmorphism-dark border-white/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Recent Workout Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-white/90">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Total Reps</th>
                      <th className="text-left py-3 px-4">Duration (min)</th>
                      <th className="text-left py-3 px-4">Max Reps/Min</th>
                      <th className="text-left py-3 px-4">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutSessions.slice(-5).reverse().map((session) => (
                      <tr key={session.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4">{session.date}</td>
                        <td className="py-3 px-4">{session.totalReps}</td>
                        <td className="py-3 px-4">{session.duration}</td>
                        <td className="py-3 px-4">{session.maxRepsPerMin}</td>
                        <td className="py-3 px-4">{session.calories}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
