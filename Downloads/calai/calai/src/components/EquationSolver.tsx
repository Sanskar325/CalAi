import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalculationHistory from '@/hooks/useCalculationHistory';

const EquationSolver = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [result, setResult] = useState<string>('');

  const solveLinear = () => {
    const coeffA = parseFloat(a);
    const coeffB = parseFloat(b);
    
    if (isNaN(coeffA) || isNaN(coeffB) || coeffA === 0) {
      setResult('Invalid equation');
      return;
    }
    
    const x = -coeffB / coeffA;
    const res = `x = ${x.toFixed(4)}`;
    setResult(res);
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `${coeffA}x + ${coeffB} = 0`,
      res
    );
  };

  const solveQuadratic = () => {
    const coeffA = parseFloat(a);
    const coeffB = parseFloat(b);
    const coeffC = parseFloat(c);
    
    if (isNaN(coeffA) || isNaN(coeffB) || isNaN(coeffC) || coeffA === 0) {
      setResult('Invalid quadratic equation');
      return;
    }
    
    const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;
    
    if (discriminant < 0) {
      setResult('No real solutions');
    } else if (discriminant === 0) {
      const x = -coeffB / (2 * coeffA);
      setResult(`x = ${x.toFixed(4)}`);
    } else {
      const x1 = (-coeffB + Math.sqrt(discriminant)) / (2 * coeffA);
      const x2 = (-coeffB - Math.sqrt(discriminant)) / (2 * coeffA);
      setResult(`x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`);
    }
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `${coeffA}x² + ${coeffB}x + ${coeffC} = 0`,
      result
    );
  };

  const solveCubic = () => {
    const coeffA = parseFloat(a);
    const coeffB = parseFloat(b);
    const coeffC = parseFloat(c);
    const coeffD = parseFloat(d);
    
    if (isNaN(coeffA) || isNaN(coeffB) || isNaN(coeffC) || isNaN(coeffD) || coeffA === 0) {
      setResult('Invalid cubic equation');
      return;
    }
    
    // Simplified cubic solver using Cardano's method (approximate)
    const p = (3 * coeffA * coeffC - coeffB * coeffB) / (3 * coeffA * coeffA);
    const q = (2 * coeffB * coeffB * coeffB - 9 * coeffA * coeffB * coeffC + 27 * coeffA * coeffA * coeffD) / (27 * coeffA * coeffA * coeffA);
    
    const discriminant = (q/2) * (q/2) + (p/3) * (p/3) * (p/3);
    
    if (discriminant > 0) {
      const u = Math.cbrt(-q/2 + Math.sqrt(discriminant));
      const v = Math.cbrt(-q/2 - Math.sqrt(discriminant));
      const x = u + v - coeffB / (3 * coeffA);
      setResult(`x ≈ ${x.toFixed(4)}`);
    } else {
      setResult('Complex solutions (approximation needed)');
    }
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `${coeffA}x³ + ${coeffB}x² + ${coeffC}x + ${coeffD} = 0`,
      result
    );
  };

  const solveSystemLinear = () => {
    // Solve 2x2 system: ax + by = c, dx + ey = f
    const a1 = parseFloat(a);
    const b1 = parseFloat(b);
    const c1 = parseFloat(c);
    const a2 = parseFloat(d);
    
    // We'll use b as b1, c as c1, d as a2
    // Need another input for full system, simplified version
    if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(a2)) {
      setResult('Invalid system');
      return;
    }
    
    const det = a1 * a2 - b1 * c1;
    if (det === 0) {
      setResult('No unique solution');
      return;
    }
    
    setResult('Enter full 2x2 system for complete solution');
  };

  const clear = () => {
    setA('');
    setB('');
    setC('');
    setD('');
    setResult('');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 backdrop-blur border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-primary">Equation Solver</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="linear" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="linear">Linear</TabsTrigger>
            <TabsTrigger value="quadratic">Quadratic</TabsTrigger>
            <TabsTrigger value="cubic">Cubic</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="linear" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Solve: ax + b = 0
            </div>
            <div className="space-y-2">
              <Label htmlFor="a-linear">Coefficient a</Label>
              <Input
                id="a-linear"
                type="number"
                placeholder="Enter coefficient a"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="b-linear">Coefficient b</Label>
              <Input
                id="b-linear"
                type="number"
                placeholder="Enter coefficient b"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <Button onClick={solveLinear} className="w-full">
              Solve Linear Equation
            </Button>
          </TabsContent>
          
          <TabsContent value="quadratic" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Solve: ax² + bx + c = 0
            </div>
            <div className="space-y-2">
              <Label htmlFor="a-quad">Coefficient a</Label>
              <Input
                id="a-quad"
                type="number"
                placeholder="Enter coefficient a"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="b-quad">Coefficient b</Label>
              <Input
                id="b-quad"
                type="number"
                placeholder="Enter coefficient b"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-quad">Coefficient c</Label>
              <Input
                id="c-quad"
                type="number"
                placeholder="Enter coefficient c"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <Button onClick={solveQuadratic} className="w-full">
              Solve Quadratic Equation
            </Button>
          </TabsContent>
          
          <TabsContent value="cubic" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Solve: ax³ + bx² + cx + d = 0
            </div>
            <div className="space-y-2">
              <Label htmlFor="a-cubic">Coefficient a</Label>
              <Input
                id="a-cubic"
                type="number"
                placeholder="Enter coefficient a"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="b-cubic">Coefficient b</Label>
              <Input
                id="b-cubic"
                type="number"
                placeholder="Enter coefficient b"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-cubic">Coefficient c</Label>
              <Input
                id="c-cubic"
                type="number"
                placeholder="Enter coefficient c"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-cubic">Coefficient d</Label>
              <Input
                id="d-cubic"
                type="number"
                placeholder="Enter coefficient d"
                value={d}
                onChange={(e) => setD(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <Button onClick={solveCubic} className="w-full">
              Solve Cubic Equation
            </Button>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Solve System: ax + by = c, dx + ey = f
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="a"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="bg-secondary/50"
              />
              <Input
                type="number"
                placeholder="b"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            <Input
              type="number"
              placeholder="c"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="bg-secondary/50"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="d"
                value={d}
                onChange={(e) => setD(e.target.value)}
                className="bg-secondary/50"
              />
              <Label className="text-sm text-muted-foreground text-center">+ ey = f (coming soon)</Label>
            </div>
            <Button onClick={solveSystemLinear} className="w-full">
              Solve System
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
            <div className="text-lg font-bold text-primary">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EquationSolver;