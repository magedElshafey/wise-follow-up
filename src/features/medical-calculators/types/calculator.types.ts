export type CalculatorInputType =
    | "number"
    | "select"
    | "radio";

export interface CalculatorInput {
    key: string;
    label: string;
    type: CalculatorInputType;
    unit?: string;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    options?: { label: string; value: string | number }[];
}

export interface CalculatorResult {
    value: number | string;
    interpretation?: string;
}

export interface CalculatorDefinition {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    inputs: CalculatorInput[];
    calculate: (values: Record<string, any>) => CalculatorResult;
}
