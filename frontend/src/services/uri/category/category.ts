const CATEGORY_URL = "quan-tri/danh-muc";
export const categoryUri = {
	GET_ALL_CATEGORIES: `${CATEGORY_URL}`,
	GET_ALL_CATEGORIES_TRASH: `${CATEGORY_URL}/thung-rac`,
	ADD_CATEGORY: `${CATEGORY_URL}`,
	UPDATE_CATEGORY: (id: string) => `${CATEGORY_URL}/${id}`,
	SOFT_DELETE: (id: string) => `${CATEGORY_URL}/xoa/${id}`,
	RESTORE: (id: string) => `${CATEGORY_URL}/khoi-phuc/${id}`,
	DELETE: (id: string) => `${CATEGORY_URL}/xoa-vinh-vien/${id}`,
};
