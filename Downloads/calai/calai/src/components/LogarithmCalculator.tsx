import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalculationHistory from '@/hooks/useCalculationHistory';

const LogarithmCalculator = () => {
  const [value, setValue] = useState('');
  const [base, setBase] = useState('');
  const [result, setResult] = useState<string>('');

  const calculateNaturalLog = () => {
    const num = parseFloat(value);
    
    if (isNaN(num) || num <= 0) {
      setResult('Invalid input (must be positive)');
      return;
    }
    
    const res = Math.log(num);
    setResult(res.toFixed(6));
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `ln(${num})`,
      res.toFixed(6)
    );
  };

  const calculateLog10 = () => {
    const num = parseFloat(value);
    
    if (isNaN(num) || num <= 0) {
      setResult('Invalid input (must be positive)');
      return;
    }
    
    const res = Math.log10(num);
    setResult(res.toFixed(6));
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `log₁₀(${num})`,
      res.toFixed(6)
    );
  };

  const calculateLogBase = () => {
    const num = parseFloat(value);
    const baseNum = parseFloat(base);
    
    if (isNaN(num) || isNaN(baseNum) || num <= 0 || baseNum <= 0 || baseNum === 1) {
      setResult('Invalid input');
      return;
    }
    
    const res = Math.log(num) / Math.log(baseNum);
    setResult(res.toFixed(6));
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `log₍${baseNum}₎(${num})`,
      res.toFixed(6)
    );
  };

  const calculateAntilog = () => {
    const num = parseFloat(value);
    const baseNum = parseFloat(base) || 10;
    
    if (isNaN(num)) {
      setResult('Invalid input');
      return;
    }
    
    const res = Math.pow(baseNum, num);
    setResult(res.toFixed(6));
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `${baseNum}^${num}`,
      res.toFixed(6)
    );
  };

  const calculateExponential = () => {
    const num = parseFloat(value);
    
    if (isNaN(num)) {
      setResult('Invalid input');
      return;
    }
    
    const res = Math.exp(num);
    setResult(res.toFixed(6));
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `e^${num}`,
      res.toFixed(6)
    );
  };

  const clear = () => {
    setValue('');
    setBase('');
    setResult('');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 backdrop-blur border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-primary">Logarithm Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="natural" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="natural">ln</TabsTrigger>
            <TabsTrigger value="common">log₁₀</TabsTrigger>
            <TabsTrigger value="custom">logₓ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="natural" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Natural Logarithm (base e)
            </div>
            <div className="space-y-2">
              <Label htmlFor="value-ln">Value</Label>
              <Input
                id="value-ln"
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={calculateNaturalLog} className="w-full">
                Calculate ln(x)
              </Button>
              <Button onClick={calculateExponential} variant="outline" className="w-full">
                Calculate eˣ
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="common" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Common Logarithm (base 10)
            </div>
            <div className="space-y-2">
              <Label htmlFor="value-log10">Value</Label>
              <Input
                id="value-log10"
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={calculateLog10} className="w-full">
                Calculate log₁₀(x)
              </Button>
              <Button onClick={() => {setBase('10'); calculateAntilog();}} variant="outline" className="w-full">
                Calculate 10ˣ
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Custom Base Logarithm
            </div>
            <div className="space-y-2">
              <Label htmlFor="base-custom">Base</Label>
              <Input
                id="base-custom"
                type="number"
                placeholder="Enter base"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value-custom">Value</Label>
              <Input
                id="value-custom"
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={calculateLogBase} className="w-full">
                Calculate logₓ(value)
              </Button>
              <Button onClick={calculateAntilog} variant="outline" className="w-full">
                Calculate baseˣ
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-4">
          <Button onClick={clear} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/30 text-center">
            <div className="text-lg font-bold text-primary">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LogarithmCalculator;