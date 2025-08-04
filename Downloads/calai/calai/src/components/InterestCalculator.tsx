import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalculationHistory from '@/hooks/useCalculationHistory';

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<{
    interest?: number;
    total?: number;
  } | null>(null);

  const calculateSimpleInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    
    if (isNaN(p) || isNaN(r) || isNaN(t)) return;
    
    const interest = (p * r * t) / 100;
    const total = p + interest;
    
    setResult({ interest, total });
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `Simple Interest: P=${p}, R=${r}%, T=${t}`,
      `Interest: ₹${interest.toFixed(2)}, Total: ₹${total.toFixed(2)}`
    );
  };

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    
    if (isNaN(p) || isNaN(r) || isNaN(t)) return;
    
    const amount = p * Math.pow((1 + r / 100), t);
    const interest = amount - p;
    
    setResult({ interest, total: amount });
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `Compound Interest: P=${p}, R=${r}%, T=${t}`,
      `Interest: ₹${interest.toFixed(2)}, Total: ₹${amount.toFixed(2)}`
    );
  };

  const clear = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 backdrop-blur border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-primary">Interest Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple</TabsTrigger>
            <TabsTrigger value="compound">Compound</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simple" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Principal Amount (₹)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="Enter principal amount"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="Enter interest rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Period (years)</Label>
              <Input
                id="time"
                type="number"
                placeholder="Enter time period"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <Button onClick={calculateSimpleInterest} className="w-full">
              Calculate Simple Interest
            </Button>
          </TabsContent>
          
          <TabsContent value="compound" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal-comp">Principal Amount (₹)</Label>
              <Input
                id="principal-comp"
                type="number"
                placeholder="Enter principal amount"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate-comp">Interest Rate (%)</Label>
              <Input
                id="rate-comp"
                type="number"
                placeholder="Enter interest rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-comp">Time Period (years)</Label>
              <Input
                id="time-comp"
                type="number"
                placeholder="Enter time period"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <Button onClick={calculateCompoundInterest} className="w-full">
              Calculate Compound Interest
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-4">
          <Button onClick={clear} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/30 space-y-2">
            <div className="flex justify-between">
              <span>Interest:</span>
              <span className="font-bold text-primary">₹{result.interest?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-bold text-primary">₹{result.total?.toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InterestCalculator;