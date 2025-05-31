import React from "react";
import Footer from "./Footer"
import { Card, CardContent } from "./ui/card";

export function About() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow px-4 py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
          <Card>
            <CardContent className="p-6 text-lg">
              <p>
                We are committed to revolutionizing remote healthcare through smart IoT-enabled solutions. Our system combines real-time patient monitoring, AI-powered analysis, and robust data encryption to ensure accurate and secure healthcare delivery.
              </p>
              <p className="mt-4">
                Our mission is to empower doctors and patients alike with seamless health data access, proactive alerts, and efficient communication – all through a unified, cloud-based platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}