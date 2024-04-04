import * as Yup from 'yup';

export const phoneNumberRegex = /(\+994(\s)\(\d{2})\)(\s)\d{3}(\-)\d{2}(\-)\d{2}/g;

export const normalizePhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/[()\s-]/g, '');
};

export const formatPhoneNumber = (phoneNumber: string) => {
    const countryCode = phoneNumber.slice(0, 4);
    const firstPart = phoneNumber.slice(4, 6);
    const secondPart = phoneNumber.slice(6, 9);
    const thirdPart = phoneNumber.slice(9, 11);
    const fourthPart = phoneNumber.slice(11, 13);
    return `${countryCode} (${firstPart}) ${secondPart}-${thirdPart}-${fourthPart}`;
};

export const phoneNumberSchema = Yup.string().matches(phoneNumberRegex, 'Nömrə düzgün daxil olunmayıb');
