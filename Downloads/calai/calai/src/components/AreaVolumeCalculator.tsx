import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculationHistory from '@/hooks/useCalculationHistory';

const AreaVolumeCalculator = () => {
  const [shape, setShape] = useState('');
  const [dimension1, setDimension1] = useState('');
  const [dimension2, setDimension2] = useState('');
  const [dimension3, setDimension3] = useState('');
  const [result, setResult] = useState<string>('');

  const calculateArea = () => {
    const d1 = parseFloat(dimension1);
    const d2 = parseFloat(dimension2);
    
    if (isNaN(d1)) return;
    
    let area = 0;
    let formula = '';
    
    switch (shape) {
      case 'rectangle':
        if (isNaN(d2)) return;
        area = d1 * d2;
        formula = `${d1} × ${d2}`;
        break;
      case 'circle':
        area = Math.PI * d1 * d1;
        formula = `π × ${d1}²`;
        break;
      case 'triangle':
        if (isNaN(d2)) return;
        area = 0.5 * d1 * d2;
        formula = `0.5 × ${d1} × ${d2}`;
        break;
      case 'square':
        area = d1 * d1;
        formula = `${d1}²`;
        break;
      default:
        return;
    }
    
    const res = `${area.toFixed(2)} sq units`;
    setResult(res);
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `Area of ${shape}: ${formula}`,
      res
    );
  };

  const calculateVolume = () => {
    const d1 = parseFloat(dimension1);
    const d2 = parseFloat(dimension2);
    const d3 = parseFloat(dimension3);
    
    if (isNaN(d1)) return;
    
    let volume = 0;
    let formula = '';
    
    switch (shape) {
      case 'cube':
        volume = d1 * d1 * d1;
        formula = `${d1}³`;
        break;
      case 'sphere':
        volume = (4/3) * Math.PI * d1 * d1 * d1;
        formula = `(4/3)π × ${d1}³`;
        break;
      case 'cylinder':
        if (isNaN(d2)) return;
        volume = Math.PI * d1 * d1 * d2;
        formula = `π × ${d1}² × ${d2}`;
        break;
      case 'rectangular-prism':
        if (isNaN(d2) || isNaN(d3)) return;
        volume = d1 * d2 * d3;
        formula = `${d1} × ${d2} × ${d3}`;
        break;
      default:
        return;
    }
    
    const res = `${volume.toFixed(2)} cubic units`;
    setResult(res);
    
    CalculationHistory.getInstance().addEntry(
      'scientific',
      `Volume of ${shape}: ${formula}`,
      res
    );
  };

  const clear = () => {
    setShape('');
    setDimension1('');
    setDimension2('');
    setDimension3('');
    setResult('');
  };

  const getDimensionLabels = (type: string, shape: string) => {
    if (type === 'area') {
      switch (shape) {
        case 'rectangle': return ['Length', 'Width'];
        case 'circle': return ['Radius'];
        case 'triangle': return ['Base', 'Height'];
        case 'square': return ['Side'];
        default: return [];
      }
    } else {
      switch (shape) {
        case 'cube': return ['Side'];
        case 'sphere': return ['Radius'];
        case 'cylinder': return ['Radius', 'Height'];
        case 'rectangular-prism': return ['Length', 'Width', 'Height'];
        default: return [];
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 backdrop-blur border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-primary">Area & Volume Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="area" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
          </TabsList>
          
          <TabsContent value="area" className="space-y-4">
            <div className="space-y-2">
              <Label>Shape</Label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangle">Rectangle</SelectItem>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {shape && getDimensionLabels('area', shape).map((label, index) => (
              <div key={index} className="space-y-2">
                <Label>{label}</Label>
                <Input
                  type="number"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={index === 0 ? dimension1 : dimension2}
                  onChange={(e) => index === 0 ? setDimension1(e.target.value) : setDimension2(e.target.value)}
                  className="bg-secondary/50"
                />
              </div>
            ))}
            
            {shape && (
              <Button onClick={calculateArea} className="w-full">
                Calculate Area
              </Button>
            )}
          </TabsContent>
          
          <TabsContent value="volume" className="space-y-4">
            <div className="space-y-2">
              <Label>Shape</Label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cube">Cube</SelectItem>
                  <SelectItem value="sphere">Sphere</SelectItem>
                  <SelectItem value="cylinder">Cylinder</SelectItem>
                  <SelectItem value="rectangular-prism">Rectangular Prism</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {shape && getDimensionLabels('volume', shape).map((label, index) => (
              <div key={index} className="space-y-2">
                <Label>{label}</Label>
                <Input
                  type="number"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={index === 0 ? dimension1 : index === 1 ? dimension2 : dimension3}
                  onChange={(e) => {
                    if (index === 0) setDimension1(e.target.value);
                    else if (index === 1) setDimension2(e.target.value);
                    else setDimension3(e.target.value);
                  }}
                  className="bg-secondary/50"
                />
              </div>
            ))}
            
            {shape && (
              <Button onClick={calculateVolume} className="w-full">
                Calculate Volume
              </Button>
            )}
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

export default AreaVolumeCalculator;