//Interfaces and Type Annotation
interface Hobbies {
    first: string;
    second: string;
}

function listHobbies(hobbies: Hobbies) {
    return "favorite hobbies:" + hobbies.first + "and" + hobbies.second
}

let james = {first: 'basketball', second: 'Music'}

listHobbies(james)