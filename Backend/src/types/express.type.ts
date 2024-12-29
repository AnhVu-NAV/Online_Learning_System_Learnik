import { Request } from 'express';
import { UserPayload } from './user.type';

export interface RequestCustom extends Request {
	user?: UserPayload;
}
