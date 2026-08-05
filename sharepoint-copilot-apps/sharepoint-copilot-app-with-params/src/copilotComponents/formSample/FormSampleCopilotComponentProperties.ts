/**
 * Properties schema for this Copilot Component.
 *
 * This schema is defined with Zod and exported as JSON Schema via
 * `zod-to-json-schema`. The manifest references the compiled `.js` default
 * export, which the Copilot host uses to validate and describe the tool
 * arguments that Copilot passes when invoking this component.
 *
 * To add more properties, extend the `z.object({...})` below — they will
 * automatically appear as tool parameters in the Copilot UI.
 */
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const propertiesSchema = z.object({
	username: z.string().optional().describe("Username for the form"),
	firstName: z.string().optional().describe("First name of the user"),
	lastName: z.string().optional().describe("Last name of the user"),
	role: z.enum(["Admin", "Editor", "Viewer"]).optional().describe("Role of the user"),
	creationDate: z.string().describe("Creation date for the user account, if not specified is the current date"),
});

export type IFormSampleCopilotComponentProperties = z.infer<typeof propertiesSchema>;

export default zodToJsonSchema(propertiesSchema);
