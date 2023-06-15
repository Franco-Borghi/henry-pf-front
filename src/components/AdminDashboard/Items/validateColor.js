export default function validateColor(color){
    let error = "";
    if(!(/^[a-zA-Z() ]+$/.test(color))) error ="The color attribute can only contain alphabetic characters"
    if(color === "") error = "The color attribute cannot be empty";
    return error
}