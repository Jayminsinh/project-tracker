

export function validator(formData, isAuth = false, label = "SignUp", users) {
    const error = {}


    if (!isAuth) {
        if (label === "SignUp") {
            if (!formData.username.trim()) {
                error.username = "Username is required"
            } else if (formData.username.length < 3) {
                error.username = "Username must be atleast 3 characters"
            }
        }

        if (!formData.email.trim()) {
            error.email = "Email is required"
        } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(formData.email)) {
            error.email = "Invalid Email"
        } else if (label === "signUp" && users.some(u => u.email === formData.email)) {
            error.email = "Email already Registered"
        }

        if (!formData.password.trim()) {
            error.password = "Password is required"
        } else if (formData.password.length < 6) {
            error.password = "Password atleast 6 characters long"
        }
    }

    if (isAuth) {
        if (!formData.title.trim()) {
            error.title = "Project Titleis required"
        }
        if (!formData.description.trim()) {
            error.description = "Project Description is required"
        }
        if (!formData.date) {
            error.date = "Due date is required"
        }
    }

    return error;
}