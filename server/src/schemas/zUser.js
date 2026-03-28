const { z } = require("zod");

const userValidationSchema = z.object({
  firebaseId: z
    .string({ required_error: "Firebase ID is required" })
    .min(1, "Firebase ID cannot be empty"),

  firstName: z
    .string({ required_error: "First name is required" })
    .min(2, "First name must be at least 2 characters")
    .max(50),

  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required")
    .max(50),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),

  avatar: z
    .string()
    .url("Avatar must be a valid URL")
    .optional()
    .or(z.literal("")), // Allows empty string if no image is uploaded

  provider: z
    .string({ required_error: "Provider is required" })
    .min(1, "Provider cannot be empty"),
});

module.exports = { userValidationSchema };
