export default function validateUser({firstName, lastName, phoneNumber, idNumber}){
    const errors = {}
    if(firstName && firstName.length > 35 && firstName !== "") errors.firstName = "First Name cannot be longer than 35 characters"
    if(lastName && lastName.length > 35 && lastName !== "") errors.lastName = "Last Name cannot be longer than 35 characters"
    if(firstName && !(/^[a-zA-Z() ]+$/.test(firstName)) && firstName !== "") errors.firstName = "First Name can only have alphabetic characters"
    if(lastName && !(/^[a-zA-Z() ]+$/.test(lastName)) && lastName !== "") errors.lastName = "Last Name can only have alphabetic characters"
    if(phoneNumber && isNaN(phoneNumber) && phoneNumber !== "") errors.phoneNumber = "Phone number must be only digits"
    if(phoneNumber && phoneNumber.length > 12 && phoneNumber !== "") errors.phoneNumber = "Phone number can only be 8 digits long"
    if(idNumber && isNaN(idNumber) && idNumber !== "") errors.idNumber = "ID number must be only digits"
    return errors
}