import { Pill } from "lucide-react";

interface DrugInfoCardProps {
    drug: string;
    condition: string;
}

export default function DrugInfoCard({
    drug,
    condition,
}: DrugInfoCardProps) {
    return(
        <div className="rounded-x1 border p-6 shadow">

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                 <h2 className="text-lg font-bold">
                    Drug Information
                </h2>

                <Pill className="w-5 h-5" />
            </div>

             {/* Content */}
            <div className="space-y-2">
                <p>
                    <span className="font-semibold">
                        Drug:
                    </span>{" "}
                    {drug}
                </p>
                
                <p>
                   <span className="font-semibold">
                        Condition:
                    </span>{" "}
                    {condition} 
                </p>
            </div>
            
        </div>
    );
}