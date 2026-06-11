"use client";

import { useState } from "react";
import QueryBox from "@/component/QueryBox";
import StatCard from "@/component/StatCard";
import DrugInfoCard from "@/component/DrugInfoCard";
import InsightCard from "@/component/InsightCard";
import ResultTable from "@/component/ResultTable";
import ExplanationCard from "@/component/ExplanationCard";
import ScoreChart from "@/component/ScoreChart";
import { askModel } from "@/lib/api";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true)
    setResult(null)

    try {
      const data= await askModel(query);
      setResult(data);

    } catch(err) {
      console.error(err)

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        MedAnalytics Dashboard
      </h1>

      {/* QUERY BOX */}
      <QueryBox onSearch={handleSearch} />

      {/* Loading UI */}
      {loading && (
        <div className="mt-6 flex flex-col items-center">
          <div className="w-full h-2 bg-gray 200 rounded overflow-hidden">
            <div className="h-full bg-blue 500 animate-pulse w-full"></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Retrieving and analyzing data...</p>
        </div>
      )}

      {/* RESULT SECTION */}
      {!loading && result && (
        <div className="mt-6 grid gap-4">

          <div className="grid md:grid-cols-2 gap-4">

            {/* DRUG INFO */}
            <DrugInfoCard
              drug={result.drug}
              condition={result.condition}
            />

            {/* Insight INFO */}
            <InsightCard
              insight={result.insight}
              avgScore={result.avg_score} 
            />

          </div>

          {/* METRICS */}
          <div className="grid grid-cols-4 gap-4">
            
            <StatCard
              title="Avg Score"
              value={result.avg_score}
            />

            <StatCard
              title="Min Score"
              value={result.min_score}
            />

            <StatCard
              title="Max Score"
              value={result.max_score}
            />

            <StatCard
              title="Std Score"
              value={result.std_score}
            />

          </div>

          {/* Result */}
          <ResultTable
            records={result.records}
          />  

          {/* Score Chart */}
          <ScoreChart
            records={result.records}
          />  

          {/* SUMMARY */}
          <div className="p-4 border rounded">
            <h2 className="font-bold">Summary</h2>
            <p>{result.summary}</p>
          </div>

          {/* LLM Explanation */}
          <ExplanationCard
            explanation={result.llm_explanation}
          /> 

        </div>
      )}
    </div>
  );
}