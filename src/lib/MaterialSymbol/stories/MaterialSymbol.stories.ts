import type { Meta, StoryObj } from '@storybook/svelte';
import MaterialSymbol from '../MaterialSymbol.svelte';
import MaterialSymbolUsage from '$lib/MaterialSymbol/stories/MaterialSymbolUsage.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Components/MaterialSymbol',
	component: MaterialSymbol,
	tags: ['autodocs'],
	args: {
		filled: true,
		theme: 'outlined',
		weight: '500'
	},
	argTypes: {
		icon: {
			control: {
				disable: true
			}
		},
		color: {
			control: {
				type: 'color'
			}
		}
	}
} satisfies Meta<MaterialSymbol>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
	args: {
		icon: 'read_more'
	},
	render: (props) => ({
		props,
		Component: MaterialSymbolUsage
	})
};
