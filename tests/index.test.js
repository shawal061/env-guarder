import { describe, it, expect } from 'vitest';
import { validateEnv } from '../src/index.js';

describe('validateEnv', () => {
    it('should validate successful environment', () => {
        process.env.PORT = '3000';
        process.env.DB_URL = 'postgres://localhost';
        
        const schema = {
            PORT: { required: true, type: 'number' },
            DB_URL: { required: true, type: 'string' },
            DEBUG: { default: false, type: 'boolean' }
        };

        const result = validateEnv(schema, { exitOnError: false });
        expect(result.PORT).toBe(3000);
        expect(result.DB_URL).toBe('postgres://localhost');
        expect(result.DEBUG).toBe(false);
    });

    it('should fail if required variable is missing', () => {
        delete process.env.MISSING_VAR;
        const schema = {
            MISSING_VAR: { required: true }
        };

        expect(() => validateEnv(schema, { exitOnError: false })).toThrow();
    });

    it('should fail if type mismatch (number)', () => {
        process.env.INVALID_NUM = 'abc';
        const schema = {
            INVALID_NUM: { type: 'number' }
        };

        expect(() => validateEnv(schema, { exitOnError: false })).toThrow();
    });

    it('should fail if type mismatch (boolean)', () => {
        process.env.INVALID_BOOL = 'not-a-bool';
        const schema = {
            INVALID_BOOL: { type: 'boolean' }
        };

        expect(() => validateEnv(schema, { exitOnError: false })).toThrow();
    });

    it('should handle boolean values "true" and "false"', () => {
        process.env.VAR_TRUE = 'true';
        process.env.VAR_FALSE = 'false';
        const schema = {
            VAR_TRUE: { type: 'boolean' },
            VAR_FALSE: { type: 'boolean' }
        };

        const result = validateEnv(schema, { exitOnError: false });
        expect(result.VAR_TRUE).toBe(true);
        expect(result.VAR_FALSE).toBe(false);
    });

    it('should handle custom validation', () => {
        process.env.CUSTOM = 'bad-value';
        const schema = {
            CUSTOM: { 
                validate: (v) => v === 'good-value' || 'Value must be "good-value"'
            }
        };

        expect(() => validateEnv(schema, { exitOnError: false })).toThrow(/Variable CUSTOM failed custom validation: Value must be "good-value"/);
    });
});
