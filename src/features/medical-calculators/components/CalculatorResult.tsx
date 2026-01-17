const CalculatorResult = ({ result }: { result: any }) => {
  return (
    <section
      className="rounded-card bg-primary-soft p-4 mt-6"
      role="status"
      aria-live="polite"
    >
      <p className="font-semibold text-text-main">Result: {result.value}</p>
      {result.interpretation && (
        <p className="text-sm text-text-muted mt-1">{result.interpretation}</p>
      )}
    </section>
  );
};

export default CalculatorResult;
