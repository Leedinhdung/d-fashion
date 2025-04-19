import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập tên'),
    email: z.string().email('Vui lòng nhập email'),
    password: z.string().min(8, 'Vui lòng nhập mật khẩu'),
    password_confirmation: z.string(),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: 'Mật khẩu không khớp',
    path: ['password_confirmation'],
  });

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ!'),
  password: z.string().min(8, 'Mật khẩu phải có 8 kí tự'),
});

export type LoginFormFields = z.infer<typeof loginSchema>;
export type RegisterFormFields = z.infer<typeof registerSchema>;