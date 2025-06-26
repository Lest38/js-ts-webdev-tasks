export const validators = {
    firstName: (v: string) => v.length > 1,
    lastName: (v: string) => v.length > 1,
    maidenName: (v: string) => v.length > 1,
    email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: (v: string) => /^\+?[0-9\s\-]{7,15}$/.test(v),
    address: (v: string) => v.length >= 5,
    city: (v: string) => v.length > 1,
    postalCode: (v: string) => /^[0-9]{4,10}$/.test(v),
};
