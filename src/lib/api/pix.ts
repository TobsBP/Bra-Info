import { type PixParticipant, pixArraySchema } from '@/lib/schemas/pix.schema';
import { brasilApiClient } from './client';

export async function fetchPixParticipants(): Promise<PixParticipant[]> {
	const { data } = await brasilApiClient.get('/pix');
	return pixArraySchema.parse(data);
}
