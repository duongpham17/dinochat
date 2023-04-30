export interface Validation {
    name?: string,
    email?: string,
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("email")){
        if(!values.email) {
            errors.email = "required";
        }
        else if(!/\S+@\S+\.\S+/.test(values.email)){
            errors.email = "Invalid email address"
        }
    } 
    if(check("name")){
        if(!values.name) {
            errors.name = "required";
        }
    } 

    return errors
}

export default validation