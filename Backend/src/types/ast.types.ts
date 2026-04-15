export interface ColumnExpr{
    type:"column_ref"
    column: string
}

export interface Column{
    expr: ColumnExpr
    as?: string|null
}

export interface Table{
    db:string|null
    table:string
    as?:string|null
}

export interface BinaryExpr{
    type:"binary_exp"
    operator: string
    left: any
    right: any
}

export interface Join{
    join: "INNER JOIN" | "LEFT JOIN" | "RIGHT JOIN"
    table: string
    on: BinaryExpr
}

export interface SelectAST{
    type: "select"
    columns: "*"|Column[]
    from: (Table &{join?:Join})[]
    where?: BinaryExpr
}