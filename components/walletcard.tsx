
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, Trash, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface walletcard {
    accountnumber: number,
    privatekey: string,
    publickey: string,
    address: string,
    onDelete?: () => void  // Add this line
}

export default function WalletCard({ 
  accountnumber, 
  publickey, 
  privatekey, 
  address,
  onDelete  // Add this
}: walletcard) {
    const [showPrivateKey,setShowPrivateKey] = useState(false);
    const [copied,setCopied] = useState("");

    const handleCopy = (text:string, field:string)=>{
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(()=>setCopied(""),2000);
    }

    return (
        <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader className="border-b border-slate-800">
                <CardTitle className="text-lg font-bold text-cyan-400 flex items-center justify-between">
                <span>Account #{accountnumber}</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                        Wallet Address
                    </label>
                    <div className="flex items-center gap-2 bg-slate-950/50 border border-slate-700 rounded-lg p-3">
                        <code className="flex-1 text-sm text-white font-mono overflow-x-auto"> {address}</code>
                        <Button size="icon" variant="ghost" onClick={() => handleCopy(address, `address-${accountnumber}`)} className="h-8 w-8 text-cyan-400 hover:text-cyan-300">
                        {copied === `address-${accountnumber}` ? (
                            <span className="text-green-400">✓</span>
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        </Button>
                    </div>
                </div>

        
        {/* Public Key */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            Public Key
          </label>
          <div className="flex items-center gap-2 bg-slate-950/50 border border-slate-700 rounded-lg p-3">
            <code className="flex-1 text-sm text-slate-300 font-mono truncate">
              {publickey}
            </code>
            <Button size="icon" variant="ghost"onClick={() => handleCopy(publickey, `pubkey-${accountnumber}`)}
               className="h-8 w-8 text-cyan-400 hover:text-cyan-300">
              {copied === `pubkey-${accountnumber}` ? (
                <span className="text-green-400">✓</span>
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Private Key */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
            Private Key
            <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
              SENSITIVE
            </span>
          </label>
          <div className="flex items-center gap-2 bg-slate-950/50 border border-red-900/30 rounded-lg p-3">
            <code className="flex-1 text-sm text-slate-300 font-mono truncate">
              {showPrivateKey ? privatekey : "••••••••••••••••••••••••••••••••"}
            </code>
            <Button size="icon" variant="ghost" onClick={() => setShowPrivateKey(!showPrivateKey)} className="h-8 w-8 text-red-400 hover:text-red-300">
              {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            {showPrivateKey && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(privatekey, `privkey-${accountnumber}`)}
                className="h-8 w-8 text-cyan-400 hover:text-cyan-300"
              >
                {copied === `privkey-${accountnumber}` ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        {onDelete && (
          <Button
            onClick={onDelete}
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 text-red-400 hover:text-red-300 hover:bg-red-950/20 z-10">
            <Trash2Icon className="w-4 h-4" />
            </Button>
          )}

      </CardContent>
        </Card>
    );
}
