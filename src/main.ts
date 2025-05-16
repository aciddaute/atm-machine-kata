interface Money {
  denomination: number
  quantity: number
}

interface ATMMachine {
  withdraw: (amount: number) => Money[]
}

class Bill {
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

  constructor(private readonly availableBills: Bill[] = allBills) {
  }

  private withdrawBills(amount: number, bill: Bill): {money?: Money, rest: number} {
    const quantity = Math.floor(amount / bill.amount)
    const rest = amount % bill.amount
    const money = quantity > 0 ? {quantity, denomination: bill.amount} : undefined
    return {money, rest}
  }

  withdraw(amount: number): Money[] {
    const bills: Money[] = []
    let remainingAmount = amount

    this.availableBills.forEach((bill) => {
      const {money, rest} = this.withdrawBills(remainingAmount, bill)
      if (money) {
        bills.push(money)
      }
      remainingAmount = rest
    })

    return bills
  }
}
