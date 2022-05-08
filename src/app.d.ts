/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		userid: string;
	}

	// interface Platform {}

	// interface Session {}

	// interface Stuff {}
}

export type TemplateID = string;

export type Template = {
	id: TemplateID,
	title: string,
	content: string,
	length: number,
	records: Record[],
};

export type Record = {
	date: Date,
	time: number,
	template: TemplateID,
}