import path from 'path';
import fse from 'fs-extra';
import got from 'got';
import Logger from './Logger';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatedIconsPath = path.join(__dirname, `../../src/lib`);

const initialIconKeysTemplate = (
	concatenatedLinesWithComma: string,
	concatenatedLinesWithPipe: string
) => `\
// This file is generated automatically
// Run \`yarn generate:keys\` to update

export const iconKeys: readonly IconKey[] = [${concatenatedLinesWithComma}] as const;
export type IconKey = ${concatenatedLinesWithPipe};
`;

const writeFile = (
	lines: string[],
	filename: string,
	initialTemplate: (concatenatedLinesWithComma: string, concatenatedLinesWithPipe: string) => string
) => {
	const generatedIconKeysFilePath = path.resolve(generatedIconsPath, filename);

	const concatenatedLinesWithComma = lines.join(',');
	const concatenatedLinesWithPipe = lines.join('|');

	const template = initialTemplate(concatenatedLinesWithComma, concatenatedLinesWithPipe);

	fse.writeFileSync(generatedIconKeysFilePath, template, {
		flag: 'w',
		encoding: 'utf-8'
	});
};

export const generateIconKeysFile = async () => {
	const logger = new Logger('generate-icon-files');

	const response = await got(
		'https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true'
	);

	let data = response.body;

	data = data.substring(data.indexOf('\n'));

	const { icons } = JSON.parse(data) as {
		icons: {
			name: string;
			unsupported_families: string[];
		}[];
	};

	const iconNames = icons
		.filter((i) => i.unsupported_families.some((f) => f.includes('Icons')))
		.map((i) => i.name);

	const iconKeys = [...new Set(iconNames)].map((i) => `'${i}'`);

	await fse.mkdir(generatedIconsPath, { recursive: true });

	writeFile(iconKeys, 'types.ts', initialIconKeysTemplate);

	logger.success(`Generated all files`);
};
