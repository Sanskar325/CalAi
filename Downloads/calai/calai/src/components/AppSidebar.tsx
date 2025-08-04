
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Binary,
  Calculator,
  RefreshCw,
  Grid3X3,
  TrendingUp,
  Equal,
  Ruler,
  Percent,
  PieChart,
  Activity,
  Atom,
  FlaskConical,
  BookOpen,
  User,
  LogIn,
  Clock,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface OperationItem {
  title: string;
  icon: React.ElementType;
  operation: string;
  onClick?: () => void;
}

const calculatorOperations: OperationItem[] = [
  { title: 'Number Converter', icon: RefreshCw, operation: 'converter' },
  { title: 'Scientific Calculator', icon: Calculator, operation: 'scientific' },
  { title: 'Matrix Calculator', icon: Grid3X3, operation: 'matrix' },
];

const businessOperations: OperationItem[] = [
  { title: 'Profit & Loss', icon: TrendingUp, operation: 'profit-loss' },
  { title: 'Percentage Calculator', icon: Percent, operation: 'percentage' },
  { title: 'Interest Calculator', icon: PieChart, operation: 'interest' },
];

const algebraOperations: OperationItem[] = [
  { title: 'Equation Solver', icon: Equal, operation: 'equation-solver' },
  { title: 'Area & Volume', icon: Ruler, operation: 'area-volume' },
  { title: 'Logarithm Calculator', icon: Activity, operation: 'logarithm' },
];

const formulaOperations: OperationItem[] = [
  { title: 'Physics Formulas', icon: Atom, operation: 'physics-formulas' },
  { title: 'Chemistry Formulas', icon: FlaskConical, operation: 'chemistry-formulas' },
];

interface AppSidebarProps {
  onOperationSelect: (operation: string) => void;
}

const AppSidebar = ({ onOperationSelect }: AppSidebarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Basic Calculators</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {calculatorOperations.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onOperationSelect(item.operation)}
                  >
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Business & Finance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessOperations.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onOperationSelect(item.operation)}
                  >
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Advanced Math</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {algebraOperations.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onOperationSelect(item.operation)}
                  >
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Formula Reference</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {formulaOperations.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onOperationSelect(item.operation)}
                  >
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onOperationSelect('history')}
                >
                  <Clock className="mr-2" />
                  <span>History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {user ? (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate('/account')}>
                    <User className="mr-2" />
                    <span>My Account</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate('/auth')}>
                    <LogIn className="mr-2" />
                    <span>Sign In</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
