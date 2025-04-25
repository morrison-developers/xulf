import { z } from 'zod';

// ---------- Schemas ----------

export const moduleTypeSchema = z.string();

export const eventBindingSchema = z.object({
  event: z.string(),
  targetModuleId: z.string(),
  action: z.string(),
  params: z.record(z.any()).optional(),
});

export const moduleInstanceSchema = z.object({
  id: z.string(),
  type: moduleTypeSchema,
  props: z.record(z.string(), z.any()),
  customStyles: z.string().optional(),
  bindings: z.array(eventBindingSchema).optional(),
});

export const logicConnectionSchema = z.object({
  from: z.object({
    moduleId: z.string(),
    event: z.string(),
  }),
  to: z.object({
    moduleId: z.string(),
    action: z.string(),
  }),
});

export const siteJsonSchema = z.object({
  id: z.string(),
  name: z.string(),
  layout: z.object({
    rootModuleIds: z.array(z.string()),
    modules: z.record(z.string(), moduleInstanceSchema),
  }),
  functions: z.array(logicConnectionSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SiteJSONValidated = z.infer<typeof siteJsonSchema>;

// ---------- Validator Utility ----------

export function validateSiteJsonOrDefault(input: {
  id: string;
  name: string;
  layoutJson: unknown;
  createdAt: Date;
  updatedAt: Date;
}): SiteJSONValidated {
  const fallback: SiteJSONValidated = {
    id: input.id,
    name: input.name,
    layout: {
      rootModuleIds: [],
      modules: {},
    },
    functions: [],
    createdAt: input.createdAt.toISOString(),
    updatedAt: input.updatedAt.toISOString(),
  };

  const result = siteJsonSchema.safeParse(input.layoutJson ?? fallback);

  if (!result.success) {
    console.warn('Invalid layoutJson, using fallback:', result.error.format());
    return fallback;
  }

  return result.data;
}
