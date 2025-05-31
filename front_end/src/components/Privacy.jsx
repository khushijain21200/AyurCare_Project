// Privacy.jsx
import React from "react";
import { Footer } from "./components/Footer";
import { Card, CardContent } from "./components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow px-4 py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
          <Card>
            <CardContent className="p-6 text-lg">
              <p>
                Your privacy is our priority. All health data collected through our system is encrypted using AES-256 and TLS/SSL protocols. We do not share your data with third parties without your explicit consent.
              </p>
              <p className="mt-4">
                You have full control over your data. Users can request data deletion, export, and review at any time via account settings.
              </p>
              <p className="mt-4">
                For questions or concerns, contact us at <a href="mailto:privacy@smarthealth.ai" className="text-blue-600 underline">privacy@smarthealth.ai</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
