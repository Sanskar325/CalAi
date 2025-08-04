import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlaskConical, Beaker } from 'lucide-react';

const ChemistryFormulas = () => {
  const generalFormulas = [
    { 
      name: "Ideal Gas Law", 
      formula: "PV = nRT", 
      example: "At STP: P = 1 atm, V = 22.4L for n = 1 mole, T = 273K, R = 0.082"
    },
    { 
      name: "Molarity", 
      formula: "M = moles/L", 
      example: "2 moles of NaCl in 1L water: Molarity = 2/1 = 2M"
    },
    { 
      name: "pH Scale", 
      formula: "pH = -log[H⁺]", 
      example: "If [H⁺] = 1×10⁻³ M, then pH = -log(10⁻³) = 3"
    },
    { 
      name: "Molality", 
      formula: "m = moles solute/kg solvent", 
      example: "1 mole sugar in 2kg water: molality = 1/2 = 0.5m"
    },
  ];

  const gasLawFormulas = [
    { 
      name: "Boyle's Law", 
      formula: "P₁V₁ = P₂V₂", 
      example: "P₁ = 2 atm, V₁ = 4L → at P₂ = 8 atm: V₂ = (2×4)/8 = 1L"
    },
    { 
      name: "Charles's Law", 
      formula: "V₁/T₁ = V₂/T₂", 
      example: "V₁ = 2L at T₁ = 300K → at T₂ = 600K: V₂ = (2×600)/300 = 4L"
    },
    { 
      name: "Gay-Lussac's Law", 
      formula: "P₁/T₁ = P₂/T₂", 
      example: "P₁ = 1 atm at T₁ = 273K → at T₂ = 546K: P₂ = (1×546)/273 = 2 atm"
    },
  ];

  const concentrationFormulas = [
    { 
      name: "Mass Percentage", 
      formula: "% = (mass solute/mass solution) × 100", 
      example: "10g salt in 90g water: % = (10/100) × 100 = 10%"
    },
    { 
      name: "Parts Per Million", 
      formula: "ppm = (mass solute/mass solution) × 10⁶", 
      example: "1mg pollutant in 1kg water: ppm = (0.001/1000) × 10⁶ = 1 ppm"
    },
    { 
      name: "Normality", 
      formula: "N = M × valency", 
      example: "1M H₂SO₄ (valency = 2): Normality = 1 × 2 = 2N"
    },
  ];

  const renderFormulaSection = (title: string, formulas: any[], icon: React.ReactNode) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-orange-600/20 rounded-lg border border-orange-500/30">
        {icon}
        <h3 className="text-xl font-semibold text-orange-400">{title}</h3>
      </div>
      <div className="grid gap-3">
        {formulas.map((item, index) => (
          <div key={index} className="p-4 bg-gray-900 rounded border border-orange-500/20">
            <div className="font-medium text-orange-300 mb-2">{item.name}</div>
            <div className="text-orange-400 font-mono text-lg mb-2">{item.formula}</div>
            <div className="text-orange-200/70 text-sm italic">Example: {item.example}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="border-orange-500/30 shadow-lg bg-black text-orange-400">
        <CardHeader className="text-center border-b border-orange-500/30">
          <CardTitle className="text-2xl font-bold text-orange-400 flex items-center justify-center gap-3">
            <FlaskConical className="h-8 w-8" />
            Chemistry Formulas & Examples
          </CardTitle>
          <p className="text-orange-300/70">
            Essential chemistry formulas with practical examples
          </p>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          {renderFormulaSection("General Chemistry", generalFormulas, <Beaker className="h-6 w-6 text-orange-400" />)}
          {renderFormulaSection("Gas Laws", gasLawFormulas, <FlaskConical className="h-6 w-6 text-orange-400" />)}
          {renderFormulaSection("Concentration", concentrationFormulas, <Beaker className="h-6 w-6 text-orange-400" />)}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChemistryFormulas;