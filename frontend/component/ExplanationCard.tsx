import { Brain } from "lucide-react";

interface ExplanationCardProps {
    explanation: string;
}

export default function ExplanationCard({
    explanation,
}: ExplanationCardProps) {
    return(
        <div className="rounded-x1 border border-slate-800 bg-slate-900 p-6 shadow">

            <div className="flex items-center gap-2 mb-4">

                <h2 className="text-lg font-bold">
                    AI Clinical Explanation
                </h2>

                <Brain className="w-5 h-5 text-cyan-400" />

            </div>

            <p className="text-slate-300 leading-7">
                {explanation}
            </p>

        </div>
    );
}