import { useState } from "react";
import MainInput from "@/common/components/inputs/MainInput";
import MainSelect from "@/common/components/inputs/MainSelect";
import { CalculatorDefinition } from "../types/calculator.types";
import CalculatorResult from "./CalculatorResult";

const CalculatorForm = ({
  calculator,
}: {
  calculator: CalculatorDefinition;
}) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);

  const submit = () => {
    setResult(calculator.calculate(values));
  };

  return (
    <div className="space-y-5">
      {calculator.inputs.map((input) => {
        if (input.type === "number") {
          return (
            <MainInput
              key={input.key}
              label={input.label}
              type="number"
              placeholder={input.unit}
              value={values[input.key] ?? ""}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  [input.key]: Number(e.target.value),
                }))
              }
            />
          );
        }

        if (input.type === "radio") {
          return (
            <MainSelect
              key={input.key}
              label={input.label}
              options={
                input.options?.map((o, i) => ({
                  id: i,
                  name: o.label,
                  value: o.value,
                })) as any
              }
              onSelect={(opt: any) =>
                setValues((v) => ({ ...v, [input.key]: opt.value }))
              }
            />
          );
        }

        return null;
      })}

      <button
        onClick={submit}
        className="rounded-pill bg-primary px-6 py-2 text-white"
      >
        Calculate
      </button>

      {result && <CalculatorResult result={result} />}
    </div>
  );
};

export default CalculatorForm;
