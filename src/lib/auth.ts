// This is a placeholder file. We will fill this in next.
import { User } from "firebase/auth";

export function isAdminUser(user: User | null): boolean {
  if (!user) return false;
  return user.email === 'bijoy98@gmail.com';
}
