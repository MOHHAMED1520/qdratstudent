import { healthHandler } from '../../lib/handlers.js';
export default healthHandler;
export const config = { path: '/api/health', preferStatic: true };
