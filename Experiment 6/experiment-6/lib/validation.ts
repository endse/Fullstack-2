export interface FormState {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    password?: string;
    message: string;
}

export interface ValidationErrors {
    [key: string]: string;
}

/**
 * Enterprise-grade validation engine for Experiment 6.
 * Handles edge cases: International names, Leap years, Domain whitelisting, etc.
 */
export const validateForm = (data: FormState, step: number, passwordStrength: number): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (step === 1) {
        // Name validation: Supports Unicode/Accents, Hyphens, and Apostrophes
        const nameRegex = /^[\p{L}\s'-]{2,50}$/u; // Max 50 chars cap for professional stability

        if (!data.firstName) {
            errors.firstName = 'First name is required.';
        } else if (!nameRegex.test(data.firstName)) {
            errors.firstName = 'Invalid format (2-50 chars, no special numbers/symbols).';
        }

        if (!data.lastName) {
            errors.lastName = 'Last name is required.';
        } else if (!nameRegex.test(data.lastName)) {
            errors.lastName = 'Invalid format (2-50 chars, no special numbers/symbols).';
        }

        // Date of Birth & Edge Cases (Leap Year, Range)
        if (!data.dob) {
            errors.dob = 'Date of birth is required.';
        } else {
            const birthDate = new Date(data.dob);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (birthDate > today) {
                errors.dob = 'Date of birth cannot be in the future.';
            } else {
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                if (age < 18) {
                    errors.dob = 'Minimum age requirement is 18 years.';
                } else if (age > 120) {
                    errors.dob = 'Age exceeds realistic threshold (Max 120).';
                }

                // Leap Year Logic for Feb 29
                const year = birthDate.getFullYear();
                const month = birthDate.getMonth() + 1;
                const day = birthDate.getDate();
                if (month === 2 && day === 29) {
                    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
                    if (!isLeapYear) {
                        errors.dob = `${year} is not a leap year. February 29th is invalid.`;
                    }
                }
            }
        }
    }

    if (step === 2) {
        // Alphanumeric Alias
        if (!data.username) {
            errors.username = 'Username is required.';
        } else if (data.username.length < 3 || data.username.length > 30) {
            errors.username = 'Username must be between 3-30 characters.';
        } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
            errors.username = 'Username can only contain alphanumeric characters and underscores.';
        }

        // Hyper-Strict Email Validation
        const emailRegex = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.(cuchd|com|org|net|edu|gov|in|ac\.in|co\.in)$/;
        if (!data.email) {
            errors.email = 'Email is required.';
        } else if (data.email.length > 100) {
            errors.email = 'Email exceeds maximum stability length (100).';
        } else if (!emailRegex.test(data.email)) {
            errors.email = 'Use a verified domain (No dots in username, valid TLD).';
        }

        // Password Security & Identity Exclusion Logic
        if (!data.password) {
            errors.password = 'Security key is required.';
        } else {
            const pass = data.password.toLowerCase();
            const user = data.username.toLowerCase();
            const email = data.email.split('@')[0].toLowerCase();

            // Identity Exclusion Checks
            if (user && pass.includes(user)) {
                errors.password = 'Password cannot contain your username.';
            } else if (email && pass.includes(email)) {
                errors.password = 'Password cannot contain your email identity.';
            } else if (data.dob) {
                const [y, m, d] = data.dob.split('-');
                if (pass.includes(y) || pass.includes(m) || pass.includes(d)) {
                    errors.password = 'Password cannot contain your birth year, month, or day.';
                }
            }

            if (!errors.password && passwordStrength < 3) {
                errors.password = 'Security level too low. Diversify your key.';
            }
        }
    }

    if (step === 3) {
        if (!data.message.trim()) {
            errors.message = 'Payload message is required.';
        } else if (data.message.trim().length < 5) {
            errors.message = 'Payload message must be at least 5 characters.';
        } else if (data.message.length > 500) { // Reduced for professional UI stability
            errors.message = 'Payload exceeds safety capacity (500 chars).';
        }
    }

    return errors;
};
