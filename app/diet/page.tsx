"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function DietSuggestion() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setDietPlan("");
    
    const response = await fetch("/api/gpt-diet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age, height, weight }),
    });
    
    const data = await response.json();
    setDietPlan(data.dietPlan);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Personalized Diet Suggestion</h1>
      <div className="space-y-4 w-full max-w-md">
        <Input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="bg-gray-800 text-white p-2 rounded-xl border-gray-950" />
        <Input type="text" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-gray-800 text-white rounded-xl border-gray-950" />
        <Input type="text" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-gray-800 text-white rounded-xl border-gray-950" />
        <Button onClick={handleSubmit} className="w-full bg-blue-600 text-white" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Get Diet Plan"}
        </Button>
      </div>
      {dietPlan && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-semibold">Your Diet Plan:</h2>
          <p className="mt-2 text-gray-300">{dietPlan}</p>
        </div>
      )}
    </div>
  );
}
