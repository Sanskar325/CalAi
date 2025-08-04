import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Calculator, Atom, FlaskConical } from 'lucide-react';

interface FormulaReferenceProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormulaReference: React.FC<FormulaReferenceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const mathFormulas = [
    { 
      name: "Quadratic Formula", 
      formula: "x = (-b ± √(b² - 4ac)) / 2a",
      example: "For x² - 5x + 6 = 0: x = (5 ± √(25-24))/2 = 2 or 3"
    },
    { 
      name: "Area of Circle", 
      formula: "A = πr²",
      example: "For radius = 5: A = π × 5² = 25π ≈ 78.54"
    },
    { 
      name: "Volume of Sphere", 
      formula: "V = (4/3)πr³",
      example: "For radius = 3: V = (4/3)π × 3³ = 36π ≈ 113.1"
    },
    { 
      name: "Pythagorean Theorem", 
      formula: "a² + b² = c²",
      example: "For sides a=3, b=4: c = √(9+16) = √25 = 5"
    },
    { 
      name: "Distance Formula", 
      formula: "d = √((x₂-x₁)² + (y₂-y₁)²)",
      example: "Points (1,2) to (4,6): d = √((4-1)² + (6-2)²) = √25 = 5"
    },
    { 
      name: "Law of Cosines", 
      formula: "c² = a² + b² - 2ab·cos(C)",
      example: "Triangle: a=5, b=7, angle C=60°: c = √(25+49-70×0.5) = √39"
    },
    { 
      name: "Sum of Arithmetic Series", 
      formula: "S = n/2(2a + (n-1)d)",
      example: "Series 2,5,8,11,14: S = 5/2(2×2 + 4×3) = 5/2×16 = 40"
    },
    { 
      name: "Compound Interest", 
      formula: "A = P(1 + r/n)^(nt)",
      example: "$1000 at 5% annually for 3 years: A = 1000(1.05)³ = $1157.63"
    },
    { 
      name: "Slope Formula", 
      formula: "m = (y₂-y₁)/(x₂-x₁)",
      example: "Points (2,3) to (6,7): m = (7-3)/(6-2) = 4/4 = 1"
    },
    { 
      name: "Area of Triangle", 
      formula: "A = ½bh",
      example: "Base = 8, Height = 6: A = ½ × 8 × 6 = 24"
    }
  ];


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 h-[80vh] bg-black border-green-500/30">
        <CardHeader className="flex flex-row items-center justify-between border-b border-green-500/30">
          <CardTitle className="text-green-400">Formula Reference</CardTitle>
          <Button
            onClick={onClose}
            size="sm"
            className="bg-gray-700 hover:bg-gray-600 text-green-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[60vh]">
            <div className="p-6 space-y-6">
              {/* Math Formulas */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-600/20 rounded-lg border border-green-500/30">
                  <Calculator className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-green-400">Math Formulas</h3>
                </div>
                <div className="grid gap-3">
                  {mathFormulas.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-900 rounded border border-green-500/20">
                      <div className="font-medium text-green-300">{item.name}</div>
                      <div className="text-green-400 font-mono text-sm mt-1">{item.formula}</div>
                      <div className="text-gray-400 text-xs mt-2">Example: {item.example}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaReference;