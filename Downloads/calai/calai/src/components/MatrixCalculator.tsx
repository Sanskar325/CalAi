
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MatrixInput from './MatrixInput';
import MatrixDimensions from './MatrixDimensions';
import MatrixResult from './MatrixResult';
import { useMatrixCalculations } from '@/hooks/useMatrixCalculations';
import {
  Plus,
  Minus,
  X,
  Divide,
  RotateCw,
  Power,
  CircleSlash,
  CircleDot,
  Grid3X3,
  Calculator,
  Columns3,
} from 'lucide-react';

interface MatrixCalculatorProps {
  initialOperation?: string;
}

const matrixOperations = [
  { title: 'Add', icon: Plus, operation: 'add' },
  { title: 'Subtract', icon: Minus, operation: 'subtract' },
  { title: 'Multiply', icon: X, operation: 'multiply' },
  { title: 'Divide', icon: Divide, operation: 'divide' },
  { title: 'Transpose', icon: RotateCw, operation: 'transpose' },
  { title: 'Power', icon: Power, operation: 'power' },
  { title: 'Inverse Matrix', icon: CircleSlash, operation: 'inverse' },
  { title: 'Determinant', icon: CircleDot, operation: 'determinant' },
  { title: 'Matrix Rank', icon: Grid3X3, operation: 'rank' },
  { title: "Cramer's Rule", icon: Calculator, operation: 'cramer' },
  { title: 'Gauss Jordan', icon: Columns3, operation: 'gauss-jordan' },
];

const MatrixCalculator: React.FC<MatrixCalculatorProps> = ({ 
  initialOperation = 'add'
}) => {
  const [rows1, setRows1] = useState<number>(2);
  const [cols1, setCols1] = useState<number>(2);
  const [rows2, setRows2] = useState<number>(2);
  const [cols2, setCols2] = useState<number>(2);
  const [matrix1, setMatrix1] = useState<number[][]>([]);
  const [matrix2, setMatrix2] = useState<number[][]>([]);
  const [operation, setOperation] = useState<string>(initialOperation);

  const { result, calculateResult } = useMatrixCalculations();

  // Initialize matrices with proper dimensions when component mounts
  useEffect(() => {
    setMatrix1(createEmptyMatrix(rows1, cols1));
    setMatrix2(createEmptyMatrix(rows2, cols2));
  }, []);

  // Update when initial operation changes
  useEffect(() => {
    setOperation(initialOperation);
  }, [initialOperation]);

  const createEmptyMatrix = (rows: number, cols: number): number[][] => {
    return Array(rows).fill(0).map(() => Array(cols).fill(0));
  };

  const handleDimensionChange = (type: string, value: string, matrixNum: number) => {
    const numValue = parseInt(value);
    if (matrixNum === 1) {
      if (type === 'rows') {
        setRows1(numValue);
        setMatrix1(createEmptyMatrix(numValue, cols1));
      } else {
        setCols1(numValue);
        setMatrix1(createEmptyMatrix(rows1, numValue));
      }
    } else {
      if (type === 'rows') {
        setRows2(numValue);
        setMatrix2(createEmptyMatrix(numValue, cols2));
      } else {
        setCols2(numValue);
        setMatrix2(createEmptyMatrix(rows2, numValue));
      }
    }
  };

  const handleCalculate = () => {
    console.log("Calculating with operation:", operation);
    console.log("Matrix 1:", matrix1);
    console.log("Matrix 2:", matrix2);
    calculateResult(matrix1, matrix2, operation, rows1, cols1, rows2, cols2);
  };

  // Check if operation only requires one matrix
  const isSingleMatrixOperation = ['transpose', 'determinant', 'rank', 'inverse', 
    'binary', 'hexadecimal', 'decimal', 'octal'].includes(operation);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Matrix Calculator</h1>
      
      <div className="grid gap-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {matrixOperations.map((op) => (
            <Button
              key={op.operation}
              variant={operation === op.operation ? 'default' : 'outline'}
              className="flex items-center gap-2 w-full"
              onClick={() => setOperation(op.operation)}
            >
              <op.icon className="w-4 h-4" />
              <span>{op.title}</span>
            </Button>
          ))}
        </div>

        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Matrix 1</h2>
            <MatrixDimensions
              rows={rows1}
              cols={cols1}
              onDimensionChange={(type, value) => handleDimensionChange(type, value, 1)}
            />
            <MatrixInput
              matrix={matrix1}
              setMatrix={setMatrix1}
              rows={rows1}
              cols={cols1}
            />
          </div>

          {!isSingleMatrixOperation && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Matrix 2</h2>
              <MatrixDimensions
                rows={rows2}
                cols={cols2}
                onDimensionChange={(type, value) => handleDimensionChange(type, value, 2)}
              />
              <MatrixInput
                matrix={matrix2}
                setMatrix={setMatrix2}
                rows={rows2}
                cols={cols2}
              />
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full">
            Calculate Result
          </Button>

          <div className="bg-secondary/10 rounded-lg p-4">
            <MatrixResult result={result} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixCalculator;
