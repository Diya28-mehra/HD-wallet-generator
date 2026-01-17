"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, Sparkles, ShieldCheck, AlertTriangle, Loader2, Trash2 } from "lucide-react";
import * as bip39 from 'bip39';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import WalletCard from './walletcard'; // Your existing component
import { useEffect,useState } from "react";

// Type definition for wallet
interface WalletType {
  accountnumber: number;
  publickey: string;
  privatekey: string;
  address: string;
  path?: string;
}

const Main = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [mnemonic, setMnemonic] = useState<string>("");
  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const storedMnemonic = localStorage.getItem("mnemonic");
    const storedWallets = localStorage.getItem("wallets");

    if (storedMnemonic) {
      setMnemonic(storedMnemonic);
    }

    if (storedWallets) {
      const parsedWallets: WalletType[] = JSON.parse(storedWallets);
      setWallets(parsedWallets);
    }
  }, [mounted]);

  if (!mounted) return null;

  // Generate new wallet
  const handleGenerateWallet = async () => {
    setLoading(true);
    setError("");
    
    try {
      let currentMnemonic = mnemonic.trim();

      // If no mnemonic, generate new one
      if (!currentMnemonic) {
        currentMnemonic = bip39.generateMnemonic(128);
        setMnemonic(currentMnemonic);
        localStorage.setItem("mnemonic", currentMnemonic);
      } else {
        // Validate existing mnemonic
        const isValid = bip39.validateMnemonic(currentMnemonic);
        if (!isValid) {
          setError("❌ Invalid mnemonic phrase!");
          setLoading(false);
          return;
        }
        localStorage.setItem("mnemonic", currentMnemonic);
      }

      // Generate wallet from mnemonic
      const seed = bip39.mnemonicToSeedSync(currentMnemonic);
      const path = `m/44'/501'/${wallets.length}'/0'`;
      const derivedSeed = derivePath(path, seed.toString('hex')).key;
      const keypair = Keypair.fromSeed(derivedSeed);

      const newWallet: WalletType = {
        accountnumber: wallets.length,
        publickey: keypair.publicKey.toBase58(),
        privatekey: Buffer.from(keypair.secretKey).toString('hex'),
        address: keypair.publicKey.toBase58(),
        path: path
      };

      const updatedWallets: WalletType[] = [...wallets, newWallet];
      setWallets(updatedWallets);
      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`❌ Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Clear all wallets
  const handleClearWallet = () => {
    if (!confirm('Are you sure you want to clear all wallets? This cannot be undone!')) {
      return;
    }
    localStorage.removeItem("mnemonic");
    localStorage.removeItem("wallets");
    setMnemonic("");
    setWallets([]);
  };

  // Delete single wallet
  const deleteWallet = (index: number) => {
    const updatedWallets: WalletType[] = wallets.filter((_, i) => i !== index);
    setWallets(updatedWallets);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse [animation-delay:1000ms]" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Wallet className="w-14 h-14 text-cyan-400 animate-bounce [animation-duration:3s]" />
              <div className="absolute inset-0 blur-xl bg-cyan-400 opacity-50 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              CRYPTOVAULT
            </h1>
          </div>
          <p className="text-lg md:text-xl text-slate-400 font-semibold tracking-wide">
            Solana HD Wallet Generator 
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-cyan-400 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>SOLANA • SECURE • NON-CUSTODIAL</span>
          </div>
        </div>

        {/* Warning Banner */}
        <Alert className="mb-8 max-w-3xl mx-auto border-amber-500/50 bg-amber-950/20 backdrop-blur-sm">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <AlertDescription className="text-amber-200 font-medium">
            <strong className="text-amber-400">Security Warning:</strong> Never share your seed phrase with anyone. 
          </AlertDescription>
        </Alert>

        {/* Main Card */}
        <Card className="max-w-3xl mx-auto border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
          <CardHeader className="space-y-3 border-b border-slate-800 pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              Generate Your Solana Wallet
            </CardTitle>
            <CardDescription className="text-base text-slate-400">
              Enter an existing mnemonic phrase to recover, or leave blank to generate new
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            {/* Error Message */}
            {error && (
              <Alert className="border-red-500/50 bg-red-950/20">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            {/* Mnemonic Input */}
            <div className="space-y-2">
              <div className="relative group">
                <Input
                  type="text"
                  placeholder="word1 word2 word3 ... (leave empty for new wallet)"
                  value={mnemonic}
                  onChange={(e) => setMnemonic(e.target.value)}
                  disabled={loading}
                  className="h-14 bg-slate-950/50 border-2 border-slate-700 focus:border-cyan-500 text-white placeholder:text-slate-600 font-mono text-sm transition-all duration-300"
                />
              </div>
              <p className="text-xs text-slate-500 font-mono">
                • Leave empty to generate new • Enter existing to recover
                {mnemonic && <span className="text-cyan-400 block mt-1">• Mnemonic loaded from storage</span>}
              </p>
            </div>

            {/* Action Buttons */}
            {wallets.length === 0 ? (
              // Show only Generate button when no wallets
              <Button
                onClick={handleGenerateWallet}
                disabled={loading}
                className="w-full h-16 text-lg font-bold bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-lg transition-all duration-300 disabled:opacity-50">
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    GENERATING...
                  </>
                ) : (
                  <>
                    <Wallet className="w-6 h-6 mr-2" />
                    GENERATE WALLET
                  </>
                )}
              </Button>
            ) : (
              // Show Add + Clear buttons when wallets exist
              <div className="flex gap-3">
                <Button
                  onClick={handleGenerateWallet}
                  disabled={loading}
                  className="flex-1 h-14 text-lg font-bold bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-lg transition-all duration-300 disabled:opacity-50">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ADDING...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-5 h-5 mr-2" />
                      ADD WALLET
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleClearWallet}
                  variant="outline"
                  className="h-14 px-6 border-red-500/50 text-red-400 hover:bg-red-950/20 hover:border-red-400">
                  <Trash2 className="w-5 h-5 mr-2" />
                  CLEAR ALL
                </Button>
              </div>
            )}

            {/* Mnemonic Display */}
            {mnemonic && (
              <Card className="border-cyan-500/30 bg-slate-950/50 animate-in fade-in slide-in-from-bottom duration-500">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-400">🔑 Your Seed Phrase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                    <div className="grid grid-cols-3 gap-3">
                      {mnemonic.split(' ').map((word, index) => (
                        <div key={index} className="flex items-center gap-2 font-mono text-sm">
                          <span className="text-slate-500 text-xs">{index + 1}.</span>
                          <span className="text-white">{word}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-amber-400 mt-2">
                    ⚠️ Save this phrase safely. You'll need it to recover your wallets.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Wallets Display */}
            {wallets.length > 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-purple-400">
                    💼 Your Wallets ({wallets.length})
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {wallets.map((wallet, index) => (
                    <WalletCard key={index} accountnumber={wallet.accountnumber} publickey={wallet.publickey} privatekey={wallet.privatekey} address={wallet.address}onDelete={() => deleteWallet(index)}/>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
      <div className="text-center mt-12 space-y-3">
  {/* First Line - GitHub Star */}
  <div className="flex items-center justify-center gap-2">
    <span className="text-sm text-slate-400">Give it a</span>
    <a 
      href="https://github.com/Diya28-mehra"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors group"
    >
      
      <span className="text-sm font-semibold">⭐ on GitHub</span>
      <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    </a>
  </div>

  {/* Second Line - Connect with me */}
  <div className="flex items-center justify-center gap-2">
    <span className="text-sm text-slate-400">Connect with me:</span>
    <a 
      href="https://www.linkedin.com/in/diymehra/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 transition-colors"
    >  
      <svg className="w-4 h-4 hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
    <a 
      href="https://x.com/itsdiyamehra"
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-400 hover:text-slate-200 transition-colors"
    >
      <svg className="w-4 h-4 hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>
  </div>
  
  <p className="text-xs text-slate-500 font-mono pt-1">
    Built with ❤️ by Diya Mehra
  </p>
</div>
        
      </div>
    </div>
  );
};

export default Main;
