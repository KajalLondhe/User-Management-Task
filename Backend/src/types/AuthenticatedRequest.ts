import { Request } from 'express';

// Extend the Request interface to include the user property
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}


