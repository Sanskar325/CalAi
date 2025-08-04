import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';

interface CalculatorSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  angleUnit: 'degree' | 'radian' | 'gradian';
  setAngleUnit: (unit: 'degree' | 'radian' | 'gradian') => void;
  outputFormat: 'decimal' | 'fraction';
  setOutputFormat: (format: 'decimal' | 'fraction') => void;
  impliedMultiplication: boolean;
  setImpliedMultiplication: (value: boolean) => void;
  percentageType: 'standard' | 'additive';
  setPercentageType: (type: 'standard' | 'additive') => void;
}

const CalculatorSettings: React.FC<CalculatorSettingsProps> = ({
  isOpen,
  onClose,
  angleUnit,
  setAngleUnit,
  outputFormat,
  setOutputFormat,
  impliedMultiplication,
  setImpliedMultiplication,
  percentageType,
  setPercentageType,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 bg-black border-green-500/30">
        <CardHeader className="flex flex-row items-center justify-between border-b border-green-500/30">
          <CardTitle className="text-green-400">Settings</CardTitle>
          <Button
            onClick={onClose}
            size="sm"
            className="bg-gray-700 hover:bg-gray-600 text-green-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Tabs defaultValue="common" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="common" className="text-green-400">Common</TabsTrigger>
              <TabsTrigger value="display" className="text-green-400">Display</TabsTrigger>
              <TabsTrigger value="keyboard" className="text-green-400">Keyboard</TabsTrigger>
              <TabsTrigger value="format" className="text-green-400">Format</TabsTrigger>
            </TabsList>

            <TabsContent value="common" className="space-y-4">
              <div>
                <Label className="text-green-400 text-base">Angle unit</Label>
                <RadioGroup
                  value={angleUnit}
                  onValueChange={(value) => setAngleUnit(value as 'degree' | 'radian' | 'gradian')}
                  className="flex gap-2 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="degree" className="border-green-500" />
                    <Label className="text-green-300">DEGREE</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="radian" className="border-green-500" />
                    <Label className="text-green-300">RADIAN</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gradian" className="border-green-500" />
                    <Label className="text-green-300">GRADIAN</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-4">
              <div>
                <Label className="text-green-400 text-base">Default output</Label>
                <RadioGroup
                  value={outputFormat}
                  onValueChange={(value) => setOutputFormat(value as 'decimal' | 'fraction')}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fraction" className="border-green-500" />
                    <Label className="text-green-300">Fraction</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="decimal" className="border-green-500" />
                    <Label className="text-green-300">Decimal</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="keyboard" className="space-y-4">
              <div>
                <Label className="text-green-400 text-base">Implied multiplication</Label>
                <RadioGroup
                  value={impliedMultiplication ? "enabled" : "disabled"}
                  onValueChange={(value) => setImpliedMultiplication(value === "enabled")}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disabled" className="border-green-500" />
                    <Label className="text-green-300">1/2π = 1/2*π</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enabled" className="border-green-500" />
                    <Label className="text-green-300">1/2π = 1/(2*π)</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="format" className="space-y-4">
              <div>
                <Label className="text-green-400 text-base">Percentage calculation type</Label>
                <RadioGroup
                  value={percentageType}
                  onValueChange={(value) => setPercentageType(value as 'standard' | 'additive')}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" className="border-green-500" />
                    <Label className="text-green-300">100 + 20% = 100.2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="additive" className="border-green-500" />
                    <Label className="text-green-300">100 + 20% = 120</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorSettings;