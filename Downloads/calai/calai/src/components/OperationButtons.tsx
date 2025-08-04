
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus, X, Divide, Percent } from 'lucide-react';

interface OperationButtonsProps {
  operation: string;
  setOperation: (operation: string) => void;
}

const OperationButtons: React.FC<OperationButtonsProps> = ({ operation, setOperation }) => {
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant={operation === 'add' ? 'default' : 'outline'}
        onClick={() => setOperation('add')}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add
      </Button>
      <Button
        variant={operation === 'subtract' ? 'default' : 'outline'}
        onClick={() => setOperation('subtract')}
      >
        <Minus className="w-4 h-4 mr-2" />
        Subtract
      </Button>
      <Button
        variant={operation === 'multiply' ? 'default' : 'outline'}
        onClick={() => setOperation('multiply')}
      >
        <X className="w-4 h-4 mr-2" />
        Multiply
      </Button>
      <Button
        variant={operation === 'divide' ? 'default' : 'outline'}
        onClick={() => setOperation('divide')}
      >
        <Divide className="w-4 h-4 mr-2" />
        Divide
      </Button>
      <Button
        variant={operation === 'percentage' ? 'default' : 'outline'}
        onClick={() => setOperation('percentage')}
      >
        <Percent className="w-4 h-4 mr-2" />
        Percentage
      </Button>
    </div>
  );
};

export default OperationButtons;
