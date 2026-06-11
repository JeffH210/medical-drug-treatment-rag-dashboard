"use client";

import {
    ResponsiveContainer, 
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts"

interface ScoreChartProps {
    records: {
        dosage: string;
        sideEffect: string;
        score: number;
    }[];
}

export default function ScoreChart({
    records,
}: ScoreChartProps) {

    const chartData = records.map((records, idx) => ({
        name: `R${idx + 1}`,
        score: records.score
    }));

    return (
        <div className="rounded-x1 border border-slate-800 bg-slate-900 p-6 shadow">
            <h2 className="text-lg font-bold mb-4">
                Improvement Score Trend
            </h2>

            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#22c55e"
                            strokeWidth={3}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}