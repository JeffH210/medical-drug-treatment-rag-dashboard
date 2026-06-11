"use client";

import { searchDrugs } from "@/lib/api";
import { useState, useRef, useEffect } from "react";

interface QueryBoxProps {
    onSearch: (query: string) => void;
}

export default function QueryBox({ onSearch }: QueryBoxProps) {
    const [input, setInput ] = useState("");
    const[suggestions, setSuggestions] = useState<string[]>([]);
    const boxRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if(input.trim() !== ""){
            onSearch(input);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.trim() !==""){
            onSearch(input);
        }
    };

    const handleFocus = async () => {
        const data = await searchDrugs("");
        setSuggestions(data.drugs);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={boxRef} className="relative flex gap-2 w-full max-w-md justify-start">
            <input 
                className="border rounded p-2 flex-1"
                type="text"
                placeholder="Enter drug query..."
                value={input}
                onFocus={handleFocus}
                onChange={ async (e) => {
                    const value = e.target.value;
                    setInput(value);

                    const data = await searchDrugs(value);
                    setSuggestions(data.drugs);
                }}
                onKeyDown={handleKeyPress}
            />

            {suggestions.length > 0 && (
                <ul className="
                    absolute top-full left-0 w-full mt-1 max-h-40 overflow-y-auto z-10 
                    bg-black/90 backdrop-blur-md border border-gray-700 rounded-md shadow-xl"
                >
                    
                    {suggestions.map((drug, idx) => (
                        <li
                            key={idx}
                            className="p-2 text-white hover:bg-gray-800 cursor-pointer transition"
                            onClick={() => {
                                setInput(drug);
                                setSuggestions([]);
                                onSearch(drug);
                            }}
                        >
                            {drug}
                        </li>
                    ))}
                </ul>
            )}

            <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick= {handleClick}
            >
                Search
            </button>   
             
        </div>
    );
}