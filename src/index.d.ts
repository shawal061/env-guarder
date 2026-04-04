export interface ValidationRule {
    required?: boolean;
    type?: "string" | "number" | "boolean";
    default?: any;
    validate?: (value: any) => boolean | string;
}

export interface ValidationSchema {
    [key: string]: ValidationRule;
}

export interface ValidationOptions {
    exitOnError?: boolean;
}

export function validateEnv<T = any>(
    schema: ValidationSchema,
    options?: ValidationOptions
): T;
