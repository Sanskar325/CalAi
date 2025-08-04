import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalculationHistory from '@/hooks/useCalculationHistory';

const PercentageCalculator = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<string>('');

  const calculatePercentageOf = () => {
    const num = parseFloat(value1);
    const percentage = parseFloat(value2);
    
    if (isNaN(num) || isNaN(percentage)) return;
    
    const res = (percentage / 100) * num;
    setResult(res.toString());
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `${percentage}% of ${num}`,
      res.toString()
    );
  };

  const calculateWhatPercent = () => {
    const part = parseFloat(value1);
    const whole = parseFloat(value2);
    
    if (isNaN(part) || isNaN(whole) || whole === 0) return;
    
    const res = (part / whole) * 100;
    setResult(`${res.toFixed(2)}%`);
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `${part} is what % of ${whole}`,
      `${res.toFixed(2)}%`
    );
  };

  const calculatePercentageIncrease = () => {
    const original = parseFloat(value1);
    const newValue = parseFloat(value2);
    
    if (isNaN(original) || isNaN(newValue) || original === 0) return;
    
    const res = ((newValue - original) / original) * 100;
    setResult(`${res.toFixed(2)}%`);
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `% change from ${original} to ${newValue}`,
      `${res.toFixed(2)}%`
    );
  };

  const clear = () => {
    setValue1('');
    setValue2('');
    setResult('');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 backdrop-blur border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-primary">Percentage Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="percentage-of" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="percentage-of">% of</TabsTrigger>
            <TabsTrigger value="what-percent">What %</TabsTrigger>
            <TabsTrigger value="change">% Change</TabsTrigger>
          </TabsList>
          
          <TabsContent value="percentage-of" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="percent">Percentage</Label>
              <Input
                id="percent"
                type="number"
                placeholder="Enter percentage"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Of Number</Label>
              <Input
                id="number"
                type="number"
                placeholder="Enter number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <Button onClick={calculatePercentageOf} className="w-full">
              Calculate
            </Button>
          </TabsContent>
          
          <TabsContent value="what-percent" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="part">Part</Label>
              <Input
                id="part"
                type="number"
                placeholder="Enter part"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whole">Whole</Label>
              <Input
                id="whole"
                type="number"
                placeholder="Enter whole"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <Button onClick={calculateWhatPercent} className="w-full">
              Calculate
            </Button>
          </TabsContent>
          
          <TabsContent value="change" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="original">Original Value</Label>
              <Input
                id="original"
                type="number"
                placeholder="Enter original value"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Value</Label>
              <Input
                id="new"
                type="number"
                placeholder="Enter new value"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <Button onClick={calculatePercentageIncrease} className="w-full">
              Calculate
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-4">
          <Button onClick={clear} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/30 text-center">
            <div className="text-2xl font-bold text-primary">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PercentageCalculator;