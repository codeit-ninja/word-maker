<script lang="ts">
    import type { PageData } from './$types';
    import WordResults from '$lib/components/WordResults.svelte';
	
	export let data: PageData;
</script>
<div class="container-xl">
    <WordResults words={data.words} />
</div>