import { z } from 'zod';
declare const propertiesSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
export type IDisplayModeDemoCopilotComponentProperties = z.infer<typeof propertiesSchema>;
declare const _default: import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export default _default;
//# sourceMappingURL=DisplayModeDemoCopilotComponentProperties.d.ts.map