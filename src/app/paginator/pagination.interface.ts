import {Image} from "../image-container/image/image.interface";

export interface Pagination {
    page:number;
    per_page:number;
    photos: Image[];
    prev_page: string;
    next_page: string;
    total_results: number;
}