<script lang="ts">
    import type { ActionResult } from '@sveltejs/kit';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    export let characters = '';

    const handler = () => {
		return ({ result }: { result: ActionResult<{ words: string[] }> }) => {
            if( result.type === 'success' ) {
                goto(`/result/${characters}`);
            }
		}
	}
</script>

<form 
    method="post" 
    action="/?/generate"
    use:enhance={handler}
>
    <div class="form-input">
        <div class="form-group">
            <input type="text" name="characters" placeholder="jkash?fd" bind:value={characters} />
            <button type="submit" class="primary">
                <svg height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g id="ARROW_48" data-name="ARROW 48"><path d="m123.1 504.82a24 24 0 0 0 33.94 0l231.86-231.82a24 24 0 0 0 0-33.94l-231.9-231.88a24 24 0 0 0 -33.9 33.94l214.9 214.88-214.9 214.88a24 24 0 0 0 0 33.94z"/></g></svg>
            </button>
        </div>
        <small>Gebruik een ? voor een letter die onbekent is, bijvoorbeeld een joker.</small>
    </div>
</form>