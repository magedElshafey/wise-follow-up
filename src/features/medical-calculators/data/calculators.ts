import { CalculatorDefinition } from "../types/calculator.types";

export const calculators: CalculatorDefinition[] = [
    /* ================= BMI ================= */
    {
        id: "bmi",
        slug: "bmi-calculator",
        title: "BMI Calculator",
        category: "General health",
        description:
            "Calculate Body Mass Index using height and weight.",
        inputs: [
            { key: "weight", label: "Weight", type: "number", unit: "kg", required: true, min: 1 },
            { key: "height", label: "Height", type: "number", unit: "cm", required: true, min: 50 },
        ],
        calculate(values) {
            const h = values.height / 100;
            const bmi = values.weight / (h * h);
            return {
                value: bmi.toFixed(1),
                interpretation:
                    bmi < 18.5
                        ? "Underweight"
                        : bmi < 25
                            ? "Normal weight"
                            : bmi < 30
                                ? "Overweight"
                                : "Obese",
            };
        },
    },

    /* ================= eGFR ================= */
    {
        id: "egfr",
        slug: "egfr-calculator",
        title: "eGFR Calculator",
        category: "Renal",
        description:
            "Estimate kidney function using creatinine, age and sex.",
        inputs: [
            { key: "age", label: "Age", type: "number", required: true, min: 1 },
            { key: "creatinine", label: "Creatinine", type: "number", unit: "µmol/L", required: true },
            {
                key: "sex",
                label: "Sex",
                type: "radio",
                required: true,
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                ],
            },
        ],
        calculate(values) {
            const factor = values.sex === "female" ? 0.85 : 1;
            const egfr = (140 - values.age) * factor / values.creatinine;
            return {
                value: egfr.toFixed(1),
                interpretation:
                    egfr >= 90
                        ? "Normal kidney function"
                        : egfr >= 60
                            ? "Mildly reduced"
                            : egfr >= 30
                                ? "Moderate reduction"
                                : "Severely reduced",
            };
        },
    },

    /* ================= CHA2DS2-VASc ================= */
    {
        id: "cha2ds2vasc",
        slug: "cha2ds2-vasc-score",
        title: "CHA₂DS₂-VASc Score",
        category: "Cardiology",
        description:
            "Estimate stroke risk in patients with atrial fibrillation.",
        inputs: [
            { key: "age", label: "Age ≥ 75", type: "radio", options: [{ label: "Yes", value: 2 }, { label: "No", value: 0 }] },
            { key: "hypertension", label: "Hypertension", type: "radio", options: [{ label: "Yes", value: 1 }, { label: "No", value: 0 }] },
            { key: "diabetes", label: "Diabetes", type: "radio", options: [{ label: "Yes", value: 1 }, { label: "No", value: 0 }] },
        ],
        calculate(values) {
            const score = Object.values(values).reduce((a, b) => a + Number(b), 0);
            return {
                value: score,
                interpretation:
                    score >= 2
                        ? "High stroke risk – anticoagulation recommended"
                        : "Low to moderate risk",
            };
        },
    },

    /* ================= Blood Pressure ================= */
    {
        id: "bp",
        slug: "blood-pressure-classification",
        title: "Blood Pressure Classification",
        category: "Cardiology",
        description:
            "Classify blood pressure based on systolic and diastolic values.",
        inputs: [
            { key: "systolic", label: "Systolic", type: "number", unit: "mmHg", required: true },
            { key: "diastolic", label: "Diastolic", type: "number", unit: "mmHg", required: true },
        ],
        calculate(values) {
            const { systolic, diastolic } = values;
            let status = "Normal";
            if (systolic >= 140 || diastolic >= 90) status = "Hypertension";
            else if (systolic >= 130 || diastolic >= 80) status = "High-normal";
            return { value: status };
        },
    },

    /* ================= Waist-to-Hip ================= */
    {
        id: "whr",
        slug: "waist-to-hip-ratio",
        title: "Waist-to-Hip Ratio",
        category: "General health",
        description:
            "Assess health risk based on waist and hip measurements.",
        inputs: [
            { key: "waist", label: "Waist circumference", type: "number", unit: "cm", required: true },
            { key: "hip", label: "Hip circumference", type: "number", unit: "cm", required: true },
        ],
        calculate(values) {
            const ratio = values.waist / values.hip;
            return {
                value: ratio.toFixed(2),
                interpretation:
                    ratio > 0.9 ? "Increased health risk" : "Low risk",
            };
        },
    },
];
