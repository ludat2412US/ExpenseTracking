
export type expense = {
    unit: string,
    groceries: number,
    leisure: number,
    electronics: number,
    utilities: number,
    clothing: number,
    health: number,
    others: number,
    createdAt: string
}

export type userAccount = {
    userID: number,
    userName: string,
    password: string
}

export type userAuth = {
    userName: string,
    email: string,
    password: string,
    action: string,
    time: string
}



export let expenseCategories: expense[] = [];
export let userInfo: userAuth[] = [];
export let accounts: userAccount[] = [];