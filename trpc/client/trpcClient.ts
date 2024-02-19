import type { AppRouter } from '../routers/_app';
import { createTRPCReact } from '@trpc/react-query';


export const trpc = createTRPCReact<AppRouter>({});

