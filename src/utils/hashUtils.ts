import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    try {
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}

export async function checkPassword(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash);
    return result;
}