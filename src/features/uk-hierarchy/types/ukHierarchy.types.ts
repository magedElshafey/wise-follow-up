

export interface CountriesListType {
    name: string,
    code: string,
    flag_icon: string,
    created_at: string,
    updated_at: string,
    is_active: boolean,
    id: number,
    counties_count: number,
    organizations_count: number,
}
export interface CountiesListType {
    id: number,
    name: string,
    code: string,
    country_id: number,
    country: CountriesListType,

}
export interface DepartmentSystem {
    name: string,
    slug: string,
    description: string,
    created_at: string,
    updated_at: string,
    id: number,
    icon?: string
    topicsCount?: number
}