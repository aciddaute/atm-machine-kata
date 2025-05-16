import { describe, expect, it } from "vitest";
import { ATM, NotEnoughBillsInATM, NotEnoughMoneyInATM } from "./main.js";

describe(ATM, () => {
  it("withdraws 434€ using the minimum amount of bills/coins", () => {
    const atm = new ATM()

    const withdrawal = atm.withdraw(434)

    expect(withdrawal).toEqual([
      { denomination: 200, quantity: 2 },
      { denomination: 20, quantity: 1 },
      { denomination: 10, quantity: 1 },
      { denomination: 2, quantity: 2 }
    ])
  })

  it("withdraws 220€ using the minimum amount of bills/coins", () => {
    const atm = new ATM()

    const withdrawal = atm.withdraw(220)

    expect(withdrawal).toEqual([
      { denomination: 200, quantity: 1 },
      { denomination: 20, quantity: 1 },
    ])
  })

  it("withdraws 200€ using 2 100€ bills cause atm does not have 200€ bills", () => {
    const atm = new ATM([{denomination: 50, quantity: 4}, {denomination: 100, quantity: 2}])

    const withdrawal = atm.withdraw(200)

    expect(withdrawal).toEqual([
      { denomination: 100, quantity: 2 },
    ])
  })

  it("throws if ATM does not have enough money", () => {
    const atm = new ATM([{denomination: 10, quantity: 1}])

    expect(() => atm.withdraw(20)).toThrow(new NotEnoughMoneyInATM())
  })

  it("throws if ATM cannot build the amount with current bills", () => {
    const atm = new ATM([{denomination: 200, quantity: 20}])

    expect(() => atm.withdraw(130)).toThrow(new NotEnoughBillsInATM())
  })

  it("adjusts the withdrawn bills to the available bills", () => {
    const atm = new ATM([{denomination: 500, quantity: 1}, {denomination: 100, quantity: 5}])
    const withdrawal = atm.withdraw(1000)

    expect(withdrawal).toEqual([
      { denomination: 500, quantity: 1 },
      { denomination: 100, quantity: 5 },
    ])
  })

  it("adjusts the withdrawn bills to the available bills (more complex)", () => {
    const atm = new ATM([{denomination: 500, quantity: 2}, {denomination: 100, quantity: 1}, {denomination: 200, quantity: 5}])
    const withdrawal = atm.withdraw(1500)

    expect(withdrawal).toEqual([
      { denomination: 500, quantity: 2 },
      { denomination: 200, quantity: 2 },
      { denomination: 100, quantity: 1 },
    ])
  })
})
