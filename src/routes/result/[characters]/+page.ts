import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const formData = new FormData();
    formData.append('characters', params.characters);

    const request = await fetch('/api/generate-words', {
        method: 'post',
        body: formData
    })
    const response = await request.blob()
    const json = JSON.parse(await response.text())

    return {
        words: json.words,
        sorted: json.sorted
    }
    //console.log(request.json())
};