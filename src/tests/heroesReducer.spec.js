import heroesReducer from "../reducers/heroesReducer";

const hero1 = {
  name: "Galarius",
  maxLep: 25,
  maxAsp: 35,
  maxKap: 0
};

const party = [
  {
    name: "Galarius",
    maxLep: "25",
    maxAsp: "35",
    maxKap: null,
    initiative: 0,
    conditions: [
      { conditionId: 17, level: 1, remainingRounds: null },
      { conditionId: 1, level: 4, remainingRounds: 5 },
      { conditionId: 11, level: 1, remainingRounds: null }
    ],
    id: 0,
    LeP: 19,
    AsP: 32,
    KaP: 0,
    money: 8242
  },
  {
    name: "Lizy",
    maxLep: "38",
    maxAsp: null,
    maxKap: null,
    initiative: 0,
    conditions: [
      { conditionId: 21, level: 1, remainingRounds: null },
      { conditionId: 3, level: 3, remainingRounds: 5 }
    ],
    id: 1,
    LeP: "38",
    AsP: 0,
    KaP: 0,
    money: 12407
  },
  {
    name: "Thor",
    maxLep: "31",
    maxAsp: null,
    maxKap: "23",
    initiative: 0,
    conditions: [],
    id: 2,
    LeP: "31",
    AsP: 0,
    KaP: "23",
    money: 0
  }
];

describe("Heroes Reducer", () => {
  const setUpState = (type, state, payload) => {
    return heroesReducer(state, {
      type,
      payload
    });
  };

  it("Should return default state", () => {
    const newState = heroesReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  describe("Set_all_heroes", () => {
    const setUp = (state, payload) => {
      return setUpState("SETALLHEROES", state, payload);
    };

    it("sets single hero", () => {
      const newState = setUp([], [{ name: "Galarius" }]);
      expect(newState).toEqual([{ name: "Galarius" }]);
    });

    it("should replace old state", () => {
      const newState = setUp(
        [{ name: "Lizy", LeP: 23 }, { name: "Thor", AsP: 99 }],
        [{ name: "Peter", KaP: 72 }]
      );
      expect(newState).toEqual([{ name: "Peter", KaP: 72 }]);
    });
  });

  describe("Add_Hero", () => {
    const setUp = (state, payload) => {
      return setUpState("ADDHERO", state, payload);
    };

    it("should add a new hero", () => {
      const newState = setUp(
        [{ name: "Pater", LeP: 23, AsP: 34 }],
        [{ ...hero1 }]
      );
      expect(newState).toEqual([
        { name: "Pater", LeP: 23, AsP: 34 },
        {
          name: "Galarius",
          id: 1,
          conditions: [],
          LeP: 25,
          maxLep: 25,
          AsP: 35,
          maxAsp: 35,
          KaP: 0,
          maxKap: null,
          money: 0
        }
      ]);
    });

    it("should add hero to big party", () => {
      const newState = setUp(party, [hero1]);
      expect(newState).toEqual([
        ...party,
        {
          name: "Galarius",
          id: 3,
          conditions: [],
          LeP: 25,
          maxLep: 25,
          AsP: 35,
          maxAsp: 35,
          KaP: 0,
          maxKap: null,
          money: 0
        }
      ]);
    });
  });

  describe("SETPOINT", () => {
    const setUp = (state, payload) => {
      return setUpState("SETPOINT", state, payload);
    };

    it("should set new LeP on second hero", () => {
      const newState = setUp(party, [16, "LeP", 1]);
      expect(newState[1].LeP).toBe(16);
      expect(newState[1].AsP).not.toBe(16);
      expect(newState[1].KaP).not.toBe(16);
    });

    it("should set new AsP on first hero", () => {
      const newState = setUp(party, [8, "AsP", 0]);
      expect(newState[0].AsP).toBe(8);
      expect(newState[0].LeP).not.toBe(8);
      expect(newState[0].KaP).not.toBe(8);
    });

    it("should set new KaP on third hero", () => {
      const newState = setUp(party, [17, "KaP", 2]);
      expect(newState[2].KaP).toBe(17);
      expect(newState[2].LeP).not.toBe(17);
      expect(newState[2].AsP).not.toBe(17);
    });
  });

  describe("Change-Money", () => {
    const setUp = (state, payload) => {
      return setUpState("CHANGEMONEY", state, payload);
    };

    it("should setNewMoney for first hero", () => {
      const newState = setUp(party, [0, 12345]);
      expect(newState[0].money).toBe(12345);
      expect(newState[2].money).not.toBe(12345);
    });

    it("should setNewMoney for third hero", () => {
      const newState = setUp(party, [2, 9631]);
      expect(newState[2].money).toBe(9631);
      expect(newState[2].money).not.toBe(0);
    });
  });

  describe("conditions", () => {
    const condition = {
      conditionId: 3,
      remainingRounds: "2",
      level: "3"
    };

    describe("Add_condition_to_hero", () => {
      const setUp = (state, payload) => {
        return setUpState("ADDCONDITIONTOHERO", state, payload);
      };

      it("should add a condition to first hero", () => {
        const newState = setUp(party, [0, condition]);
        expect(newState[0].conditions).toEqual([
          { conditionId: 17, level: 1, remainingRounds: null },
          { conditionId: 1, level: 4, remainingRounds: 5 },
          { conditionId: 11, level: 1, remainingRounds: null },
          { conditionId: 3, remainingRounds: "2", level: "3" }
        ]);
      });

      it("should add condition to empty condition list", () => {
        const oldConditionList = [...party[2].conditions];
        const newState = setUp(party, [
          2,
          { conditionId: 17, remainingRounds: null, level: 1 }
        ]);
        expect(newState[2].conditions).toEqual([
          ...oldConditionList,
          { conditionId: 17, remainingRounds: null, level: 1 }
        ]);
      });
    });

    describe("Delete_condition_from_hero", () => {
      const setUp = (state, payload) => {
        return setUpState("DELETECONDITIONFROMHERO", state, payload);
      };

      it("should delete first condition from first hero", () => {
        const newState = setUp(party, [0, 0]);
        expect(newState[0].conditions).toEqual([
          { conditionId: 1, level: 4, remainingRounds: 5 },
          { conditionId: 11, level: 1, remainingRounds: null },
          { conditionId: 3, remainingRounds: "2", level: "3" }
        ]);
      });
    });

    describe("Change condition", () => {
      const setUp = (state, payload) => {
        return setUpState("CHANGECONDITION", state, payload);
      };

      it("should change first condition from firt hero", () => {
        const newState = setUp(party, [0, 1, condition]);
        expect(newState[0].conditions[1]).toEqual(condition);
      });
    });
  });
});
