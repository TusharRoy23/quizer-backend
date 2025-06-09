import { z, string } from "zod";
export const ParticipantPayloadDto = z.object({
    name: string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }).nonempty({ message: 'Name is required' }),
    email: string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({ message: 'Email is invalid' }),
    googleId: string()
});

export type ParticipantPayloadType = z.infer<typeof ParticipantPayloadDto>;