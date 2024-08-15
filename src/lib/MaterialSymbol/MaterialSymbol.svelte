<script lang="ts">
	import type { IconKey } from '$lib/types';
	import 'material-symbols/index.css';

	export let icon: IconKey;
	export let filled = false;
	export let theme: 'outlined' | 'rounded' | 'sharp' = 'outlined';
	export let weight: '100' | '200' | '300' | '400' | '500' | '600' | '700' = '500';
	export let size: '20' | '24' | '40' | '48' | number = '48';
	export let grade: '-25' | '0' | '200' = '0';
	export let color: string = 'currentColor';

	$: fontVariationSettings = `'wght' ${weight}, 'FILL' ${
		filled ? 1 : 0
	}, 'GRAD' ${grade}, "opsz" ${size}`;
</script>

<span
	class={`material-symbols-${theme}`}
	style:font-variation-settings={fontVariationSettings}
	style:color
	>{icon}
</span>
