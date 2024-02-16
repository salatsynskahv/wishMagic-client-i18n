export type User = {
    id: string
    email: string;

}

enum Role {
 ADMIN = "ADMIN",
 READ_ONLY = "READ_ONLY",
 AUTHOR = "AUTHOR"
};

const person : {
    name: string,
    age: number,
    hobbies: string[],
    role: string
} = {
    name: 'Ganna',
    age: 31,
    hobbies: ['Sports', 'Cooking'],
    role: Role.AUTHOR
}

