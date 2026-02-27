const apiPaths = {
    products: `${import.meta.env.VITE_API_DOMAIN}/api/products?populate[0]=images&populate[1]=productCategory`,
    getProductURL: (documentId: string) => 
        `${import.meta.env.VITE_API_DOMAIN}/api/products/${documentId}?populate[0]=images&populate[1]=productCategory`,
    categories: `${import.meta.env.VITE_API_DOMAIN}/api/product-categories`
}

export default apiPaths