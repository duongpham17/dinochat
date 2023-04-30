export interface Validation {
    name?: string,
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("name")){
        if(!values.name) {
            errors.name = "required";
        }
        else if(values.name.length >= 18){
            errors.name = "max 18 characters"
        }
    } 
    
    return errors
}

export default validation