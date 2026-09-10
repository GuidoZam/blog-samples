import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
var propertiesSchema = z.object({
    message: z.string().describe('A message to display.')
});
export default zodToJsonSchema(propertiesSchema);
//# sourceMappingURL=DisplayModeDemoCopilotComponentProperties.js.map