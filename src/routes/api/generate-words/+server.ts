import { executeAlgorithm, getLatestDictionary } from '$lib/helpers'
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const formData = await request.formData();
    const data = await Object.fromEntries(formData);
    const words = executeAlgorithm( data.characters as string )
    
    return json( { words } )
}

export async function GET() {
    //getLatestDictionary()

    const options: ResponseInit = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    //console.log(executeAlgorithm( data.characters as string ) )
    return json( executeAlgorithm( 'test' ) )
}