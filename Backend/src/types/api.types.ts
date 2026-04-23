export interface ApiResponse<T>{
    success: boolean,
    data?: T,
    error?: string,
    location?: {
        start: { line: number, column: number },
        end: { line: number, column: number }
    }
}