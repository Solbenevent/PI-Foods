const validations = (data, errors, setErrors) => {
    if(!data.name) {
        setErrors({ ...errors, name: "Complete this field", healthScore: ""});
    } else if(!data.summary) {
        setErrors({...errors, summary: "Complete this field", name: ""})
    } else if (data.healthScore < 0) {
        setErrors({...errors, healthScore: "Health Score cannot be less than 0"})
    } else if (data.healthScore > 100) {
        setErrors({...errors, healthScore: "Health Score cannot be greater than 100"})
    } else {
        setErrors("")
    }
}

export default validations;