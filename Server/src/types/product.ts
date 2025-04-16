export interface Variant {
	id: string;
	combination: Record<string, string>;
	price: string;
	stock: number;
}
export interface Variation {
	id: string;
	name: string;
	options: string[];
}
export interface Image {
    url: string
    fileName: string
}

export interface IProduct {
	_id: string;
	name: string;
    slug:string
	description: string;
	category: string;
	price: string;
	status: string;
	images: Image[];
	variations: Variation[];
	variants: Variant[];
}
