export interface User {
    userID: number;
    name: string;
    phone:string;
    address: string;
    email:string;
    password:string;
    user_type: 'Hospital' | 'Paciente' | 'Medico';
}

export interface Hospital extends User {
    services: string;
}

export interface Person extends User {
    birthdate: Date;
    observation: string;
}