"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface mneumoniccard {
    mnemonic: string
}

export default function MneumonicCard ({ mnemonic }: { mnemonic: string }) {
    const [showmnemonic,setshowmnemonic] = useState(false);
    const [copied,setCopied] = useState(false);

    const handlecopy = (()=>{
        navigator.clipboard.writeText(mnemonic);
        setCopied(true);
        setTimeout(()=>setCopied(false),2000);
    })

    const words = mnemonic.split(" ");

    return (
    <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader className="pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                🔑 Seed Phrase
            </CardTitle>
            
            <div className="flex gap-2">
                {/* Show/Hide Button */}
                <Button
                size="sm"
                variant="outline"
                onClick={() => setshowmnemonic(!showmnemonic)}
                className="border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400"
                >
                {showmnemonic ? (
                    <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide
                    </>
                ) : (
                    <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show
                    </>
                )}
                </Button>

                {/* Copy Button */}
                <Button size="sm" variant="outline" onClick={handlecopy} className="border-slate-700 text-slate-300 hover:text-green-400 hover:border-green-400">
                {copied ? (<><span className="text-green-400 mr-2">✓</span>Copied</>) : (<><Copy className="h-4 w-4 mr-2" />Copy All</>
)}
                </Button>
            </div>
            </div>
        </CardHeader>
        
        <CardContent className="pt-6">
            {/* Words Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {words.map((word, index) => (
                <div
                key={index}
                className="relative bg-slate-950/50 border border-slate-700 rounded-lg p-3 hover:border-cyan-500/50 transition-all duration-300"
                >
                {/* Word Number */}
                <div className="absolute top-1 left-2 text-[10px] text-slate-500 font-mono">
                    {index + 1}
                </div>
                
                {/* Word */}
                <div className="pt-3 text-center">
                    <span
                    className={`text-sm font-mono font-semibold transition-all duration-300 ${
                        showmnemonic 
                        ? "text-white" 
                        : "text-transparent bg-slate-700 rounded px-2 py-1 select-none blur-sm"
                    }`}
                    >
                    {word}
                    </span>
                </div>
                </div>
            ))}
            </div>

            {/* Warning */}
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400 text-center font-medium">
                ⚠️ <strong>Never share your seed phrase!</strong> Anyone with access can control your wallet.
            </p>
            </div>
        </CardContent>
        </Card>


    )

}