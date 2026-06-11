interface InsightCardProps {
    insight: string;
    avgScore: number;
}

export default function InsightCard({
    insight,
    avgScore,
}: InsightCardProps) {
    
    let cardStyle = "bg-yellow-950/40 border-yellow-500";
    let badgeStyle = "bg-yellow-500/20 text-yellow-300"
    let status = "Moderate"

    if(avgScore >=8) {
        cardStyle = "bg-green-950/40 border-green-500";
        badgeStyle = "bg-green-500/20 text-green-300";
        status = "High";

    } else if (avgScore < 6) {
        cardStyle = "bg-red-950/40 border-red-500"
        badgeStyle = "bg-red-500/20 text-red-300"
        status = "Low";
    }

    return (
        <div className={`rounded-xl border-1-4 p-6 shadow ${cardStyle}`}>
            <h2 className="text-lg font-bold mb-3">
                Clinical Insight
            </h2>

            <span className={`inline-block rounded-full bg-white px-3 py-1 text-sm font-medium ${badgeStyle}`}>
                {status} Effectiveness
            </span>

            <p className="mt-4 text-grey-300">
                {insight}
            </p>

            <p className="mt-2 text-sm text-gray-400">
                Average improvement Score: {avgScore}
            </p>
            
        </div>
    );
}