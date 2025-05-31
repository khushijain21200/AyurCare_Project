import React from "react";
import Footer from "./Footer";
import { Card, CardContent } from "./ui/card";

export default function Alert() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow px-4 py-10 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Health Alerts</h1>
          <Card className="mb-6">
            <CardContent className="p-6">
              <p className="text-lg">
                Our system uses AI-powered analytics to monitor patient data in real-time.
                If any anomaly or critical health condition is detected, an alert is automatically
                generated and shared with caregivers and medical professionals.
              </p>
              <ul className="mt-4 list-disc list-inside text-md text-gray-700">
                <li>Heart rate irregularities</li>
                <li>Low oxygen levels (SpO₂)</li>
                <li>High/Low blood pressure</li>
                <li>Fall detection and inactivity</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
