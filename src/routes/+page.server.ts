import type { Actions } from './$types';

export const actions = {
	generate: async ({ request, fetch }) => {
        const formData = await request.formData();		
        const requestWords = await fetch('/api/generate-words', {
            method: 'POST',
            body: formData
        })

        return {
            words: await requestWords.json() as Promise<string[]>
        };
	},
} satisfies Actions;