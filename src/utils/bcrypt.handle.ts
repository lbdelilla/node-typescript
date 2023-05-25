import {hash, compare} from 'bcryptjs';

const encrypt = async (password: string) => {
    const passwordHash = await hash(password, 8);
    return passwordHash;
}

const hashCompare = (password: string, hash: string) => {
    const isMatch = compare(password, hash);
    return isMatch;
}

export { encrypt, hashCompare }