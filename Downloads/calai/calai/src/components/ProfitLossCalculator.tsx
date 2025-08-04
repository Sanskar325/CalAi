import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CalculationHistory from '@/hooks/useCalculationHistory';

const ProfitLossCalculator = () => {
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [result, setResult] = useState<{
    profit?: number;
    loss?: number;
    profitPercentage?: number;
    lossPercentage?: number;
  } | null>(null);

  const calculate = () => {
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);

    if (isNaN(cp) || isNaN(sp) || cp <= 0) return;

    const difference = sp - cp;
    const percentage = (Math.abs(difference) / cp) * 100;

    if (difference > 0) {
      setResult({
        profit: difference,
        profitPercentage: percentage,
      });
      
      CalculationHistory.getInstance().addEntry(
        'scientific',
        `Profit: CP=${cp}, SP=${sp}`,
        `Profit: ₹${difference.toFixed(2)} (${percentage.toFixed(2)}%)`
      );
    } else {
      setResult({
        loss: Math.abs(difference),
        lossPercentage: percentage,
      });
      
      CalculationHistory.getInstance().addEntry(
        'scientific',
        `Loss: CP=${cp}, SP=${sp}`,
        `Loss: ₹${Math.abs(difference).toFixed(2)} (${percentage.toFixed(2)}%)`
      );
    }
  };

  const clear = () => {
    setCostPrice('');
    setSellingPrice('');
    setResult(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 backdrop-blur border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-primary">Profit & Loss Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price (₹)</Label>
          <Input
            id="costPrice"
            type="number"
            placeholder="Enter cost price"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            className="bg-secondary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price (₹)</Label>
          <Input
            id="sellingPrice"
            type="number"
            placeholder="Enter selling price"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className="bg-secondary/50"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clear} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/30 space-y-2">
            {result.profit !== undefined ? (
              <>
                <div className="flex justify-between items-center">
                  <span>Profit:</span>
                  <Badge variant="default" className="bg-green-600">
                    ₹{result.profit.toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Profit %:</span>
                  <Badge variant="default" className="bg-green-600">
                    {result.profitPercentage?.toFixed(2)}%
                  </Badge>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span>Loss:</span>
                  <Badge variant="destructive">
                    ₹{result.loss?.toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Loss %:</span>
                  <Badge variant="destructive">
                    {result.lossPercentage?.toFixed(2)}%
                  </Badge>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfitLossCalculator;