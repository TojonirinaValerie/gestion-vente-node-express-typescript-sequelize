export interface BeneficeJournaliereAttribut {
  id: string;
  date: Date;
  benefice: number;
  UserId: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface BeneficeMensuelAttribut {
  dateBM: Date;
  beneficeM: number;
  UserId: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface OldBeneficeJ {
  dateBJ: Date;
  beneficeJ: number;
  idCl: number;
}

export interface OldBeneficeM {
  dateBM: Date;
  beneficeM: number;
  idCl: number;
}
