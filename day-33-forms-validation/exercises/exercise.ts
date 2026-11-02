export function createFormManager(
  initial: Record<string, any>,
  validate: (v: any) => Record<string, string>,
) {
  // TODO: Implement createFormManager
  let values = { ...initial };
  let touched: Record<string, boolean> = {};

  return {
    getValues: () => ({ ...values }),
    setValue: (field: string, val: any) => {
      values[field] = val;
      touched[field] = true;
    },
    getErrors: () => validate(values),
    isValid: () => Object.keys(validate(values)).length === 0,
  };
}
