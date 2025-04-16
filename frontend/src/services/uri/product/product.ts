const PRODUCT_URL = "quan-tri/san-pham";
export const ProductUri = {
	GET_ALL_PRODUCTS: `${PRODUCT_URL}`,
	GET_PRODUCT_BY_ID: (id: string) => `${PRODUCT_URL}/${id}/sua`,
	GET_ALL_PRODUCTS_TRASH: `${PRODUCT_URL}/thung-rac`,
	ADD_PRODUCT: `${PRODUCT_URL}`,
	UPDATE_PRODUCT: (id: string) => `${PRODUCT_URL}/${id}`,
	SOFT_DELETE: (id: string) => `${PRODUCT_URL}/xoa/${id}`,
	RESTORE: (id: string) => `${PRODUCT_URL}/khoi-phuc/${id}`,
	DELETE: (id: string) => `${PRODUCT_URL}/xoa-vinh-vien/${id}`,
};
