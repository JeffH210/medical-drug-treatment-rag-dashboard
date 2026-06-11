interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({
    title,
    value,
}: StatCardProps) {
    return(
        <div className="rounded-x1 border p-4 shadow">
            <h3 className="text-sm text-gray-400">
                {title}
            </h3>
            <p className="text-2xl font-bold mt-2">
                {value}
            </p>
            
        </div>
    );
}