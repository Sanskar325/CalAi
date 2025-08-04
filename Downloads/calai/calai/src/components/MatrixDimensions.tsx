
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MatrixDimensionsProps {
  rows: number;
  cols: number;
  onDimensionChange: (type: string, value: string) => void;
  label?: string;
}

const MatrixDimensions: React.FC<MatrixDimensionsProps> = ({
  rows,
  cols,
  onDimensionChange,
  label = 'Matrix'
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <Label>Rows</Label>
        <Select
          value={rows.toString()}
          onValueChange={(value) => onDimensionChange('rows', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            {[2, 3, 4].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <Label>Columns</Label>
        <Select
          value={cols.toString()}
          onValueChange={(value) => onDimensionChange('cols', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Columns" />
          </SelectTrigger>
          <SelectContent>
            {[2, 3, 4].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MatrixDimensions;
