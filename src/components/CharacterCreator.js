import React, { useState } from "react";

export default function CharacterCreator(props) {
  let [character, setCharacter] = useState({});

  let handleChange = e => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Create</h1>
      <div>
        <div>
          <label>Name: </label>{" "}
          <input
            name="name"
            type="text"
            value={character.name}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <label>max. LeP: </label>{" "}
          <input
            name="maxLep"
            type="number"
            value={character.maxLep}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <label>max AsP: </label>{" "}
          <input
            name="maxAsp"
            type="number"
            min="0"
            value={character.maxAsp}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <label>max KaP: </label>{" "}
          <input
            name="maxKap"
            type="number"
            min="0"
            value={character.maxKap}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <label>Initiative: </label>{" "}
          <input
            name="initiative"
            type="number"
            min="0"
            value={character.initiative}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
      <div onClick={() => props.submitCharacter(character)}>
        Create Character
      </div>
    </div>
  );
}
