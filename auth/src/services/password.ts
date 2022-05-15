import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const asyncScyrpt = promisify(scrypt);

export class Password {

    static async createHash(password: string) {

        const salt = randomBytes(8).toString('hex');
        const buffer = (await asyncScyrpt(password, salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(storedPass: string, providedPass: string) {

        const [hashedPassword, salt] = storedPass.split('.');
        const buffer = (await asyncScyrpt(providedPass, salt, 64)) as Buffer;

        return buffer.toString('hex') === hashedPassword;
    }

}