import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface AngleUnitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  angleUnit: 'degree' | 'radian' | 'gradian';
  setAngleUnit: (unit: 'degree' | 'radian' | 'gradian') => void;
}

const AngleUnitDialog: React.FC<AngleUnitDialogProps> = ({
  isOpen,
  onClose,
  angleUnit,
  setAngleUnit,
}) => {
  if (!isOpen) return null;

  const getExample = (unit: string) => {
    switch (unit) {
      case 'radian':
        return {
          sinExample: 'Sin(π/2) = 1',
          sin90Example: 'Sin(90) = 0.893 996 663'
        };
      case 'degree':
        return {
          sinExample: 'Sin(90) = 1',
          sin90Example: 'Sin(π) = 0.054 803 665 1'
        };
      case 'gradian':
        return {
          sinExample: 'Sin(100) = 1',
          sin90Example: 'Sin(π) = 0.049 327 995 5'
        };
      default:
        return { sinExample: '', sin90Example: '' };
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 bg-black border-green-500/30">
        <CardHeader className="flex flex-row items-center justify-between border-b border-green-500/30">
          <CardTitle className="text-green-400">Angle unit</CardTitle>
          <Button
            onClick={onClose}
            size="sm"
            className="bg-gray-700 hover:bg-gray-600 text-green-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <RadioGroup
            value={angleUnit}
            onValueChange={(value) => setAngleUnit(value as 'degree' | 'radian' | 'gradian')}
            className="space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="radian" className="border-green-500" />
                <Label className="text-green-300 text-base">RADIAN</Label>
              </div>
              {angleUnit === 'radian' && (
                <div className="ml-6 space-y-1 text-sm">
                  <div className="text-green-400">{getExample('radian').sinExample}</div>
                  <div className="text-green-300">{getExample('radian').sin90Example}</div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="degree" className="border-green-500" />
                <Label className="text-green-300 text-base">DEGREE</Label>
              </div>
              {angleUnit === 'degree' && (
                <div className="ml-6 space-y-1 text-sm">
                  <div className="text-green-400">{getExample('degree').sinExample}</div>
                  <div className="text-green-300">{getExample('degree').sin90Example}</div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gradian" className="border-green-500" />
                <Label className="text-green-300 text-base">GRADIAN</Label>
              </div>
              {angleUnit === 'gradian' && (
                <div className="ml-6 space-y-1 text-sm">
                  <div className="text-green-400">{getExample('gradian').sinExample}</div>
                  <div className="text-green-300">{getExample('gradian').sin90Example}</div>
                </div>
              )}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default AngleUnitDialog;