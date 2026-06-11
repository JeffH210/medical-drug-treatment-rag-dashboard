interface ResultTableProps {
    records: {
        dosage: string;
        sideEffect: string;
        score: number;
    }[];
}

export default function ResultTable({
    records,
}: ResultTableProps) {
    return(
        <div className="rounded-x1 border p-4 shadow">
            <h2 className="text-sm text-gray-400">
                Retrieved Records
            </h2>

            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-700">
                        <th className="text-left py-2">Dosage</th>
                        <th className="text-left py-2">Side Effect</th>
                        <th className="text-left py-2">Improvement Score</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map((record, index) => (
                        <tr
                            key={index}
                            className="border-b border-slate-800"
                        >
                            <td className="py-3">
                                {record.dosage}
                            </td>

                            <td className="py-3">
                                {record.sideEffect}
                            </td>

                            <td className="py-3">
                                {record.score}
                            </td>   
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}