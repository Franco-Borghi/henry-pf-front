export default function validate(inputs, categories){
    const errors = {}
    const attributeNames = Object.keys(inputs);
    for (let i = 0; i < attributeNames.length; i++) {
        const attributeName = attributeNames[i];
        if ((typeof inputs[attributeName] === "string" && (/^\s+$/.test(inputs[attributeName]) || inputs[attributeName] === ""))) {
            errors[attributeName] = `The ${attributeName} attribute cannot be empty.`;
      }
    }
    if(!(/^[a-zA-Z]+$/.test(inputs.brand)) && !errors.brand) errors.brand = "The brand cannot have non-alphabetic characters."
    if(inputs.brand.length > 20 ) errors.brand = "The brand name cannot be longer than 20 characters."
    if(inputs.model.length > 20 ) errors.model = "The model name cannot be longer than 20 characters."
    if(inputs.year > 2023 ) errors.year = "The year is wrong, try again."
    if(inputs.year < 2020 ) errors.year = "The year cannot be before 2020."
    if(inputs.cc <= 0 ) errors.cc = "The cc has to be greater than 0."
    if(!(/^[a-zA-Z]+$/.test(inputs.color)) && !errors.color) errors.color = "The color cannot have non-alphabetic characters."
    if(inputs.color.length > 15) errors.color = "The color cannot be longer than 15 characters."
    if(inputs.description.length > 250) errors.description = "The description cannot be longer than 250 characters."
    // if(!(/\.(jpg|jpeg|png|svg)$/.test(inputs.image)) && !errors.image) errors.image = "The image has to be a .jpg/.jpeg/.png/.svg file."
    if(inputs.price <= 0) errors.price = "The price has to be greater than 0."
    // if(!(/^[a-zA-Z]+$/.test(inputs.category)) && !errors.category) errors.category = "The category have non-alphabetic characters."
    // if([...categories.map(c => c.toUpperCase())].includes(inputs.category.toUpperCase())) errors.category = "The category is included in the dropdown menu above, please, select it from there." CHEQUEAR ESTA LINEA, HAY QUE IDENTIFICAR SI VIENE POR DROPDOWN O POR INPUT
    return errors
}