// Career.jsx
import React from "react";
import Footer from "./Footer";
import { Card, CardContent } from "./ui/card";

export default function Career() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow px-4 py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Careers</h1>
          <Card>
            <CardContent className="p-6 text-lg">
              <p>
                Join our mission to transform the future of healthcare. We're looking for passionate developers, AI engineers, and healthcare professionals who are eager to make an impact in the digital health space.
              </p>
              <p className="mt-4">
                Interested in joining us? Send your resume to <a href="mailto:careers@smarthealth.ai" className="text-blue-600 underline">careers@smarthealth.ai</a>.
              </p>
              <ul className="mt-4 list-disc list-inside text-md text-gray-700">
                <li>Full Stack Developers</li>
                <li>Data Scientists (AI/ML)</li>
                <li>IoT Hardware Engineers</li>
                <li>Healthcare Advisors</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}