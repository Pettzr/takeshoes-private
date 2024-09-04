import argon2 from 'argon2';

export async function hashContent (content: string): Promise<string> {
    return await argon2.hash(content, { type: argon2.argon2id});
};

export async function verifyHash (content: string, hashedContent: string): Promise<boolean> {
    return await argon2.verify(hashedContent, content);
};
