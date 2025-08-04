import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Copy } from 'lucide-react';

const NumberConverter = () => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState('');
  const [fromBase, setFromBase] = useState('10');
  const [toBase, setToBase] = useState('2');
  const [result, setResult] = useState('');

  const baseOptions = [
    { value: '2', label: 'Binary (Base 2)' },
    { value: '8', label: 'Octal (Base 8)' },
    { value: '10', label: 'Decimal (Base 10)' },
    { value: '16', label: 'Hexadecimal (Base 16)' },
  ];

  const convertNumber = () => {
    try {
      if (!inputValue.trim()) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a number to convert",
        });
        return;
      }

      // Convert from source base to decimal first
      let decimalValue: number;
      if (fromBase === '2') {
        // Validate binary input
        if (!/^[01]+$/.test(inputValue)) {
          throw new Error('Invalid binary number. Use only 0 and 1.');
        }
        decimalValue = parseInt(inputValue, 2);
      } else if (fromBase === '8') {
        // Validate octal input
        if (!/^[0-7]+$/.test(inputValue)) {
          throw new Error('Invalid octal number. Use only digits 0-7.');
        }
        decimalValue = parseInt(inputValue, 8);
      } else if (fromBase === '10') {
        // Validate decimal input
        if (!/^\d+$/.test(inputValue)) {
          throw new Error('Invalid decimal number. Use only digits 0-9.');
        }
        decimalValue = parseInt(inputValue, 10);
      } else if (fromBase === '16') {
        // Validate hexadecimal input
        if (!/^[0-9A-Fa-f]+$/.test(inputValue)) {
          throw new Error('Invalid hexadecimal number. Use only digits 0-9 and letters A-F.');
        }
        decimalValue = parseInt(inputValue, 16);
      } else {
        throw new Error('Invalid source base');
      }

      if (isNaN(decimalValue)) {
        throw new Error('Invalid number format');
      }

      // Convert from decimal to target base
      let convertedValue: string;
      if (toBase === '2') {
        convertedValue = decimalValue.toString(2);
      } else if (toBase === '8') {
        convertedValue = decimalValue.toString(8);
      } else if (toBase === '10') {
        convertedValue = decimalValue.toString(10);
      } else if (toBase === '16') {
        convertedValue = decimalValue.toString(16).toUpperCase();
      } else {
        throw new Error('Invalid target base');
      }

      setResult(convertedValue);
      toast({
        title: "Success",
        description: "Number converted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Conversion failed",
      });
      setResult('');
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied",
        description: "Result copied to clipboard",
      });
    }
  };

  const swapBases = () => {
    const tempBase = fromBase;
    setFromBase(toBase);
    setToBase(tempBase);
    setInputValue(result);
    setResult(inputValue);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="border-0 shadow-lg" style={{ boxShadow: 'var(--shadow-green)' }}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Number System Converter
          </CardTitle>
          <p className="text-muted-foreground">
            Convert numbers between Binary, Octal, Decimal, and Hexadecimal
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <Label htmlFor="from-base" className="text-lg font-semibold">From</Label>
              <Select value={fromBase} onValueChange={setFromBase}>
                <SelectTrigger id="from-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {baseOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Enter number to convert"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.trim())}
                className="text-lg"
              />
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <Label htmlFor="to-base" className="text-lg font-semibold">To</Label>
              <Select value={toBase} onValueChange={setToBase}>
                <SelectTrigger id="to-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {baseOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <Input
                  placeholder="Conversion result"
                  value={result}
                  readOnly
                  className="text-lg pr-10"
                />
                {result && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyResult}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={convertNumber}
              className="flex items-center gap-2 px-8 py-3 text-lg font-semibold"
              style={{ background: 'var(--gradient-primary)' }}
            >
              Convert <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={swapBases}
              className="flex items-center gap-2"
            >
              Swap Bases
            </Button>
          </div>

          {/* Quick Examples */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Quick Examples:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>
                <strong>Binary:</strong> 1010
              </div>
              <div>
                <strong>Octal:</strong> 12
              </div>
              <div>
                <strong>Decimal:</strong> 10
              </div>
              <div>
                <strong>Hex:</strong> A
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberConverter;