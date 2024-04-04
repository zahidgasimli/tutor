export enum InstructorGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum Metro {
    DARNAGUL = 'DARNAGUL',
    'AZADLIG_PROSPEKTI' = 'AZADLIG_PROSPEKTI',
    NASIMI = 'NASIMI',
    'MEMAR_AJAMI' = 'MEMAR_AJAMI',
    '8_NOYABR' = '8_NOYABR',
    '20_YANVAR' = '20_YANVAR',
    INSHAATCHILAR = 'INSHAATCHILAR',
    'ELMLAR_AKADEMIYASI' = 'ELMLAR_AKADEMIYASI',
    NIZAMI = 'NIZAMI',
    '28_MAY' = '28_MAY',
    GANJLIK = 'GANJLIK',
    'NARIMAN_NARIMANOV' = 'NARIMAN_NARIMANOV',
    BAKMIL = 'BAKMIL',
    ULDUZ = 'ULDUZ',
    KOROGHLU = 'KOROGHLU',
    'QARA_QARAYEV' = 'QARA_QARAYEV',
    NEFTCHILAR = 'NEFTCHILAR',
    'XALGLAR_DOSTLUGHU' = 'XALGLAR_DOSTLUGHU',
    AHMADLI = 'AHMADLI',
    'HAZI_ASLANOV' = 'HAZI_ASLANOV',
    XATAI = 'XATAI',
    SAHIL = 'SAHIL',
    ICHARISHAHAR = 'ICHARISHAHAR',
    'JAFAR_JABBARLI' = 'JAFAR_JABBARLI',
}

export enum Weekday {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
}

export type InstructorEducation = {
    id: number;
    university: string;
    faculty: string;
    start_date: string;
    end_date: string | null;
    is_ongoing: boolean;
};

export type InstructorJob = {
    id: number;
    company: string;
    position: string;
    start_date: string;
    end_date: string | null;
    is_ongoing: boolean;
};

export type InstructorCertificate = {
    id: number;
    name: string;
    file: string;
};

//

export type ObjectValues<T> = T[keyof T];
