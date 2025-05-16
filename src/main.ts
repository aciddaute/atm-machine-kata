interface Money {
  denomination: number
  quantity: number
}

interface ATMMachine {
  withdraw: (amount: number) => Money[]
}

export class Bill {
  constructor(readonly amount: number) {
  }
}

const allBills = [
  new Bill(500),
  new Bill(200),
  new Bill(100),
  new Bill(50),
  new Bill(20),
  new Bill(10),
  new Bill(5),
  new Bill(2),
  new Bill(1),
]

export class ATM implements ATMMachine {
  private availableBills: Bill[];

  constructor(availableBills: Bill[] = allBills) {
    this.availableBills = availableBills.sort((a, b) => b.amount - a.amount);
  }

  withdraw(amount: number): Money[] {
    return this.withdrawBills(amount, this.availableBills);
  }

  private withdrawBills(amount: number, bills: Bill[]): Money[] {
    const bill = bills.at(0)

    if (!bill || !amount) return []

    const quantity = Math.floor(amount / bill.amount)
    const rest = amount % bill.amount
    const money = quantity > 0 ? {quantity, denomination: bill.amount} : undefined

    if (!money) return this.withdrawBills(rest, bills.slice(1));

    return [money, ... this.withdrawBills(rest, bills.slice(1))]
    }
}
