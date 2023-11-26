<script lang="ts"> 
    import { page } from '$app/stores';
    import WordSearch from './WordSearch.svelte';

    export let words: string[] = [];

    let wordSorted: { title: string; length: number; words: string[] }[] = [];

    words.forEach(word => {
        const belongsTo = wordSorted.find(o => o.length === word.length);

        if( ! belongsTo ) {
            return wordSorted.push({
                title: `${word.length}-letter woorden`,
                length: word.length,
                words: [word]
            })
        }

        belongsTo.words.push(word);
    })

    $: wordSorted = [], words.forEach(word => {
        const belongsTo = wordSorted.find(o => o.length === word.length);

        if( ! belongsTo ) {
            return wordSorted.push({
                title: `${word.length}-letter woorden`,
                length: word.length,
                words: [word]
            })
        }

        belongsTo.words.push(word);
    })

    console.log(words)
</script>
<div class="p-4">
    <div class="text-center search-form">
        <h1>Woord maker</h1>
        <p>Maak woorden voor <i>WordFeud</i>, <i>World of Words</i>, <i>Words of Wonders</i> of andere woordspellen.</p>

        <WordSearch characters={$page.params.characters} />
    </div>

    <h2>{ $page.params.characters }</h2>
    <div class="result-table">
        {#each wordSorted as sorted}
            <div class="word-list">
                <h5>{ sorted.title }</h5>
    
                {#each sorted.words as word}
                    <span>{ word }</span>
                {/each}
            </div>
        {/each}
        {#if wordSorted.length === 0}
            <p class="error">We hebben geen combinaties kunnen maken van <i>'{ $page.params.characters }'</i></p>
        {/if}
    </div>
</div>
<style lang="scss">
    .search-form {
        max-width: 450px;
        margin: 0 auto 3rem;
    }

    .result-table {
        display: flex;
        column-gap: 2rem;
        flex-wrap: wrap;
        overflow: auto;
        height: calc(400px - 20px);
    }

    .word-list {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }
</style>