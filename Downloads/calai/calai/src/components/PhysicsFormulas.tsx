import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Atom, Calculator } from 'lucide-react';

const PhysicsFormulas = () => {
  const mechanicsFormulas = [
    { 
      name: "Newton's Second Law", 
      formula: "F = ma", 
      example: "If mass = 10kg and acceleration = 5m/s², then Force = 10 × 5 = 50N"
    },
    { 
      name: "Kinetic Energy", 
      formula: "KE = ½mv²", 
      example: "For mass = 2kg moving at 10m/s: KE = ½ × 2 × 10² = 100J"
    },
    { 
      name: "Potential Energy", 
      formula: "PE = mgh", 
      example: "Object of 5kg at height 10m: PE = 5 × 9.8 × 10 = 490J"
    },
    { 
      name: "Momentum", 
      formula: "p = mv", 
      example: "Car of 1000kg moving at 20m/s: p = 1000 × 20 = 20,000 kg⋅m/s"
    },
  ];

  const electricityFormulas = [
    { 
      name: "Ohm's Law", 
      formula: "V = IR", 
      example: "Current = 2A, Resistance = 10Ω: Voltage = 2 × 10 = 20V"
    },
    { 
      name: "Electrical Power", 
      formula: "P = VI = I²R = V²/R", 
      example: "For V=12V, I=3A: Power = 12 × 3 = 36W"
    },
    { 
      name: "Electrical Energy", 
      formula: "E = Pt", 
      example: "100W bulb for 5 hours: Energy = 100 × 5 = 500Wh"
    },
  ];

  const wavesFormulas = [
    { 
      name: "Wave Speed", 
      formula: "v = fλ", 
      example: "Frequency = 50Hz, Wavelength = 2m: Speed = 50 × 2 = 100m/s"
    },
    { 
      name: "Wave Period", 
      formula: "T = 1/f", 
      example: "Frequency = 60Hz: Period = 1/60 = 0.0167 seconds"
    },
  ];

  const renderFormulaSection = (title: string, formulas: any[], icon: React.ReactNode) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
        {icon}
        <h3 className="text-xl font-semibold text-blue-400">{title}</h3>
      </div>
      <div className="grid gap-3">
        {formulas.map((item, index) => (
          <div key={index} className="p-4 bg-gray-900 rounded border border-blue-500/20">
            <div className="font-medium text-blue-300 mb-2">{item.name}</div>
            <div className="text-blue-400 font-mono text-lg mb-2">{item.formula}</div>
            <div className="text-blue-200/70 text-sm italic">Example: {item.example}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="border-blue-500/30 shadow-lg bg-black text-blue-400">
        <CardHeader className="text-center border-b border-blue-500/30">
          <CardTitle className="text-2xl font-bold text-blue-400 flex items-center justify-center gap-3">
            <Atom className="h-8 w-8" />
            Physics Formulas & Examples
          </CardTitle>
          <p className="text-blue-300/70">
            Essential physics formulas with practical examples
          </p>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          {renderFormulaSection("Mechanics", mechanicsFormulas, <Calculator className="h-6 w-6 text-blue-400" />)}
          {renderFormulaSection("Electricity", electricityFormulas, <Atom className="h-6 w-6 text-blue-400" />)}
          {renderFormulaSection("Waves", wavesFormulas, <Calculator className="h-6 w-6 text-blue-400" />)}
        </CardContent>
      </Card>
    </div>
  );
};

export default PhysicsFormulas;