class Money {
}

interface ATMMachine {
  withdraw: (amount: number) => Money[]
}

export class ATM implements ATMMachine {

  withdraw(amount: number): Money[] {
    return []
  }
}
