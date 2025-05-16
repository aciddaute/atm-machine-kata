interface Money {
  denomination: number
  quantity: number
}

interface ATMMachine {
  withdraw: (amount: number) => Money[]
}

export class NotEnoughMoneyInATM extends Error {}
export class NotEnoughBillsInATM extends Error {}

const defaultState = [
  { denomination: 500, quantity: 2},
  { denomination: 200, quantity: 3},
  { denomination: 100, quantity: 5},
  { denomination: 50, quantity: 12},
  { denomination: 20, quantity: 20},
  { denomination: 10, quantity: 50},
  { denomination: 5, quantity: 100},
  { denomination: 2, quantity: 250},
  { denomination: 1, quantity: 500},
]

export class ATM implements ATMMachine {
  private availableBills: Money[];
  private get totalMoney(): number {
    return this.availableBills.reduce((acc, curr) => acc + curr.denomination * curr.quantity, 0)
  }

  constructor(availableBills: Money[] = defaultState) {
    this.availableBills = availableBills.sort((a, b) => b.denomination - a.denomination);
  }

  withdraw(amount: number): Money[] {
    if (amount > this.totalMoney) {
      throw new NotEnoughMoneyInATM()
    }

    const bills = this.withdrawBills(amount, this.availableBills);
    const totalWithdraw = bills.reduce((acc, curr) => acc + curr.denomination * curr.quantity, 0);

    if (totalWithdraw !== amount) throw new NotEnoughBillsInATM()

    return bills;
  }

  private withdrawBills(amount: number, bills: Money[]): Money[] {
    const bill = bills.at(0)

    if (!bill || !amount) return []

    const maxQuantity = Math.floor(amount / bill.denomination)
    const realQuantity = Math.min(maxQuantity, bill.quantity)
    const diffQuantity = maxQuantity - realQuantity

    this.subtractQuantity(bill.denomination, realQuantity)

    const rest = (amount % bill.denomination) + diffQuantity * bill.denomination

    const money = realQuantity > 0 ? {quantity: realQuantity, denomination: bill.denomination} : undefined

    if (!money) return this.withdrawBills(rest, bills.slice(1));

    return [money, ... this.withdrawBills(rest, bills.slice(1))]
  }

  private subtractQuantity(denomination: number, subtractedBills: number) {
    this.availableBills = this.availableBills.map(bill => {
      if (bill.denomination === denomination) {
        return {denomination: bill.denomination, quantity: bill.quantity - subtractedBills }
      }

      return bill
    })
  }
}

