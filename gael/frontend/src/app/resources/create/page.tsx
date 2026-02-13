// app/resources/create/page.tsx
"use client";

import BasicForm from "@/src/components/BasicForm";

export default function CreateResourcePage() {
  return (
    <div className="min-h-screen bg-slate-900/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <BasicForm />
      </div>
    </div>
  );
}
