import { describe, it, expect } from "vitest"
import { ATM } from "./main.js";

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
})
