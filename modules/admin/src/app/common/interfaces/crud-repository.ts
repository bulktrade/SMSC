export interface CrudRepository {
    deleteResource(id: number);
    createResource(data: any);
    updateResource(id: number, data: any);
    getResource(id: number);
    getResources(page?: number, size?: number);
}
