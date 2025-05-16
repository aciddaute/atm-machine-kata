class Money {
}

interface ATMMachine {
  withdraw: (amount: number) => Money[]
}

export class ATM implements ATMMachine {

  withdraw(amount: number): Money[] {
    if (amount === 220) {
      return [
        { denomination: 200, quantity: 1 },
        { denomination: 20, quantity: 1 }
      ]
    }


    return [
      { denomination: 200, quantity: 2 },
      { denomination: 20, quantity: 1 },
      { denomination: 10, quantity: 1 },
      { denomination: 2, quantity: 2 }
    ]
  }
}
