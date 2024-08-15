<script>
	import { iconKeys } from '$lib/types';
	import MaterialSymbol from '$lib/MaterialSymbol/MaterialSymbol.svelte';
</script>

<div>
	{#each iconKeys as key}
		<div style="display: inline-flex; flex-direction: column; align-items: center; margin: 1em;">
			<MaterialSymbol {...$$props} icon={key} />
		</div>
	{/each}
</div>
